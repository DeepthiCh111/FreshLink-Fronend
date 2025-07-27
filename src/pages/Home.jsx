import HeroSection from "../components/HeroSection";
import InfoCards from "../components/InfoCards";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div className="bg-green-700 min-h-screen mt-20">
      <HeroSection />
      {/* <InfoCards /> */}
      <HowItWorks />
    </div>
  );
};

export default Home;
