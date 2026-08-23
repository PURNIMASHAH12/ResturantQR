import HomeNavbar from "../components/Home/HomeNavbar";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/HomeCategories";
import PopularFoods from "../components/Home/PopularFoods";
import WhyChoose from "../components/Home/WhyChoose";
import OrderFlow from "../components/Home/OrderFlow";
import FinalCTA from "../components/Home/HomeCTA";
import HomeFooter from "../components/Home/HomeFooter";

import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      <HomeNavbar />

      <main>
        <Hero />
        <Categories />
        <PopularFoods />
        <WhyChoose />
        <OrderFlow />
        <FinalCTA />
      </main>

      <HomeFooter />

    </div>
  );
}

export default Home;