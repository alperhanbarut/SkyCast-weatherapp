import WeatherDetails from "@/components/WeatherDetails";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useParams } from "react-router-dom";
import { getCurrentWeather } from "@/api/weatherService";
import { useState, useEffect } from "react";
import type { CurrentWeather } from "@/api/weatherService";

function WeatherDetailsPage() {
  const { city } = useParams<{ city: string }>();
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city) {
        try {
          setLoading(true);
          const data = await getCurrentWeather(city);
          setWeatherData(data);
        } catch (error) {
          console.error("Weather data fetch failed:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWeatherData();
  }, [city]);

  const weatherCondition = loading
    ? "clear"
    : weatherData?.current.condition.text || "clear";

  return (
    <>
      <AnimatedBackground weatherCondition={weatherCondition} />
      <div className="relative mt-20 z-50 min-h-screen">
        <WeatherDetails />
      </div>
    </>
  );
}

export default WeatherDetailsPage;
