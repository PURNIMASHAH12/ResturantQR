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

      setCategories(
        res.data.categories || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {

    if (!name.trim()) {
      return alert("Enter category name");
    }

    try {

      if (editing) {

        await API.put(
          `/categories/${editing}`,
          { name }
        );

      } else {

        await API.post(
          "/categories",
          { name }
        );

      }

      setName("");
      setEditing(null);

      load();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to save category"
      );

    }
  };


  const edit = (category) => {
    setEditing(category._id);
    setName(category.name);
  };


  const remove = async (id) => {

    if (!window.confirm("Delete category?")) {
      return;
    }

    try {

      await API.delete(
        `/categories/${id}`
      );

      load();

    } catch (err) {

      alert("Failed to delete");

    }
  };


  const cancelEdit = () => {
    setEditing(null);
    setName("");
  };


  return (
    <div>
      <main className="admin-categories">

        <div className="categories-header">

          <div>
            <h1>Categories</h1>

            <p>
              Organize your restaurant menu
            </p>
          </div>

          <div className="category-count">
            <strong>
              {categories.length}
            </strong>

            <span>
              Categories
            </span>
          </div>

        </div>


        <div className="category-form">

          <input
            value={name}
            placeholder="Category name"
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <button onClick={save}>

            {editing
              ? " Update"
              : " Add"}

          </button>


          {editing && (

            <button
              className="cancel"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          )}

        </div>


        <div className="category-list">

          {categories.map((category) => (

            <div
              className="category-card"
              key={category._id}
            >

              <div>
                <h2>
                  {category.name}
                </h2>

              </div>


              <div className="category-actions">

                <button
                  onClick={() =>
                    edit(category)
                  }
                >
                  Edit
                </button>


                <button
                  onClick={() =>
                    remove(category._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>


        {!categories.length && (

          <div className="empty-category">
             No categories yet
          </div>

        )}

      </main>

    </div>
  );
}

export default AdminCategories;