import { useState } from "react";

function FoodModal({ food, onAdd, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState("");
  const [isRemarkFocused, setIsRemarkFocused] = useState(false);

  const add = () => {
    onAdd(food, quantity, remarks.trim());
    setQuantity(1);
    setRemarks("");
  };

  const close = () => {
    setQuantity(1);
    setRemarks("");
    onClose();
  };

  const quickRemarks = [
    "No onions",
    "Extra spicy", 
    "Less oil",
    "Add cheese",
    "No garlic",
    "Well done"
  ];

  return (
    <div className="food-modal" onClick={close}>
      <div className="food-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-food-type">
            {food.foodType === "veg" && (
              <span className="veg-symbol">●</span>
            )}
            {food.foodType === "nonveg" && (
              <span className="nonveg-symbol">●</span>
            )}
          </div>
          <h2>{food.name}</h2>
          <button className="modal-close-btn" onClick={close}>
            ✕
          </button>
        </div>

        <p className="modal-price">Rs. {food.price}</p>

        {food.description && (
          <p className="modal-description">{food.description}</p>
        )}

        <div className="quantity-section">
          <label>Quantity</label>
          <div className="quantity">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              −
            </button>
            <b>{quantity}</b>
            <button onClick={() => setQuantity(q => q + 1)}>
              +
            </button>
          </div>
        </div>

        {/* ENHANCED SPECIAL REQUEST SECTION */}
        <div className="remarks-section">
          <div className="remarks-header">
            <label htmlFor="remarks">
              <span className="remarks-icon">📝</span>
              Special Request
            </label>
            <span className="remarks-optional">Optional</span>
          </div>

          <div className={`remarks-wrapper ${isRemarkFocused ? 'focused' : ''}`}>
            <textarea
              id="remarks"
              placeholder="Any special instructions? (e.g., no onions, extra spicy...)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              onFocus={() => setIsRemarkFocused(true)}
              onBlur={() => setIsRemarkFocused(false)}
              rows="3"
              maxLength="200"
            />
            <div className="remarks-char-count">
              {remarks.length > 0 && (
                <span className={remarks.length > 180 ? 'warning' : ''}>
                  {remarks.length}/200
                </span>
              )}
            </div>
          </div>

          <div className="quick-remarks">
            <span className="quick-remarks-label">Quick:</span>
            {quickRemarks.map((remark) => (
              <button
                key={remark}
                className={`quick-remark-chip ${remarks === remark ? 'active' : ''}`}
                onClick={() => setRemarks(remarks === remark ? "" : remark)}
                type="button"
              >
                {remark}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={close}>
            Cancel
          </button>
          <button className="modal-add-btn" onClick={add}>
            Add to Cart
            <span className="modal-add-price">
              Rs. {(food.price * quantity).toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default FoodModal;