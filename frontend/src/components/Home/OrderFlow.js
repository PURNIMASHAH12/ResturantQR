import { useNavigate } from "react-router-dom";

function OrderFlow() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      icon: "📱",
      title: "Scan",
      text: "Scan the QR code on your table.",
    },
    {
      number: "02",
      icon: "🍽️",
      title: "Choose",
      text: "Explore the menu and pick your food.",
    },
    {
      number: "03",
      icon: "🛒",
      title: "Order",
      text: "Add items and confirm your order.",
    },
    {
      number: "04",
      icon: "😋",
      title: "Enjoy",
      text: "Sit back while we prepare your food.",
    },
  ];

  return (
    <section className="order-section">

      <div className="order-heading">

        <span>HOW IT WORKS</span>

        <h2>
          From QR to table
          <br />
          in four simple steps.
        </h2>

      </div>

      <div className="order-steps">

        {steps.map(step => (

          <div
            className="order-step"
            key={step.number}
          >

            <span className="step-number">
              {step.number}
            </span>

            <div className="step-icon">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.text}</p>

          </div>

        ))}

      </div>

      <button
        className="order-start"
        onClick={() => navigate("/customer-info")}
      >
        Start your order →
      </button>

    </section>
  );
}

export default OrderFlow;