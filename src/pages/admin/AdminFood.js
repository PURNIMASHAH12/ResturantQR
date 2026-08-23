import { useEffect, useState } from "react";
import API from "../../services/Api";
import FoodForm from "../../components/admin/FoodForm";
import FoodFilters from "../../components/admin/FoodFilter";
import FoodCard from "../../components/admin/FoodCard";
import "../../styles/AdminFood.css";

function AdminFood() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);

  const emptyForm = {
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    foodType: "",
    available: true
  };

  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    try {
      const [f, c] = await Promise.all([
        API.get("/foods"),
        API.get("/categories")
      ]);

      setFoods(f.data.foods || []);
      setCategories(c.data.categories || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!form.name || !form.price || !form.category) {
      return alert("Name, price and category are required.");
    }

    try {
      const data = {
        ...form,
        price: Number(form.price)
      };

      if (editing) {
        await API.put(`/foods/${editing}`, data);
      } else {
        await API.post("/foods", data);
      }

      reset();
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save food");
    }
  };

  const editFood = food => {
    setEditing(food._id);

    setForm({
      name: food.name,
      description: food.description || "",
      price: food.price,
      category: food.category?._id || food.category,
      image: food.image || "",
      foodType: food.foodType || "",
      available: food.available
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteFood = async id => {
    if (!window.confirm("Delete this food?")) return;

    try {
      await API.delete(`/foods/${id}`);
      load();
    } catch {
      alert("Failed to delete food");
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || food.category?._id === filter)
  );

  return (
    <div className="admin-food">

      <div className="food-header">
        <div>
          <h1>🍔 Food Management</h1>
          <p>Manage your restaurant menu</p>
        </div>

        <div className="food-count">
          <b>{foods.length}</b>
          <span>Total Foods</span>
        </div>
      </div>

      <FoodForm
        form={form}
        setForm={setForm}
        categories={categories}
        editing={editing}
        save={save}
        reset={reset}
      />

      <FoodFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        categories={categories}
      />

      <div className="food-grid">
        {filteredFoods.map(food => (
          <FoodCard
            key={food._id}
            food={food}
            editFood={editFood}
            deleteFood={deleteFood}
          />
        ))}
      </div>

      {!filteredFoods.length && (
        <div className="empty-food">
          🍽️ No foods found
        </div>
      )}

    </div>
  );
}

export default AdminFood;