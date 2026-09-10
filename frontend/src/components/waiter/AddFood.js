import { useMemo, useState } from "react";

function AddFood({ foods, onAdd }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get available foods only
  const availableFoods = useMemo(() => {
    return foods.filter(
      (food) => food.available !== false
    );
  }, [foods]);

  // Get categories from foods
  const categories = useMemo(() => {
    const categoryNames = availableFoods
      .map((food) => {
        if (typeof food.category === "object") {
          return food.category?.name;
        }

        return food.category;
      })
      .filter(Boolean);

    return [
      "All",
      ...new Set(categoryNames),
    ];
  }, [availableFoods]);

  // Filter foods
  const filteredFoods = useMemo(() => {
    return availableFoods.filter((food) => {
      const foodCategory =
        typeof food.category === "object"
          ? food.category?.name
          : food.category;

      const matchesCategory =
        category === "All" ||
        foodCategory === category;

      const matchesSearch =
        food.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    availableFoods,
    search,
    category,
  ]);

  return (
    <div className="professional-add-food">

      {/* HEADER */}
      <div className="add-food-header">

        <div>
          <h4>Add Food Items</h4>
          <p>
            Select items to add to this order.
          </p>
        </div>

        <span className="available-count">
          {filteredFoods.length} items
        </span>

      </div>

      {/* SEARCH */}
      <div className="food-search-wrapper">

        <span className="food-search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {search && (
          <button
            type="button"
            className="clear-food-search"
            onClick={() => setSearch("")}
          >
            ×
          </button>
        )}

      </div>

      {/* CATEGORIES */}
      {categories.length > 1 && (
        <div className="food-category-list">

          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={
                category === item
                  ? "food-category active"
                  : "food-category"
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>
          ))}

        </div>
      )}

      {/* FOOD LIST */}
      <div className="food-selection-list">

        {!filteredFoods.length ? (
          <div className="no-food-found">
            <span>🍽️</span>

            <strong>
              No food items found
            </strong>

            <p>
              Try another search or category.
            </p>
          </div>
        ) : (
          filteredFoods.map((food) => (
            <div
              className="food-selection-item"
              key={food._id}
            >

              <div className="food-selection-info">

                <strong>
                  {food.name}
                </strong>

                <span>
                  Rs.{" "}
                  {Number(food.price).toLocaleString()}
                </span>

              </div>

              <button
                type="button"
                className="add-food-button"
                onClick={() =>
                  onAdd(food)
                }
              >
                <span>+</span>
                Add
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default AddFood;
