import { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const baseUrl = "https://api.weatherapi.com/v1/";
  const backgroundThemes = {
    1000: "bg-gradient-to-b from-yellow-200 to-blue-200", // Sunny / Clear
    1003: "bg-gradient-to-b from-blue-100 to-gray-200", // Partly Cloudy
    1006: "bg-gradient-to-b from-gray-300 to-gray-400", // Cloudy
    1009: "bg-gradient-to-b from-gray-400 to-gray-600", // Overcast
    1030: "bg-gradient-to-b from-gray-200 to-gray-300", // Mist
    1063: "bg-gradient-to-b from-blue-200 to-gray-300", // Patchy Rain Possible
    1066: "bg-gradient-to-b from-gray-200 to-white", // Patchy Snow Possible
    1069: "bg-gradient-to-b from-gray-300 to-blue-200", // Patchy Sleet Possible
    1072: "bg-gradient-to-b from-gray-300 to-blue-100", // Patchy Freezing Drizzle
    1087: "bg-gradient-to-b from-gray-600 to-yellow-200", // Thundery Outbreaks
    1114: "bg-gradient-to-b from-white to-gray-300", // Blowing Snow
    1117: "bg-gradient-to-b from-gray-400 to-white", // Blizzard
    1135: "bg-gradient-to-b from-gray-300 to-gray-500", // Fog
    1147: "bg-gradient-to-b from-gray-400 to-blue-100", // Freezing Fog
    1150: "bg-gradient-to-b from-blue-100 to-gray-200", // Patchy Light Drizzle
    1153: "bg-gradient-to-b from-blue-200 to-gray-300", // Light Drizzle
    1168: "bg-gradient-to-b from-blue-100 to-gray-300", // Freezing Drizzle
    1171: "bg-gradient-to-b from-blue-200 to-gray-400", // Heavy Freezing Drizzle
    1180: "bg-gradient-to-b from-blue-200 to-gray-300", // Patchy Light Rain
    1183: "bg-gradient-to-b from-blue-300 to-gray-400", // Light Rain
    1186: "bg-gradient-to-b from-blue-400 to-gray-500", // Moderate Rain at Times
    1189: "bg-gradient-to-b from-blue-500 to-gray-600", // Moderate Rain
    1192: "bg-gradient-to-b from-blue-600 to-gray-700", // Heavy Rain at Times
    1195: "bg-gradient-to-b from-blue-700 to-gray-800", // Heavy Rain
    1198: "bg-gradient-to-b from-blue-100 to-gray-300", // Light Freezing Rain
    1201: "bg-gradient-to-b from-blue-200 to-gray-400", // Moderate/Heavy Freezing Rain
    1204: "bg-gradient-to-b from-gray-200 to-blue-100", // Light Sleet
    1207: "bg-gradient-to-b from-gray-300 to-blue-200", // Moderate/Heavy Sleet
    1210: "bg-gradient-to-b from-gray-100 to-white", // Patchy Light Snow
    1213: "bg-gradient-to-b from-gray-200 to-white", // Light Snow
    1216: "bg-gradient-to-b from-gray-300 to-white", // Patchy Moderate Snow
    1219: "bg-gradient-to-b from-gray-400 to-white", // Moderate Snow
    1222: "bg-gradient-to-b from-gray-500 to-white", // Patchy Heavy Snow
    1225: "bg-gradient-to-b from-gray-600 to-white", // Heavy Snow
    1237: "bg-gradient-to-b from-gray-200 to-blue-100", // Ice Pellets
    1240: "bg-gradient-to-b from-blue-200 to-gray-300", // Light Rain Shower
    1243: "bg-gradient-to-b from-blue-400 to-gray-500", // Moderate/Heavy Rain Shower
    1246: "bg-gradient-to-b from-blue-600 to-gray-700", // Torrential Rain Shower
    1249: "bg-gradient-to-b from-gray-200 to-blue-100", // Light Sleet Showers
    1252: "bg-gradient-to-b from-gray-300 to-blue-200", // Moderate/Heavy Sleet Showers
    1255: "bg-gradient-to-b from-gray-200 to-white", // Light Snow Showers
    1258: "bg-gradient-to-b from-gray-400 to-white", // Moderate/Heavy Snow Showers
    1261: "bg-gradient-to-b from-gray-200 to-blue-100", // Light Ice Pellet Showers
    1264: "bg-gradient-to-b from-gray-300 to-blue-200", // Moderate/Heavy Ice Pellet Showers
    1273: "bg-gradient-to-b from-gray-400 to-yellow-200", // Patchy Light Rain with Thunder
    1276: "bg-gradient-to-b from-gray-600 to-yellow-300", // Moderate/Heavy Rain with Thunder
    1279: "bg-gradient-to-b from-gray-300 to-yellow-200", // Patchy Light Snow with Thunder
    1282: "bg-gradient-to-b from-gray-500 to-yellow-300", // Moderate/Heavy Snow with Thunder
  };
  const cities = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Dubai",
    "Berlin",
    "Sydney",
    "Los Angeles",
    "Toronto",
    "Singapore",
    "Madrid",
    "Rome",
    "Shanghai",
    "Moscow",
    "Istanbul",
    "Mumbai",
    "Seoul",
    "Bangkok",
    "São Paulo",
    "Mexico City",
    "Riyadh",
    "Jeddah",
    "Abu Dhabi",
    "Doha",
    "Kuwait City",
    "Manama",
    "Muscat",
    "Amman",
    "Beirut",
    "Damascus",
    "Baghdad",
    "Tehran",
    "Najaf",
    "Mashhad",
    "Aleppo",
    "Sana'a",
    "Gaza",
    "Medina",
    "Mecca",
    "Cairo",
    "Alexandria",
    "Giza",
    "Luxor",
    "Aswan",
    "Sharm El Sheikh",
    "Hurghada",
    "Mansoura",
    "Tanta",
    "Zagazig",
    "Ismailia",
    "Suez",
    "Port Said",
    "Fayoum",
    "Beni Suef",
    "Minya",
    "Assiut",
    "Sohag",
    "Qena",
    "Damanhour",
  ];
  const [forecast, setForecast] = useState({});
  const [fetching, setFetching] = useState(true);
  const [city, setCity] = useState(cities[0]);
  const [theme, setTheme] = useState(backgroundThemes[`1000`]);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  useEffect(() => {
    if (theme) {
      document.body.className = theme;
    }
  }, [theme]);

  async function fetchWeather() {
    setFetching(true);
    const params = new URLSearchParams({
      key: import.meta.env.VITE_API_KEY,
      q: city,
      aqi: "no",
      days: 7,
      alerts: "no",
    });

    try {
      const response = await fetch(`${baseUrl}forecast.json?${params}`);
      const data = await response.json();
      if (!data.error) {
        setForecast(data);
        setTimeout(() => {
          setTheme(backgroundThemes[data.current.condition.code]);
          setFetching(false);
        }, 500);
      } else {
        console.error("Error fetching weather:", data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleCityChange(event) {
    setCity(event.target.textContent);
  }

  function getWeekday(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  return (
    <WeatherContext.Provider
      value={{
        forecast,
        fetching,
        city,
        cities,
        theme,
        handleCityChange,
        getWeekday,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
