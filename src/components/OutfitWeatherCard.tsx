import { translateWeatherCondition } from "@/utils/weatherTranslations";
import type { WeatherSnapshot } from "@/types";

interface OutfitWeatherCardProps {
  snapshot: WeatherSnapshot;
  city: string;
}

export default function OutfitWeatherCard({
  snapshot,
  city,
}: OutfitWeatherCardProps) {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/30 mb-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6">
        {/* Sol: Şehir Adı ve Tarih */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {city}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {city}, Turkey
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Son güncelleme:{" "}
            {new Date().toLocaleString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Sağ: Sıcaklık ve Hava Durumu */}
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end gap-4">
            {/* Hava Durumu İkonu */}
            <div className="text-5xl sm:text-6xl">
              {snapshot.condition.toLowerCase().includes("sun") ||
              snapshot.condition.toLowerCase().includes("clear")
                ? "☀️"
                : snapshot.condition.toLowerCase().includes("cloud")
                ? "☁️"
                : snapshot.condition.toLowerCase().includes("rain")
                ? "🌧️"
                : snapshot.condition.toLowerCase().includes("snow")
                ? "❄️"
                : "🌤️"}
            </div>

            <div>
              <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white">
                {Math.round(snapshot.temp)}°
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-6 text-sm text-gray-600 dark:text-gray-300">
            <span>🌡️ {translateWeatherCondition(snapshot.condition)}</span>
            <span>💨 Hissedilen: {Math.round(snapshot.feels)}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
