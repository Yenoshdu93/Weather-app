import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Dallas");

  const apiKey = "05a2d649a4026b65dab7bc09a5e38f8a";

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  const fetchWeatherData = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.cod === 200) {
          setData(res.data);
          console.log(res.data);
        } else {
          console.error("Weather data not available for this city");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchWeatherData(location);
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter the place"
        />
      </div>
      <div className="container">
        <div className="top">
          <div>
            <p className="city">{data.name}</p>
            <h1 className="temp">{data.main && data.main.temp} &#8451;</h1>
            <p className="temp">
              {data.weather && data.weather[0].description}
            </p>
          </div>
          <div className="temp_d">
            <p className="bold">{data.weather && data.weather[0].main}</p>
            {/* <p>Max_temp - {data.main.temp_max && data.main.temp_max}</p>
            <p>Min_temp - {data.main.temp_min && data.main.temp_min}</p> */}
          </div>
        </div>
        <div className="button">
          <div className="feels bold">
            <p>{data.main && data.main.feels_like} &#8451;</p>
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
    </div>
  );
};

export default App;
