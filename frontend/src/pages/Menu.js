import { useEffect, useState } from "react";
import API from "../services/Api";
import { useCart } from "../context/CartContext";
import { useTable } from "../context/TableContext";
import { useNavigate } from "react-router-dom";

import MenuHeader from "../components/menu/MenuHeader";
import MenuSearch from "../components/menu/MenuSearch";
import CategoryFilter from "../components/menu/CategoryFilter";
import FoodGrid from "../components/menu/FoodGrid";

import "../styles/Menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { addToCart, cartItems } = useCart();

  const {
    customerName,
    tableNumber,
    orderType,
    contactNumber,
    deliveryAddress,
  } = useTable();

  const navigate = useNavigate();

  // Check whether customer information is valid
  const validDineIn =
    orderType === "dine_in" &&
    customerName &&
    tableNumber;

  const validParcel =
    orderType === "parcel" &&
    customerName &&
    contactNumber &&
    deliveryAddress;

  const canOrder = validDineIn || validParcel;

  // Load foods
  useEffect(() => {
    API.get("/foods")
      .then((res) => {
        setFoods(res.data.foods || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Categories
  const categories = [
    "All",
    ...new Set(
      foods
        .map((food) => food.category?.name)
        .filter(Boolean)
    ),
  ];

  // Filter foods
  const filteredFoods = foods.filter(
    (food) =>
      food.available !== false &&
      food.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All" ||
        food.category?.name === category)
  );

  // Add food to cart
  const handleAddToCart = (food) => {
    if (!canOrder) {
      navigate("/customer-info");
      return;
    }

    addToCart({
      ...food,
      quantity: 1,
      remarks: "",
    });
  };

  // Open cart
  const handleCart = () => {
    if (!canOrder) {
      navigate("/customer-info");
      return;
    }

    navigate("/cart");
  };

  return (
    <div>
      <main className="menu-page">

        {/* MENU HEADER */}
        <MenuHeader
          customerName={canOrder ? customerName : ""}
          tableNumber={canOrder ? tableNumber : ""}
          cartCount={
            canOrder
              ? cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )
              : 0
          }
          onCart={handleCart}
          canOrder={canOrder}
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
          onSelect={handleAddToCart}
        />

      </main>
    </div>
  );
}

export default Menu;