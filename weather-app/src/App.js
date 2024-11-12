import './App.css';
import React from 'react';
import WeatherIcons from './components/WeatherIcons';
import WeatherCard from './components/WeatherCard';



function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
          <WeatherCard />
          <div className="flex justify-around text-center mt-4">
            <WeatherIcons />
        </div>
        </div>
  );
}

export default App;
