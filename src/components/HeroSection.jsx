import heroImg from "../utils/heroImg.jpg";
import InfoCards from "./InfoCards";
const HeroSection = () => {
  return (
    <div className="h-[90vh] mt-50 flex flex-col justify-center items-center bg-gren-70 text-white text-center px-4 pt-20">
      <h1 className="text-4xl md:text-6xl font-bold">
        Connect Street Food Vendors
      </h1>
      <h2 className="text-4xl md:text-5xl text-orange-400 font-semibold mt-2">
        With Fresh Suppliers
      </h2>
      <p className="mt-4 max-w-xl">
        Simplify procurement, ensure fresh vegetables, and build trusted
        supplier relations in real-time.
      </p>
      <InfoCards />
    </div>
  );
};

export default HeroSection;
