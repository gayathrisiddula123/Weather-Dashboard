import React, { useState, useEffect } from 'react';
import './WeatherCard.css';
import { FaTint, FaWind } from 'react-icons/fa';

const Weather = () => {
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]); // State to hold country list

  // Fetch all countries from an API or use a static list
  useEffect(() => {
    // Fetching country list from an API (like restcountries)
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryList = data.map(country => ({
          code: country.cca2, // Country code
          name: country.name.common, // Country name
        }));
        const sortedCountryList = countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sortedCountryList);
      } catch (error) {
        console.error('Error fetching country list:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=695f1bf024a17a433bee3856f5648c40&units=metric`
      );
      
      console.log(response);
      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <div className="left-panel">
        <div className="location-date">
          <h2 className="location">{location}</h2>
          <p className="date">21.04.2021</p>
        </div>

        <div className="temperature-main">
          {weatherData ? (
            <>
              <p className="temperature">{Math.round(weatherData.main.temp)}&deg;C</p>
              <div className="weather-details">
                <FaWind className="icon" /> {weatherData.wind.speed} mph
              </div>
              <div className="weather-details">
                <FaTint className="icon" /> {weatherData.main.humidity}%
              </div>
              <p className="weather-status">{weatherData.weather[0].description}</p>
            </>
          ) : (
            <>
              <p className="temperature">20&deg;</p>
              <div className="weather-details">
                <FaWind className="icon" /> 6.1 mph
              </div>
              <div className="weather-details">
                <FaTint className="icon" /> 90%
              </div>
              <p className="weather-status">Cloudy</p>
            </>
          )}
        </div>

        <div className="forecast">
          <div className="forecast-item-today">
            <p className="day">Today</p>
            <p className="temp">20&deg;</p>
            <p className="weather-day">Mist</p>
          </div>
          <div className="forecast-item">
            <p className="day">Tue</p>
            <p className="temp">32&deg;</p>
            <p className="weather-day">Sunny</p>
          </div>
          <div className="forecast-item">
            <p className="day">Wed</p>
            <p className="temp">12&deg;</p>
            <p className="weather-day">Rainy</p>
          </div>
          <div className="forecast-item">
            <p className="day">Thu</p>
            <p className="temp">13&deg;</p>
            <p className="weather-day">Rainy</p>
          </div>
          <div className="forecast-item">
            <p className="day">Fri</p>
            <p className="temp">22&deg;</p>
            <p className="weather-day">Mist</p>
          </div>
          <div className="forecast-item">
            <p className="day">Sat</p>
            <p className="temp">22&deg;</p>
            <p className="weather-day">Mist</p>
          </div>
        </div>
      </div>

      <div className="right-panel">
        {/* Country dropdown */}
        <select 
            value={country} 
            onChange={handleCountryChange} 
            className="country-dropdown"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
        </select>
        
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            value={location}
            onChange={handleSearchChange}
            placeholder="Search location..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <h3 className="greeting">Good Morning</h3>
        <p className="time">12:27 PM</p>

        {weatherData ? (
          <div className="current-weather">
            <span className="temp-right">{Math.round(weatherData.main.temp)}&deg;C</span>
            <span className="weather-details"><FaWind className="icon" /> {weatherData.wind.speed} mph</span>
            <span className="weather-details"><FaTint className="icon" /> {weatherData.main.humidity}%</span>
          </div>
        ) : (
          <div className="current-weather">
            <span className="temp-right">20&deg;</span>
            <span className="weather-details"><FaWind className="icon" /> 6.1 mph</span>
            <span className="weather-details"><FaTint className="icon" /> 90%</span>
          </div>
        )}

        <div>
          <p className="temp2">Feels like {weatherData ? Math.round(weatherData.main.feels_like) : "19"}&deg;C</p>
          <p className="temp1">{weatherData ? weatherData.weather[0].main : "Cloudy"}</p>
        </div>

        <div className="hourly-forecast">
          <h4 className="hourly">Hourly Forecast</h4>
          <div className="hourly-forecast-grid">
            <div className="hour">
              <span className="timing">1 PM</span>
              <span className="deg">20&deg;</span>
              <span className="weather-day">Cloudy</span>
            </div>
            <div className="hour">
              <span className="timing">2 PM</span>
              <span className="deg">21&deg;</span>
              <span className="weather-day">Rainy</span>
            </div>
            <div className="hour">
              <span className="timing">3 PM</span>
              <span className="deg">21&deg;</span>
              <span className="weather-day">Rainy</span>
            </div>
            <div className="hour">
              <span className="timing">4 PM</span>
              <span className="deg">20&deg;</span>
              <span className="weather-day">Cloudy</span>
            </div>
            <div className="hour">
              <span className="timing">5 PM</span>
              <span className="deg">21&deg;</span>
              <span className="weather-day">Rainy</span>
            </div>
            <div className="hour">
              <span className="timing">6 PM</span>
              <span className="deg">21&deg;</span>
              <span className="weather-day">Rainy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
