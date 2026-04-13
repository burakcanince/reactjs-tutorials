import { create } from "zustand";

type WeatherData = {
  temperature: number;
  windspeed: number;
};

type WeatherStore = {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
};

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  loading: false,
  error: null,

  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (!data.current) {
        throw new Error("No current weather data found");
      }

      set({
        weatherData: {
          temperature: data.current.temperature_2m,
          windspeed: data.current.wind_speed_10m,
        },
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Unknown error", loading: false });
    }
  },
}));
