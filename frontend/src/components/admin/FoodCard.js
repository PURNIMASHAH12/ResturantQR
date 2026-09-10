function FoodCard({ food, onEdit, onDelete }) {
  return (
    <div className="food-card">

      <div className="food-image">

        {food.image ? (
          <img src={food.image} alt={food.name} />
        ) : (
          <span>No Image</span>
        )}

        <span
          className={
            food.available
              ? "status available"
              : "status unavailable"
          }
        >
          {food.available ? "Available" : "Unavailable"}
        </span>

      </div>

      <div className="food-info">

        <small>
          {food.category?.name || "Uncategorized"}
        </small>

        <h2>
          {food.foodType === "veg" && (
            <span className="veg-symbol">●</span>
          )}

          {food.foodType === "nonveg" && (
            <span className="nonveg-symbol">●</span>
          )}

          {food.name}
        </h2>

        <p>
          {food.description || "No description"}
        </p>

        <strong>
          Rs. {food.price}
        </strong>

      </div>

      <div className="food-actions">

        <button onClick={() => onEdit(food)}>
          Edit
        </button>

        <button
          className="delete"
          onClick={() => onDelete(food._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default FoodCard;