import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useWeather } from "./WeatherContext";

const CitySelect = () => {
  const [showSelect, setShowSelect] = useState(false);
  const { cities, city, handleCityChange } = useWeather();
  return (
    <div
      className={`${
        showSelect ? "shadow-2xl" : "shadow-none"
      } transition-shadow bg-gray-100 p-2 rounded-lg flex flex-col relative cursor-pointer`}
      onClick={() => {
        setShowSelect(!showSelect);
      }}
    >
      {/* Select */}
      <div className="flex gap-5 items-center">
        <div>{city}</div>
        <IoIosArrowDown
          className={`inline-block transition-transform ${
            showSelect ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {/* Drop Down */}
      <div
        className={`${
          showSelect ? "opacity-100" : "opacity-0"
        } absolute top-[110%] left-0 bg-gray-100 overflow-y-scroll h-[300px] transition-all scrollbar-hide shadow-2xl rounded-lg`}
      >
        {cities.map((city, i) => {
          return (
            <div
              key={i}
              className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors p-2 w-full text-gray-700"
              onClick={handleCityChange}
            >
              {city}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CitySelect;
