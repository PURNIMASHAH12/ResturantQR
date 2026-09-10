import { useCart } from "../../context/CartContext";
import { useTable } from "../../context/TableContext";

function FoodGrid({ foods }) {
  const { addToCart } = useCart();

  const {
    customerName,
    tableNumber,
    orderType,
    contactNumber,
    deliveryAddress,
  } = useTable();

  const handleAdd = (food) => {
    const validDineIn =
      orderType === "dine_in" &&
      customerName &&
      tableNumber;

    const validParcel =
      orderType === "parcel" &&
      customerName &&
      contactNumber &&
      deliveryAddress;

    if (!validDineIn && !validParcel) {
      return;
    }

    addToCart({
      ...food,
      quantity: 1,
      remarks: "",
    });
  };

  return (
    <div className="food-grid">

      {foods.map((food) => (

        <div className="food-card" key={food._id}>

          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              loading="lazy"
              decoding="async"
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

              <b>
                Rs. {food.price}
              </b>

              <button
                onClick={() => handleAdd(food)}
              >
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