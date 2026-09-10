import "../styles/About.css";

function About() {
  return (
    <div className="about-page">

      <main className="about-content">

        <section className="about-hero">
          <span>🍽️ ABOUT US</span>

          <h1>
            Good food.
            <br />
            <strong>Simple ordering.</strong>
          </h1>

          <p>
            RestaurantQR makes dining easier by allowing customers
            to browse the menu and order directly from their table.
          </p>
        </section>

        <section className="about-cards">

          <div className="about-card">
            <span>📱</span>
            <h2>Easy Ordering</h2>
            <p>
              Scan the table QR code, explore the menu and order
              without waiting for a waiter.
            </p>
          </div>

          <div className="about-card">
            <span>🍕</span>
            <h2>Fresh Food</h2>
            <p>
              Browse our selection of delicious meals and choose
              exactly what you are craving.
            </p>
          </div>

          <div className="about-card">
            <span>⚡</span>
            <h2>Fast Service</h2>
            <p>
              Your order goes directly to the restaurant team,
              making the ordering process faster and easier.
            </p>
          </div>

        </section>

        <section className="about-bottom">
          <h2>RestaurantQR</h2>

          <p>
            Making restaurant dining smarter, faster and more convenient.
          </p>
        </section>

      </main>

    </div>
  );
}

export default About;