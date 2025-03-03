import { IoMdRefresh } from "react-icons/io";
import { useWeather } from "./WeatherContext";

import Loading from "./Loading";
import CitySelect from "./CitySelect";
import Forecast from "./Forecast";
import Weather from "./weather";

export default function WeatherDisplay() {
  const { forecast, fetching, fetchWeather } = useWeather();

  return (
    <main className="lg:w-[850px] md:w-[550px] w-full md:min-h-[435px] bg-[#ffffffcc] p-5 rounded-lg flex flex-col items-center gap-7 shadow-2xl">
      <header className="flex justify-between items-center w-full">
        {/* City Dropdown Selection */}
        <CitySelect />
        {/* Refresh button */}
        <button
          className={`${
            fetching && "animate-spin"
          } cursor-pointer p-1 focus:border-none`}
          onClick={fetchWeather}
        >
          <IoMdRefresh className="text-xl" />
        </button>
        {/* Date */}
        <div className="text-gray-700 text-lg font-semibold bg-white p-2 rounded-md min-w-[100px] min-h-[30px]">
          {!fetching && forecast.location.localtime.split(" ")[0]}
        </div>
      </header>

      {!fetching ? <Weather forecast={forecast} /> : <Loading />}

      {!fetching && <Forecast />}
    </main>
  );
}
