import { useEffect, useState } from "react";
import API from "../../services/Api";
import FoodForm from "../../components/admin/FoodForm";
import FoodFilter from "../../components/admin/FoodFilter";
import FoodCard from "../../components/admin/FoodCard";

import "../../styles/AdminFood.css";

function AdminFood() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    foodType: "",
    available: true,
  });

  // LOAD FOODS + CATEGORIES
  const load = async () => {
    try {
      const [foodRes, categoryRes] = await Promise.all([
        API.get("/foods"),
        API.get("/categories"),
      ]);

      setFoods(foodRes.data.foods || []);
      setCategories(categoryRes.data.categories || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // RESET FORM
  const reset = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      foodType: "",
      available: true,
    });

    setEditing(null);
  };

  // SAVE FOOD
  const save = async () => {
    if (!form.name || !form.price || !form.category) {
      alert("Name, price and category are required.");
      return;
    }

    try {
      const data = {
        ...form,
        price: Number(form.price),
      };

      if (editing) {
        await API.put(`/foods/${editing}`, data);
      } else {
        await API.post("/foods", data);
      }

      reset();
      await load();

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to save food"
      );
    }
  };

  // EDIT FOOD
  const editFood = (food) => {
    setEditing(food._id);

    setForm({
      name: food.name || "",
      description: food.description || "",
      price: food.price || "",
      category: food.category?._id || food.category || "",
      image: food.image || "",
      foodType: food.foodType || "",
      available: food.available ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE FOOD
  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) {
      return;
    }

    try {
      await API.delete(`/foods/${id}`);
      load();
    } catch (err) {
      alert("Failed to delete food");
    }
  };

  // FILTER FOODS
  const filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      filter === "all" ||
      food.category?._id === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <main className="admin-food">

        {/* HEADER */}
        <div className="food-header">

          <div>
            <h1>Food Management</h1>

            <p>
              Manage your restaurant menu
            </p>
          </div>

          <div className="food-count">
            <b>{foods.length}</b>
            <span>Total Foods</span>
          </div>

        </div>


        {/* FOOD FORM */}
        <FoodForm
          form={form}
          setForm={setForm}
          categories={categories}
          editing={editing}
          save={save}
          reset={reset}
        />


        {/* FILTER */}
        <FoodFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          categories={categories}
        />


        {/* FOOD GRID */}
        <div className="food-grid">

          {filteredFoods.map((food) => (

            <FoodCard
              key={food._id}
              food={food}
              onEdit={editFood}
              onDelete={deleteFood}
            />

          ))}

        </div>


        {/* EMPTY */}
        {!filteredFoods.length && (
          <div className="empty-food">
             No foods found
          </div>
        )}

      </main>

    </div>
  );
}

export default AdminFood;