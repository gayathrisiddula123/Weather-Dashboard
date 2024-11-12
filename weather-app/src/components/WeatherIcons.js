import React from 'react';

import { FaWind, FaTint } from 'react-icons/fa'; 

const WeatherIcons = ({ condition }) => {
  return (
    <div className="flex items-center space-x-4">
      {condition === "wind" && <FaWind className="text-gray-400 text-6xl" />}
      {condition === "humidity" && <FaTint className="text-blue-300 text-6xl" />}
    </div>
  );
};

export default WeatherIcons;
