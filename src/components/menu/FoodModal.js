import { useState } from "react";

function FoodModal({ food, onAdd, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState("");

  const add = () => {
    onAdd(food, quantity, remarks);
  };

  return (
    <div className="food-modal">

      <div className="food-modal-card">

        <h2>
          {food.foodType === "veg" && (
            <span className="veg-symbol">●</span>
          )}

          {food.foodType === "nonveg" && (
            <span className="nonveg-symbol">●</span>
          )}

          {food.name}
        </h2>

        <p>Rs. {food.price}</p>

        <div className="quantity">

          <button
            onClick={() =>
              setQuantity(q => Math.max(1, q - 1))
            }
          >
            −
          </button>

          <b>{quantity}</b>

          <button
            onClick={() =>
              setQuantity(q => q + 1)
            }
          >
            +
          </button>

        </div>

        <textarea
          placeholder="Any special request? (Optional)"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />

        <button onClick={add}>
          Add to Cart
        </button>

        <button onClick={onClose}>
          Cancel
        </button>

      </div>

    </div>
  );
}

export default FoodModal;