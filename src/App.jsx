import { WeatherProvider } from "./WeatherContext";
import WeatherDisplay from "./WeatherDisplay";

function App() {
  return (
    <WeatherProvider>
      <WeatherDisplay />
    </WeatherProvider>
  );
}

export default App;
