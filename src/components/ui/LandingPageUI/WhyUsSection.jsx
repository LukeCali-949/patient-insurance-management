import React from "react";

const IconPlaceholder = ({ children }) => (
  <div className="text-3xl mb-2">{children}</div>
);

const StatCard = ({ icon, number, description }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300 ease-in-out">
    <IconPlaceholder>{icon}</IconPlaceholder>
    <div className="text-2xl font-semibold">{number}</div>
    <div className="text-gray-600">{description}</div>
  </div>
);

//bg-[#747264]
const WhySection = () => {
  return (
    <div className="py-[70px]    bg-gray-700">
      <h2 className="text-3xl text-center font-extrabold tracking-tight leading-none  text-white mb-8">
        Why Mediapp ?
      </h2>
      <div className="flex justify-center space-x-4">
        <StatCard
          icon="👥"
          number="270,000"
          description="Lives covered since inception"
        />
        <StatCard
          icon="🏥"
          number="1300+"
          description="Network Hospitals across the US"
        />
        <StatCard
          icon="⭐"
          number="4.8 Star Rating"
          description="Based on 8050 User reviews"
        />
        <StatCard
          icon="🛡️"
          number="98%"
          description="Patients found the right provider"
        />
      </div>
    </div>
  );
};

export default WhySection;
