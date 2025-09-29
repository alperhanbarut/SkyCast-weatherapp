import { motion } from "framer-motion";
import type { ForecastWeather } from "@/api/weatherService";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

interface HourlyForecastProps {
  forecast: ForecastWeather;
}

function HourlyForecast({ forecast }: HourlyForecastProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Bugün ve yarının saatlik verilerini al
  const todayHours = forecast.forecast.forecastday[0]?.hour || [];
  const tomorrowHours = forecast.forecast.forecastday[1]?.hour || [];

  // Şu anki saatten itibaren 24 saat göster
  const currentHour = new Date().getHours();
  const remainingTodayHours = todayHours.slice(currentHour);
  const neededTomorrowHours = tomorrowHours.slice(
    0,
    Math.max(0, 24 - remainingTodayHours.length)
  );

  const hourlyData = [...remainingTodayHours, ...neededTomorrowHours].slice(
    0,
    24
  );

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 300));
  };

  const scrollRight = () => {
    setScrollPosition(
      Math.min(scrollPosition + 300, hourlyData.length * 120 - 600)
    );
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isCurrentHour = (timeString: string) => {
    const hourTime = new Date(timeString);
    const now = new Date();
    return (
      hourTime.getHours() === now.getHours() &&
      hourTime.getDate() === now.getDate()
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">24 Saatlik Tahmin</h2>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            disabled={scrollPosition === 0}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            disabled={scrollPosition >= hourlyData.length * 120 - 600}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-4"
          animate={{ x: -scrollPosition }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: `${hourlyData.length * 120}px` }}
        >
          {hourlyData.map((hour, index) => (
            <motion.div
              key={`${hour.time}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex-shrink-0 w-24 text-center p-4 rounded-2xl transition-all duration-300 ${
                isCurrentHour(hour.time)
                  ? "bg-blue-500/30 border-2 border-blue-400/50 shadow-lg"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {/* Saat */}
              <div
                className={`text-sm font-medium mb-3 ${
                  isCurrentHour(hour.time) ? "text-blue-200" : "text-white/80"
                }`}
              >
                {index === 0 ? "Şimdi" : formatTime(hour.time)}
              </div>

              {/* Hava durumu ikonu */}
              <img
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                className="w-10 h-10 mx-auto mb-3 drop-shadow-md"
              />

              {/* Sıcaklık */}
              <div className="text-lg font-bold text-white mb-2">
                {Math.round(hour.temp_c)}°
              </div>

              {/* Yağış şansı */}
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span className="text-blue-300 text-xs">💧</span>
                <span className="text-xs text-white/70">
                  {hour.chance_of_rain}%
                </span>
              </div>

              {/* Rüzgar */}
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span className="text-green-300 text-xs">💨</span>
                <span className="text-xs text-white/70">
                  {Math.round(hour.wind_kph)}
                </span>
              </div>

              {/* Hissedilen sıcaklık */}
              <div className="text-xs text-white/60">
                Hiss. {Math.round(hour.feelslike_c)}°
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Alt bilgi */}
      <div className="mt-4 text-center">
        <p className="text-xs text-white/60">
          Şu anki saatten itibaren 24 saatlik detaylı tahmin
        </p>
      </div>
    </motion.div>
  );
}

export default HourlyForecast;
