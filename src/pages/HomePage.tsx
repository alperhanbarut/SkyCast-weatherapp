import { useState, useEffect } from "react";
import { getCurrentWeather } from "@/api/weatherService";
import type { CurrentWeather } from "@/api/weatherService";
import HeroSection from "@/components/HeroSection";
import StatsSection from "../components/StatsSection";
import CitiesSection from "@/components/CitiesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import LoadingSection from "@/components/LoadingSection";

function HomePage() {
  const [citiesWeather, setCitiesWeather] = useState<CurrentWeather[]>([]);
  const [loading, setLoading] = useState(true);

  const importantCities = [
    "Istanbul",
    "Ankara",
    "Izmir",
    "London",
    "Paris",
    "New York",
    "Tokyo",
    "Dubai",
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        const citiesPromises = importantCities.map((city) =>
          getCurrentWeather(city)
        );
        const citiesData = await Promise.all(citiesPromises);
        setCitiesWeather(citiesData);
      } catch (error) {
        console.error("🌧️ Hava durumu verileri yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <LoadingSection />;
  }

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-100 dark:from-slate-950 dark:via-cyan-950 dark:to-teal-900 pt-20">
      <HeroSection />
      <CitiesSection citiesWeather={citiesWeather} loading={loading} />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
}

export default HomePage;
