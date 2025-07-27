const steps = [
  {
    title: "Find Suppliers",
    desc: "Browse verified fresh food suppliers.",
    icon: "🔍",
  },
  {
    title: "Place Orders",
    desc: "Create custom orders, set recurring deliveries, and track everything.",
    icon: "📝",
  },
  {
    title: "Get Fresh Delivery",
    desc: "Receive ingredients right at your stall.",
    icon: "🚚",
  },
];

const HowItWorks = () => {
  return (
    <div className="text-center py-10 px-6 bg-white">
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        How FreshLink Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="border p-6 rounded-lg shadow-md">
            <div className="text-5xl mb-3">{step.icon}</div>
            <h3 className="text-xl font-semibold text-orange-500">
              {step.title}
            </h3>
            <p className="text-gray-600 mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
