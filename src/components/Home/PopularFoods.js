import { useNavigate } from "react-router-dom";

function PopularFoods() {
  const navigate = useNavigate();

  const foods = [
    {
      image: "🍕",
      type: "veg",
      name: "Cheese Pizza",
      description: "Loaded with mozzarella and fresh toppings.",
      price: 450,
    },
    {
      image: "🥟",
      type: "nonveg",
      name: "Chicken Momo",
      description: "Juicy steamed dumplings with spicy sauce.",
      price: 220,
    },
    {
      image: "🍔",
      type: "nonveg",
      name: "Chicken Burger",
      description: "Crispy chicken with fresh vegetables.",
      price: 350,
    },
  ];

  return (
    <section className="popular-section">

      <div className="section-title">

        <div>
          <span>OUR FAVORITES</span>
          <h2>Popular right now</h2>
        </div>

        <button onClick={() => navigate("/menu")}>
          Full menu →
        </button>

      </div>

      <div className="popular-grid">

        {foods.map(food => (

          <div
            className="popular-card"
            key={food.name}
          >

            <div className="popular-image">

              <span className="popular-food">
                {food.image}
              </span>

              <span
                className={
                  food.type === "veg"
                    ? "food-type veg"
                    : "food-type nonveg"
                }
              >
                {food.type === "veg"
                  ? "● VEG"
                  : "● NON-VEG"}
              </span>

            </div>

            <div className="popular-info">

              <h3>{food.name}</h3>

              <p>{food.description}</p>

              <div className="popular-bottom">

                <strong>
                  Rs. {food.price}
                </strong>

                <button
                  onClick={() =>
                    navigate("/customer-info")
                  }
                >
                  + Add
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default PopularFoods;