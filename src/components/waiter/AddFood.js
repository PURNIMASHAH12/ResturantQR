function AddFood({ foods, onAdd }) {
  return (
    <div className="add-food">
      <h4>➕ Add Food</h4>

      {foods
        .filter(food => food.available !== false)
        .map(food => (
          <button key={food._id} onClick={() => onAdd(food)}>
            + {food.name} - Rs. {food.price}
          </button>
        ))}
    </div>
  );
}

export default AddFood;