import FoodCard from "./FoodCard";
function FoodGrid({ foods, onSelect }) {
  return (
    <div className="food-grid">

      {foods.map(food => (
        <div className="food-card" key={food._id}>

          {food.image && (
            <img
              src={food.image}
              alt={food.name}
            />
          )}

          <div className="food-info">

            <h2>
              {food.foodType === "veg" && (
                <span className="veg-symbol">●</span>
              )}

              {food.foodType === "nonveg" && (
                <span className="nonveg-symbol">●</span>
              )}

              {food.name}
            </h2>

            <p>{food.description}</p>

            <div className="food-bottom">

              <b>Rs. {food.price}</b>

              <button onClick={() => onSelect(food)}>
                + Add
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}

export default FoodGrid;