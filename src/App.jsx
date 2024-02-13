import axios from "axios";
import React, { useState, useEffect } from "react";

import rainy from "./weather/rain.png";
import smoke from "./weather/somke.png";
import mint from "./weather/mint.png";
import clear from "./weather/clear.png";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Hyderabad");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ? true : false
  );

  const images = [rainy, smoke, mint, clear];

  const apiKey = "05a2d649a4026b65dab7bc09a5e38f8a";

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toCelsius = (foreign) => {
    return ((foreign - 32) * 5) / 9;
  };
  const fetchWeatherData = (city) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.cod === 200) {
          setData(res.data);
          console.log(res.data);
          if (res.data.weather[0].main === "Clouds") {
            setImage(images[0]);
          } else if (res.data.weather[0].main === "Clear") {
            setImage(images[3]);
          } else if (res.data.weather[0].main === "Mint") {
            setImage(images[2]);
          } else if (res.data.weather[0].main === "Rain") {
            setImage(images[0]);
          } else if (res.data.weather[0].main === "Smoke") {
            setImage(images[1]);
          } else {
            setImage(images[3]);
          }
          setError(null);
        } else {
          setError("Weather data not available for this city");
        }
      })
      .catch((error) => {
        setError(`Weather is not available for ${location} city`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchWeatherData(location);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter the place"
        />
      </div>
      <button
        className={`btn ${darkMode ? "dark" : "light"}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? "Light" : "Dark"}
      </button>
      {loading && <p className="loading">loading</p>}
      {error && <p className="error">{error}</p>}
      {!loading && (
        <div className="container">
          <div className="top">
            <div>
              <p className="city">{data.name}</p>
              <h1 className="temp">
                {data.main && Math.round(toCelsius(data.main.temp))} &#x2103;
              </h1>
              <p className="temp">
                {data.weather && data.weather[0].description}
              </p>
            </div>
            <div className="temp_d">
              <p className="bold">{data.weather && data.weather[0].main}</p>
              <img src={image} alt="image" />
            </div>
          </div>
          <div className="button">
            <div className="feels bold">
              <p>
                {data.main && Math.round(toCelsius(data.main.feels_like))}{" "}
                &#x2103;
              </p>
              <p>Feels Like</p>
            </div>
            <div className="humidity bold">
              <p>{data.main && data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind bold">
              <p>{data.wind && data.wind.speed} KMPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
