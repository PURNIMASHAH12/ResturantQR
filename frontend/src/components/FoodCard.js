import { useState } from "react";
import { useCart } from "../context/CartContext";
function FoodCard({ food }) {
  const { addToCart } = useCart();
  const [remarks, setRemarks] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    addToCart({
      ...food,
      quantity,
      remarks: remarks.trim(),
    });
    setQuantity(1);
    setRemarks("");
  };
  return (
    <div className="food-card">
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <p>Rs. {food.price}</p>
      {/* Quantity */}
      <div className="food-quantity">
        <button
          onClick={() =>
            setQuantity((prev) =>
              Math.max(1, prev - 1)
            )
          }
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          onClick={() =>
            setQuantity((prev) =>
              prev + 1
            )
          }
        >
          +
        </button>
      </div>
      {/* Optional Remarks */}
      <div className="remarks">
        <label>
          Extra Remarks{" "}
          <span>(Optional)</span>
        </label>
        <textarea
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          placeholder="e.g. Less spicy, no onion..."
          rows="3"
        />
      </div>
      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FoodCard;