import { useEffect } from "react";
import { useWeatherStore } from './store'

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeatherStore()
  const latitude = 41.015137
  const longitude = 28.979530

  useEffect(() => {
    fetchWeather(latitude, longitude)
  }, [fetchWeather])

  if (loading) return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
    </div>
  )

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Weather App</h1>
      {weatherData ? (
        <div className="text-center">
          <p><span className="font-bold mr-1">Temperature:</span>{weatherData.temperature}°C</p>
          <p><span className="font-bold mr-1">Wind Speed:</span>{weatherData.windspeed} m/s</p>
        </div>
      ) : (
        <p className="font-bold text-center">No data yet</p>
      )}
    </>
  );
}

export default App;
