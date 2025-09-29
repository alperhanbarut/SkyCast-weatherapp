import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import type { CurrentWeather } from "@/api/weatherService";
import { translateWeatherCondition } from "@/utils/weatherTranslations";
import { useNavigate } from "react-router-dom";

interface WeatherCardProps {
  weather: CurrentWeather;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  className,
}) => {
  const { location, current } = weather;

  const navigate = useNavigate();

  const getWeatherColor = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (
      conditionLower.includes("sunny") ||
      conditionLower.includes("clear") ||
      conditionLower.includes("güneşli")
    ) {
      return "from-yellow-400 to-orange-500";
    } else if (
      conditionLower.includes("cloud") ||
      conditionLower.includes("bulut")
    ) {
      return "from-slate-400 to-slate-600";
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle") ||
      conditionLower.includes("yağmur")
    ) {
      return "from-cyan-400 to-cyan-600";
    } else if (
      conditionLower.includes("snow") ||
      conditionLower.includes("kar")
    ) {
      return "from-cyan-200 to-cyan-400";
    } else if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("storm") ||
      conditionLower.includes("fırtına")
    ) {
      return "from-slate-500 to-slate-700";
    }
    return "from-cyan-500 to-teal-600";
  };

  const gradientClass = getWeatherColor(current.condition.text);

  return (
    <div
      onClick={() => {
        navigate(`/weather/${location.name}`);
        window.scrollTo(0, 0);
      }}
      className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
    >
      <WobbleCard
        containerClassName={`bg-gradient-to-br ${gradientClass} ${
          className || "h-80"
        }`}
        className="text-white h-full"
      >
        <div className="flex flex-col justify-between h-full">
          {/* Header */}
          <div className="text-right mb-2">
            <p className="text-white/70 text-xs">
              Son güncelleme:{" "}
              {new Date(current.last_updated).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Şehir Adı */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">{location.name}</h2>
            <p className="text-white/80 text-sm">
              {location.region}, {location.country}
            </p>
          </div>

          {/* Ana Sıcaklık ve Hava Durumu */}
          <div className="flex items-center justify-between flex-1">
            <div>
              <div className="text-5xl font-bold text-white mb-2">
                {Math.round(current.temp_c)}°C
              </div>
              <div className="text-white/90 text-base font-medium mb-1">
                {translateWeatherCondition(current.condition.text)}
              </div>
              <div className="text-white/70 text-sm">
                🌡️ Hissedilen: {Math.round(current.feelslike_c)}°C
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
                className="w-20 h-20 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </WobbleCard>
    </div>
  );
};
