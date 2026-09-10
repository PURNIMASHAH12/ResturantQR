function FoodForm({
  form = {
    name: "",
    price: "",
    category: "",
    foodType: "",
    image: "",
    description: "",
    available: true,
  },
  setForm,
  categories = [],
  editing,
  save,
  reset,
}) {
  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });};
  return (
    <div className="food-form-card">
      <h2> {editing ? "Edit Food" : "Add New Food"}</h2>
      <div className="food-form">
        {/* FOOD NAME */}
        <input
          name="name"
          placeholder="Food name"
          value={form.name || ""}
          onChange={change}/>
        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price || ""}
          onChange={change}/>
        {/* CATEGORY */}
        <select
          name="category"
          value={form.category || ""}
          onChange={change}>
          <option value=""> Select Category</option>
          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}>
              {category.name}
            </option>
          ))} </select>
        {/* FOOD TYPE */}
        <select
          name="foodType"
          value={form.foodType || ""}
          onChange={change} >
          <option value=""> Food Type (Optional) </option>
          <option value="veg"> 🟢 Veg</option>
 <option value="nonveg"> 🔴 Non-Veg </option>
        </select>
        {/* IMAGE */}
        <input
          name="image"
          placeholder="Image URL"
          value={form.image || ""}
          onChange={change}/>
        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Food description"
          value={form.description || ""}
          onChange={change} />
        {/* AVAILABLE */}
        <label className="available">
          <input
            name="available"
            type="checkbox"
            checked={form.available ?? true}
            onChange={change}/>
          Available</label></div>
      {/* BUTTONS */}
      <div className="form-buttons">
        <button onClick={save}>
          {editing
            ? "Update Food"
            : "Add Food"} </button>
        {editing && (
          <button
            className="cancel"
            onClick={reset}>
            Cancel</button>
        )}
      </div>
    </div>
  );}
export default FoodForm;