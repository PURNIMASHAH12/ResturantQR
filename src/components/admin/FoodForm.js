function FoodForm({
  form,
  setForm,
  categories,
  editing,
  save,
  reset
}) {

  const change = e => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <div className="food-form-card">

      <h2>
        {editing ? "✏️ Edit Food" : "➕ Add New Food"}
      </h2>

      <div className="food-form">

        <input
          name="name"
          placeholder="Food name"
          value={form.name}
          onChange={change}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={change}
        />

        <select
          name="category"
          value={form.category}
          onChange={change}
        >
          <option value="">Select Category</option>

          {categories.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          name="foodType"
          value={form.foodType}
          onChange={change}
        >
          <option value="">Food Type (Optional)</option>
          <option value="veg">🟢 Veg</option>
          <option value="nonveg">🔴 Non-Veg</option>
        </select>

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={change}
        />

        <textarea
          name="description"
          placeholder="Food description"
          value={form.description}
          onChange={change}
        />

        <label className="available">
          <input
            name="available"
            type="checkbox"
            checked={form.available}
            onChange={change}
          />
          Available
        </label>

      </div>

      <div className="form-buttons">

        <button onClick={save}>
          {editing ? "💾 Update Food" : "➕ Add Food"}
        </button>

        {editing && (
          <button className="cancel" onClick={reset}>
            Cancel
          </button>
        )}

      </div>

    </div>
  );
}

export default FoodForm;