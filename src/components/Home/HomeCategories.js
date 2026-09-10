import { useNavigate } from "react-router-dom";

function HomeCategories() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: "🍕",
      name: "Pizza",
      text: "Fresh & cheesy",
    },
    {
      icon: "🥟",
      name: "Momo",
      text: "Steamed & spicy",
    },
    {
      icon: "🍔",
      name: "Burgers",
      text: "Big & juicy",
    },
    {
      icon: "🍟",
      name: "Snacks",
      text: "Perfect bites",
    },
    {
      icon: "🥤",
      name: "Drinks",
      text: "Cool & refreshing",
    },
  ];

  return (
    <section className="categories-section">

      <div className="section-title">

        <div>
          <span>EXPLORE</span>
          <h2>What are you craving?</h2>
        </div>

        <button onClick={() => navigate("/menu")}>
          View all →
        </button>

      </div>

      <div className="category-grid">

        {categories.map(category => (

          <div
            className="category-card"
            key={category.name}
            onClick={() => navigate("/customer-info")}
          >

            <div className="category-icon">
              {category.icon}
            </div>

            <div>
              <h3>{category.name}</h3>
              <p>{category.text}</p>
            </div>

            <span className="category-arrow">
              →
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HomeCategories;