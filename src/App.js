import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=70a4df12bbf038860f9a5fcee151ce77"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setWeather(res);
        setIsLoading(false);
      });
  }, []);

  const getTemperature = (temp) => {
    return (temp - 273.15).toFixed(2) + "℃";
  };

  const getTime = (dt) => {
    let date = new Date(dt * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };

  const getDate = (dt) => {
    let date = new Date(dt * 1000);
    let day = "0" + date.getDate();
    return date.getFullYear() + "-" + date.getMonth() + "-" + day.substr(-2);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center mt-3">
          <div className="col">
            <div className="d-flex align-items-center flex-column">
              <h2 className="mb-4">
                <strong>{weather.name}</strong>
              </h2>
              <h6 className="">
                <strong>{getDate(weather.dt)}</strong>
              </h6>
              <h6 className="mb-4">
                <strong>{getTime(weather.dt)}</strong>
              </h6>
              {isLoading ? (
                <div></div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col">
                      <div className="d-flex align-items-center align-self-center flex-column">
                        <img
                          src={
                            "http://openweathermap.org/img/w/" +
                            weather.weather[0].icon +
                            ".png"
                          }
                          alt="icon"
                        />
                        <p>{weather.weather[0].description}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center flex-column">
                        <h1 className="">
                          {getTemperature(weather.main.temp)}
                        </h1>
                        <div className="">
                          Humidity: {weather.main.humidity}%
                        </div>
                        <div className="">Wind: {weather.wind.speed}m/s</div>
                        <div className="">Cloud: {weather.clouds.all}%</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="d-flex align-items-center flex-column">
                        <div className="mt-4">
                          Lon: {weather.coord.lon} Lat: {weather.coord.lat}
                        </div>
                        <div className="">
                          Feel Temperature:{" "}
                          {getTemperature(weather.main.feels_like)}
                        </div>
                        <div className="text-danger">
                          Max Temperature:{" "}
                          {getTemperature(weather.main.temp_max)}
                        </div>
                        <div className="text-primary">
                          Min Temperature:{" "}
                          {getTemperature(weather.main.temp_min)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
