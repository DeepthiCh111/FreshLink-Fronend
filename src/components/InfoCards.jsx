const features = [
  { title: "Location Based", icon: "📍" },
  { title: "Real-Time Updates", icon: "⏱️" },
  { title: "Quality Assured", icon: "✅" },
  { title: "Fast Delivery", icon: "⚡" },
];

const InfoCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-green-700 mt-20 z-50 py-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-xl w-40 text-white text-center"
        >
          <div className="text-3xl text-orange-400">{f.icon}</div>
          <h3 className="font-semibold mt-2">{f.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
