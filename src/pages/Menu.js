import { useEffect, useState } from "react";
import API from "../services/Api";
import { useCart } from "../context/CartContext";
import { useTable } from "../context/TableContext";
import { useNavigate } from "react-router-dom";

import MenuHeader from "../components/menu/MenuHeader";
import MenuSearch from "../components/menu/MenuSearch";
import CategoryFilter from "../components/menu/CategoryFilter";
import FoodGrid from "../components/menu/FoodGrid";
import FoodModal from "../components/menu/FoodModal";

import "../styles/Menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Selected food for modal
  const [selected, setSelected] = useState(null);

  const { addToCart, cartItems } = useCart();
  const { customerName, tableNumber } = useTable();

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/foods")
      .then(res => setFoods(res.data.foods || []))
      .catch(err => console.log(err));
  }, []);

  const categories = [
    "All",
    ...new Set(
      foods.map(food => food.category?.name).filter(Boolean)
    )
  ];

  const filteredFoods = foods.filter(food =>
    food.available !== false &&
    food.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" ||
      food.category?.name === category)
  );

  // CLICKING + ADD ON FOOD CARD
  const selectFood = (food) => {
    // Customer can browse,
    // but cannot start ordering without information
    if (!customerName || !tableNumber) {
      navigate("/customer-info");
      return;
    }

    setSelected(food);
  };

  // ADD FOOD FROM MODAL
  const addFood = (food, quantity, remarks) => {
    if (!customerName || !tableNumber) {
      setSelected(null);
      navigate("/customer-info");
      return;
    }

    addToCart({
      ...food,
      quantity,
      remarks
    });

    setSelected(null);
  };

  return (
    <div className="menu-page">

      {/* HEADER */}
      <MenuHeader
        customerName={customerName}
        tableNumber={tableNumber}
        cartCount={cartItems.length}
        onCart={() => navigate("/cart")}
      />

      {/* SEARCH */}
      <MenuSearch
        search={search}
        setSearch={setSearch}
      />

      {/* CATEGORIES */}
      <CategoryFilter
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      {/* FOOD */}
      <FoodGrid
        foods={filteredFoods}
        onSelect={selectFood}
      />

      {/* MODAL */}
      {selected && (
        <FoodModal
          food={selected}
          onAdd={addFood}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}

export default Menu;