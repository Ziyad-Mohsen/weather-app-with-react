import React from "react";
import { LuWind } from "react-icons/lu";
import { MdOutlineWaterDrop } from "react-icons/md";

const Weather = ({ forecast }) => {
  const time = forecast.location.localtime.split(" ")[1];
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center justify-center text-neutral-600 gap-5 cursor-default">
        <h1 className="text-9xl font-semibold">
          {forecast.current.temp_c}&deg;
        </h1>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-semibold">
            {`${time} ${parseInt(time.split(":")[0]) >= 12 ? "PM" : "AM"}`}
          </div>
          <div className="flex items-center">
            <img
              src={`https:${forecast.current.condition.icon}`}
              alt={forecast.current.condition.text}
            />
            <p className="text-2xl font-medium ">
              {forecast.current.condition.text}
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-default">
        <div className="flex items-center gap-2 text-neutral-800 text-md font-medium">
          <LuWind className="text-2xl text-neutral-800" />
          <div>{forecast.current.wind_kph} km/h</div>
        </div>
        <div className="flex items-center gap-2 text-neutral-800 text-md font-medium">
          <MdOutlineWaterDrop className="text-2xl text-neutral-800" />
          <div>{forecast.current.humidity}%</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
