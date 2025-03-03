import React from "react";
import { useWeather } from "./WeatherContext";

const Forecast = () => {
  const { forecast, getWeekday } = useWeather();
  return (
    <div className="flex justify-center flex-wrap gap-5">
      {forecast.forecast.forecastday.map((day, i) => {
        return (
          <div
            key={i}
            className="flex flex-col gap-1 items-center justify-center bg-white px-5 py-0.5 cursor-pointer w-[80px] rounded-md shadow-lg"
          >
            <h3 className="font-medium">
              {i == 0
                ? "Today"
                : i == 1
                ? "Tomorrow"
                : getWeekday(day.date_epoch).slice(0, 3)}
            </h3>
            <p className="font-bold text-neutral-600">
              {day.day.avgtemp_c}&deg;
            </p>
            <p className="text-sm font-medium text-neutral-500 text-center">
              {day.day.condition.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
