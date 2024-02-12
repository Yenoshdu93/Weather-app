import axios from "axios";
import React, { useState, useEffect } from "react";
import rainy from "./assets/ringandsunny.png";
import clear from "./assets/clear.png";
import mint from "./assets/mint.png";
import sunny from "./assets/sunny.png";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Hyderabad");
  const [image, setImage] = useState("");

  const images = [rainy, clear, mint, sunny];

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
          if (res.data.weather[0].main === "Clouds") {
            setImage(images[0]);
          } else if (res.data.weather[0].main === "Clear") {
            setImage(images[1]);
          } else if (res.data.weather[0].mian === "Mint") {
            setImage(images[2]);
          } else {
            setImage(images[3]);
          }
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
            <h1 className="temp">
              {data.main && Math.floor(data.main.temp)} &#x2109;
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
            <p>{data.main && data.main.feels_like} &#x2109;</p>
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
