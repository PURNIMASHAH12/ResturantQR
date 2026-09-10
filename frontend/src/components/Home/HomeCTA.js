import { useNavigate } from "react-router-dom";

function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section className="final-cta">

      <div>

        <span>READY WHEN YOU ARE</span>

        <h2>
          Hungry?
          <br />
          Let's fix that.
        </h2>

        <p>
          Pick your favorites and order directly
          from your table.
        </p>

        <button
          onClick={() => navigate("/customer-info")}
        >
          Browse Menu →
        </button>

      </div>

      <div className="cta-food">
        🍔
      </div>

    </section>
  );
}

export default HomeCTA;