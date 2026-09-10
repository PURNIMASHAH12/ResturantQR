import { useState } from "react";
import API from "../../services/Api";
import AddFood from "./AddFood";

function EditOrder({ order, foods, onSave, onCancel }) {
  const [items, setItems] = useState(
    order.items.map((item) => ({
      food: item.food?._id || item.food,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      remarks: item.remarks || "",
    }))
  );

  const [saving, setSaving] = useState(false);

  // Increase / decrease quantity
  const changeQty = (index, amount) => {
    setItems((prev) =>
      prev
        .map((item, i) =>
          i === index
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Add food
  const addFood = (food) => {
    const index = items.findIndex(
      (item) => String(item.food) === String(food._id)
    );

    if (index !== -1) {
      setItems((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    setItems((prev) => [
      ...prev,
      {
        food: food._id,
        name: food.name,
        price: Number(food.price),
        quantity: 1,
        remarks: "",
      },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Save order
  const save = async () => {
    if (!items.length) {
      alert("An order must contain at least one item.");
      return;
    }

    try {
      setSaving(true);

      const { data } = await API.put(
        `/orders/${order._id}`,
        { items }
      );

      if (data.success) {
        onSave(data.order);
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update order."
      );
    } finally {
      setSaving(false);
    }
  };

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="professional-edit-order">

      {/* HEADER */}
      <div className="edit-header">

        <div>
          <div className="edit-title-row">
            <span className="edit-icon">✎</span>

            <div>
              <h2>Edit Order</h2>

              <p>
                {order.orderType === "parcel"
                  ? "Parcel Order"
                  : `Table ${order.tableNumber}`}
                {" • "}
                {order.customerName}
              </p>
            </div>
          </div>
        </div>

        <div className="edit-order-id">
          <span>Order ID</span>
          <strong>{order.orderId}</strong>
        </div>

      </div>

      {/* ITEMS HEADER */}
      <div className="edit-section-title">
        <div>
          <h3>Order Items</h3>
          <p>
            Adjust quantities or remove items from this order.
          </p>
        </div>

        <span className="item-count">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* ITEMS */}
      <div className="professional-items">

        {items.length === 0 ? (
          <div className="empty-edit-items">
            <span>🛒</span>
            <strong>No items in order</strong>
            <p>Add an item below to continue.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              className="professional-item"
              key={index}
            >

              <div className="professional-item-number">
                {index + 1}
              </div>

              <div className="professional-item-info">
                <strong>{item.name}</strong>

                <span>
                  Rs. {item.price.toLocaleString()} each
                </span>

                {item.remarks && (
                  <small>
                    Note: {item.remarks}
                  </small>
                )}
              </div>

              <div className="professional-item-controls">

                <button
                  type="button"
                  className="quantity-button"
                  onClick={() =>
                    changeQty(index, -1)
                  }
                  disabled={saving}
                >
                  −
                </button>

                <span className="quantity-value">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  className="quantity-button"
                  onClick={() =>
                    changeQty(index, 1)
                  }
                  disabled={saving}
                >
                  +
                </button>

              </div>

              <div className="professional-item-price">
                Rs.{" "}
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </div>

              <button
                type="button"
                className="remove-item"
                onClick={() =>
                  removeItem(index)
                }
                disabled={saving}
                title="Remove item"
              >
                ×
              </button>

            </div>
          ))
        )}

      </div>

      {/* ADD ITEMS */}
      <div className="add-items-panel">

        <div className="add-items-heading">
          <div className="add-items-icon">+</div>

          <div>
            <h3>Add Items</h3>
            <p>
              Add additional food items to this order.
            </p>
          </div>
        </div>

        <AddFood
          foods={foods}
          onAdd={addFood}
        />

      </div>

      {/* SUMMARY */}
      <div className="edit-summary">

        <div>
          <span>Items</span>
          <strong>{totalItems}</strong>
        </div>

        <div className="summary-total">
          <span>Updated Total</span>
          <strong>
            Rs. {total.toLocaleString()}
          </strong>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="professional-edit-actions">

        <button
          type="button"
          className="professional-cancel"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="button"
          className="professional-save"
          onClick={save}
          disabled={saving || items.length === 0}
        >
          {saving ? (
            <>
              <span className="save-spinner"></span>
              Saving...
            </>
          ) : (
            <>
              ✓ Save Changes
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default EditOrder;
