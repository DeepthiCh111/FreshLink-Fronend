import React from "react";

const CategoryCard = ({ name, color }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-md  ${color} text-black text-center text-sm font-semibold`}
    >
      {name}
    </div>
  );
};

export default CategoryCard;
