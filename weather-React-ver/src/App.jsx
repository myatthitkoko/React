import React, { useEffect, useState } from  'react';
import "./App.css";

function App() {

  const defaultCities = [
    "Los Angeles",
    "San Francisco",
    "New York",
    "Portofino",
    "London",
    "Paris",
    "Yangon",
    "Tokyo",
    "Seoul"
  ]

  let tempUnit = "fahrenheit";
  let status;
  const [weatherList, setWeatherList] = useState([]);

  async function getCityData(city) {
    const url = "https://nominatim.openstreetmap.org/search?q=" + city + "&format=json&limit=1";
    const response = await fetch(url);
    const reply = await response.json();

    return ({
      latitude: reply[0].lat,
      longitude: reply[0].lon
    });
  }

  async function getWeather(latitude, longitude) {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=precipitation_probability&current=temperature_2m,cloud_cover&wind_speed_unit=mph&temperature_unit=" + tempUnit + "&precipitation_unit=inch";
    const response = await fetch(url);
    const weather = await response.json();
    console.log(weather);
    
    return weather.current.temperature_2m;
  }

  useEffect(() => {
    async function loadCities() {
      const results = [];

      for (const city of defaultCities) {
        const coords = await getCityData(city);
        const temp = await getWeather(coords.latitude, coords.longitude);

        if (temp >= 80) {
          status = "🔥";
        } else if (temp >= 70) {
          status = "⛅";
        } else if (temp >= 60) {
          status = "☀️";
        } else {
          status = "❄️";
        }
        
        results.push ({
          city,
          coords,
          temp,
          status
        });
      }

      setWeatherList(results);
    }

    loadCities();
  }, []);

  return (
    <>
      <h1>Weather List <span className="small">Powered with</span>API and React</h1>
      {weatherList.map((item, index) => (
        <React.Fragment key={index}>
          <div className="city" key={index}>
            <h3>{item.city}</h3>
            <p>{item.temp} {item.status}</p>
          </div>
          <hr></hr>
        </React.Fragment>
      ))}
    </>
  )
}

export default App