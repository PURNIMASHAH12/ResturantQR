import { useState } from "react";
import API from "../../services/Api";
import AddFood from "./AddFood";

function EditOrder({ order, foods, onSave, onCancel }) {
 const [items, setItems] = useState(
  order.items.map(item => ({
    food: item.food?._id || item.food,
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
    remarks: item.remarks || "",
  })));
  const changeQty = (index, amount) => {
    setItems(prev =>
      prev
        .map((item, i) =>
          i === index
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    );};
  const addFood = food => {
  const index = items.findIndex(
    item => String(item.food) === String(food._id)
  );
  if (index !== -1) {
    setItems(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    return;
  }
  setItems(prev => [
    ...prev,
    {
      food: food._id,
      name: food.name,
      price: Number(food.price),
      quantity: 1,
      remarks: "",
    },]);};
  const save = async () => {
    if (!items.length) {
      alert("Order must have at least one item.");
      return;
    }
    try {
      const { data } = await API.put(`/orders/${order._id}`, {
        items,
      });
      if (data.success) onSave(data.order);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order.");
    }};
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="edit-order-section">
      <h3>✏️ Modify Order</h3>
      {items.map((item, i) => (
        <div className="edit-order-item" key={i}>
          <b>{item.name}</b>
          <button onClick={() => changeQty(i, -1)}>−</button>
          {item.quantity}
          <button onClick={() => changeQty(i, 1)}>+</button>
          <button
            onClick={() =>
              setItems(prev => prev.filter((_, x) => x !== i))
            }>🗑️</button>
        </div>
      ))}
      <h3>New Total: Rs. {total}</h3>
      <AddFood foods={foods} onAdd={addFood} />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={save}>💾 Save</button>
    </div>
  );}
export default EditOrder;