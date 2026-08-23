import { useEffect, useState } from "react";
import API from "../../services/Api";
import "../../styles/AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const load = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.log(err);
    }};
  useEffect(() => {
    load();
  }, []);
  const save = async () => {
    if (!name.trim()) return alert("Enter category name");
    try {
      if (editing) {
        await API.put(`/categories/${editing}`, { name });
      } else {
        await API.post("/categories", { name });
      }
      setName("");
      setEditing(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }};
 const edit = (category) => {
  console.log("CATEGORY:", category);
  console.log("ID:", category._id);
  console.log("ID LENGTH:", category._id?.length);
  setEditing(category._id);
  setName(category.name);
};
  const remove = async (id) => {
    if (!window.confirm("Delete category?")) return;
    try {
      await API.delete(`/categories/${id}`);
      load();
    } catch (err) {
      alert("Failed to delete");
    }};
  return (
    <div className="admin-categories">
      <h1>📂 Categories</h1>
      <div className="category-form">
        <input
          value={name}
          placeholder="Category name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={save}>
          {editing ? "💾 Update" : "➕ Add"}
        </button>
        {editing && (
          <button onClick={() => {
            setEditing(null);
            setName("");
          }}>
            Cancel
          </button>
        )}
      </div>
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-card" key={category._id}>
            <h2>{category.name}</h2>
            <div>
              <button onClick={() => edit(category)}>
                ✏️
              </button>
              <button onClick={() => remove(category._id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;