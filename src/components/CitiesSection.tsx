import { WeatherCard } from "@/components/WeatherCard";
import type { CurrentWeather } from "@/api/weatherService";

interface CitiesSectionProps {
  citiesWeather: CurrentWeather[];
  loading: boolean;
}

function CitiesSection({ citiesWeather, loading }: CitiesSectionProps) {
  if (loading || citiesWeather.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-30">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-800 dark:text-white mb-3">
          Popüler Şehirler
        </h2>
        <p className="text-cyan-600 dark:text-cyan-300">
          Dünya çapında en çok takip edilen şehirlerin anlık hava durumu
        </p>
      </div>
      <div className="grid grid-cols-1 mb-50 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {citiesWeather.map((cityWeather) => (
          <WeatherCard
            key={cityWeather.location.name}
            weather={cityWeather}
            className="h-80"
          />
        ))}
      </div>
    </div>
  );
}

export default CitiesSection;
