import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentWeather, getForecastWeather } from "@/api/weatherService";
import type { CurrentWeather, ForecastWeather } from "@/api/weatherService";
import { translateWeatherCondition } from "@/utils/weatherTranslations";
import { motion } from "framer-motion";
import HourlyForecast from "./HourlyForecast";
import {
  Thermostat,
  Visibility,
  Air,
  Opacity,
  WbSunny,
  Compress,
  WaterDrop,
  Cloud,
} from "@mui/icons-material";

function WeatherDetails() {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      try {
        setLoading(true);
        setError(null);

        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(city),
          getForecastWeather(city, 5),
        ]);

        setWeather(currentData);
        setForecast(forecastData);
      } catch (err) {
        console.error("Hava durumu verileri alınamadı:", err);
        setError("Hava durumu bilgileri yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto"></div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              🌤️ {city} hava durumu yükleniyor...
            </p>
            <p className="text-sm text-cyan-500 dark:text-cyan-400">
              Detaylı bilgileri getiriyoruz
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md mx-auto p-8"
        >
          <div className="text-6xl">🌧️</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-200">
              Oops! Bir sorun oluştu
            </h2>
            <p className="text-cyan-600 dark:text-cyan-400">
              {error || "Hava durumu bilgileri yüklenemedi."}
            </p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200 font-medium"
            >
              Ana Sayfaya Dön
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-cyan-300 text-cyan-700 dark:text-cyan-300 dark:border-cyan-600 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-800/20 transition-colors duration-200 font-medium"
            >
              Yeniden Dene
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const { location, current } = weather;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Ana Hava Durumu Kartı */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-3xl p-8 text-white shadow-2xl border border-white/20"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-5xl font-bold mb-3">{location.name}</h1>
            <p className="text-white/90 text-xl mb-2">
              {location.region}, {location.country}
            </p>
            <p className="text-white/70 text-sm">
              Son güncelleme:{" "}
              {new Date(current.last_updated).toLocaleString("tr-TR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <img
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              className="w-24 h-24 drop-shadow-lg"
            />
            <div className="text-right">
              <div className="text-7xl font-bold mb-2">
                {Math.round(current.temp_c)}°
              </div>
              <div className="text-2xl font-medium mb-1">
                {translateWeatherCondition(current.condition.text)}
              </div>
              <div className="text-white/80 text-lg">
                Hissedilen: {Math.round(current.feelslike_c)}°C
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı Bilgiler */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <WaterDrop className="text-white/80 mb-2 mx-auto" />
            <div className="text-white/70 text-sm">Nem</div>
            <div className="text-white text-xl font-bold">
              {current.humidity}%
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Air className="text-white/80 mb-2 mx-auto" />
            <div className="text-white/70 text-sm">Rüzgar</div>
            <div className="text-white text-xl font-bold">
              {Math.round(current.wind_kph)} km/h
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <Visibility className="text-white/80 mb-2 mx-auto" />
            <div className="text-white/70 text-sm">Görüş</div>
            <div className="text-white text-xl font-bold">
              {current.vis_km} km
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <WbSunny className="text-white/80 mb-2 mx-auto" />
            <div className="text-white/70 text-sm">UV İndeks</div>
            <div className="text-white text-xl font-bold">{current.uv}</div>
          </div>
        </div>
      </motion.div>

      {/* Saatlik Hava Durumu Tahmini */}
      {forecast && forecast.forecast && <HourlyForecast forecast={forecast} />}

      {/* Detaylı Hava Durumu Verileri */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {/* Sıcaklık Detayları */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Thermostat className="text-red-400 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {Math.round(current.feelslike_c)}°C
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">
            Hissedilen Sıcaklık
          </h3>
          <div className="space-y-1 text-sm text-white/60">
            <div>Gerçek: {Math.round(current.temp_c)}°C</div>
            <div>Fahrenheit: {Math.round(current.temp_f)}°F</div>
          </div>
        </div>

        {/* Nem Detayları */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Opacity className="text-blue-400 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {current.humidity}%
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">Nem Oranı</h3>
          <div className="text-sm text-white/60">
            {current.humidity <= 30
              ? "Düşük nem"
              : current.humidity <= 50
              ? "İdeal nem"
              : current.humidity <= 70
              ? "Yüksek nem"
              : "Çok yüksek nem"}
          </div>
        </div>

        {/* Rüzgar Detayları */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Air className="text-green-400 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {Math.round(current.wind_kph)} km/h
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">Rüzgar Hızı</h3>
          <div className="space-y-1 text-sm text-white/60">
            <div>
              Yön: {current.wind_dir} ({current.wind_degree}°)
            </div>
            <div>Rüzgar: {Math.round(current.gust_kph)} km/h</div>
          </div>
        </div>

        {/* Görüş Mesafesi */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Visibility className="text-purple-400 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {current.vis_km} km
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">Görüş Mesafesi</h3>
          <div className="text-sm text-white/60">
            {current.vis_km >= 10
              ? "Mükemmel görüş"
              : current.vis_km >= 5
              ? "İyi görüş"
              : current.vis_km >= 2
              ? "Orta görüş"
              : "Kötü görüş"}
          </div>
        </div>

        {/* UV İndeksi */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <WbSunny className="text-yellow-400 text-3xl" />
            <span className="text-2xl font-bold text-white">{current.uv}</span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">UV İndeksi</h3>
          <div className="space-y-1 text-sm text-white/60">
            <div className="font-medium">
              {current.uv <= 2
                ? "🟢 Düşük"
                : current.uv <= 5
                ? "🟡 Orta"
                : current.uv <= 7
                ? "🟠 Yüksek"
                : current.uv <= 10
                ? "🔴 Çok Yüksek"
                : "🟣 Aşırı"}
            </div>
            <div>
              {current.uv <= 2
                ? "Güneş koruma gereksiz"
                : current.uv <= 5
                ? "Güneş koruma önerilir"
                : current.uv <= 7
                ? "Güneş koruma gerekli"
                : "Güneş koruma şart"}
            </div>
          </div>
        </div>

        {/* Hava Basıncı */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Compress className="text-indigo-400 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {Math.round(current.pressure_mb)} mb
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">Hava Basıncı</h3>
          <div className="space-y-1 text-sm text-white/60">
            <div>İnç: {current.pressure_in} in</div>
            <div>
              {current.pressure_mb >= 1020
                ? "Yüksek basınç"
                : current.pressure_mb >= 1013
                ? "Normal basınç"
                : "Düşük basınç"}
            </div>
          </div>
        </div>

        {/* Yağış */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <WaterDrop className="text-blue-400 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {current.precip_mm} mm
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">Yağış Miktarı</h3>
          <div className="space-y-1 text-sm text-white/60">
            <div>İnç: {current.precip_in} in</div>
            <div>
              {current.precip_mm === 0
                ? "Yağış yok"
                : current.precip_mm <= 2.5
                ? "Hafif yağış"
                : current.precip_mm <= 10
                ? "Orta yağış"
                : "Şiddetli yağış"}
            </div>
          </div>
        </div>

        {/* Bulutluluk */}
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Cloud className="text-gray-300 text-3xl" />
            <span className="text-2xl font-bold text-white">
              {current.cloud}%
            </span>
          </div>
          <h3 className="text-white/80 font-medium mb-2">Bulutluluk</h3>
          <div className="text-sm text-white/60">
            {current.cloud <= 25
              ? "☀️ Açık hava"
              : current.cloud <= 50
              ? "⛅ Az bulutlu"
              : current.cloud <= 75
              ? "☁️ Bulutlu"
              : "☁️ Çok bulutlu"}
          </div>
        </div>
      </motion.div>

      {/* 5 Günlük Hava Tahmini */}
      {forecast && forecast.forecast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            5 Günlük Hava Tahmini
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecast.forecast.forecastday.map((day: any, index: number) => (
              <div
                key={day.date}
                className="text-center p-5 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 border border-white/10"
              >
                <div className="font-semibold text-white mb-3">
                  {index === 0
                    ? "Bugün"
                    : index === 1
                    ? "Yarın"
                    : new Date(day.date).toLocaleDateString("tr-TR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                </div>

                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-14 h-14 mx-auto mb-3"
                />

                <div className="text-sm font-medium text-white/80 mb-3">
                  {translateWeatherCondition(day.day.condition.text)}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">
                      {Math.round(day.day.maxtemp_c)}°
                    </span>
                    <span className="text-sm text-white/60">
                      {Math.round(day.day.mintemp_c)}°
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                  <div className="flex items-center justify-center space-x-1">
                    <span>💧</span>
                    <span>{day.day.daily_chance_of_rain}%</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <span>💨</span>
                    <span>{Math.round(day.day.maxwind_kph)}km/h</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <span>☀️</span>
                    <span>UV {day.day.uv}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <span>💧</span>
                    <span>{Math.round(day.day.avghumidity)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default WeatherDetails;
