import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { translateWeatherCondition } from "@/utils/weatherTranslations";

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface ForecastCardProps {
  forecast: ForecastDay;
  className?: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecast,
  className,
}) => {
  const { date, day } = forecast;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <WobbleCard
      containerClassName={`bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 ${className}`}
      className="text-gray-900 dark:text-white p-4"
    >
      <div className="text-center space-y-3">
        {/* Tarih */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {formatDate(date)}
        </div>

        {/* Hava Durumu İkonu */}
        <div className="flex justify-center">
          <img
            src={`https:${day.condition.icon}`}
            alt={day.condition.text}
            className="w-12 h-12 drop-shadow-sm"
          />
        </div>

        {/* Sıcaklık */}
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(day.maxtemp_c)}°C
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(day.mintemp_c)}°C
          </div>
        </div>

        {/* Durum */}
        <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {translateWeatherCondition(day.condition.text)}
        </div>
      </div>
    </WobbleCard>
  );
};
