import { useEffect, useState, useMemo } from "react";
import { getCurrentWeather } from "@/api/weatherService";
import SearchHeader from "@/components/SearchHeader";
import OutfitWeatherCard from "@/components/OutfitWeatherCard";
import OutfitCard from "@/components/OutfitCard";
import { toast } from "react-toastify";
import type { OutfitItem, WeatherSnapshot } from "@/types";

function buildOutfit(w: WeatherSnapshot): OutfitItem[] {
  const items: OutfitItem[] = [];
  const { temp, condition } = w;
  const isRain = /rain|shower|drizzle|storm|thunder/i.test(condition);
  const isSnow = /snow|ice|sleet|blizzard/i.test(condition);

  // ÜST GİYİM
  if (temp < 0 || isSnow) {
    items.push({
      id: "ust-termal",
      label: "Termal İçlik + Kalın Mont",
      category: "üst",
      reason: "Çok soğuk hava ve kar riski için maksimum sıcaklık sağlar",
    });
  } else if (temp < 8) {
    items.push({
      id: "ust-katman",
      label: "Katmanlı Ceket",
      category: "üst",
      reason: "Düşük sıcaklıkta vücut ısısını korumak için ideal seçim",
    });
  } else if (temp < 18) {
    items.push({
      id: "ust-uzunkol",
      label: "Uzun Kollu Üst",
      category: "üst",
      reason: "Serin havada konfor sağlar, katmanlama imkanı sunar",
    });
  } else if (temp < 26) {
    items.push({
      id: "ust-tshirt",
      label: "T-Shirt",
      category: "üst",
      reason: "Ilık havada rahatça hareket etmenizi sağlar",
    });
  } else {
    items.push({
      id: "ust-ince",
      label: "İnce / Açık Renk Üst",
      category: "üst",
      reason: "Sıcak havada serinlik hissi verir, güneşi yansıtır",
    });
  }

  // ALT GİYİM
  if (temp < 5) {
    items.push({
      id: "alt-kalin",
      label: "Kalın Pantolon",
      category: "alt",
      reason: "Soğuk havada bacakları sıcak tutar, rüzgardan korur",
    });
  } else if (temp < 22) {
    items.push({
      id: "alt-normal",
      label: "Pantolon / Kot",
      category: "alt",
      reason: "Günlük kullanım için ideal, her ortama uygun",
    });
  } else {
    items.push({
      id: "alt-serin",
      label: "Şort / İnce Alt",
      category: "alt",
      reason: "Sıcak havada serinlik sağlar, hareket özgürlüğü verir",
    });
  }

  // DIŞ GİYİM
  if (isRain && !isSnow) {
    items.push({
      id: "dis-yagmurluk",
      label: "Yağmurluk",
      category: "dış",
      reason: "Yağıştan korunmak ve kuru kalmak için gerekli",
    });
  }
  if (isSnow) {
    items.push({
      id: "dis-kar",
      label: "Su Geçirmez Mont",
      category: "dış",
      reason: "Kar ve buzdan koruma, su geçirmezlik sağlar",
    });
  }

  // AKSESUAR
  if (temp < 4) {
    items.push({
      id: "aks-bere",
      label: "Bere & Atkı",
      category: "aksesuar",
      reason: "Baş ve boyun bölgelerinden ısı kaybını önler",
    });
  }
  if (isRain) {
    items.push({
      id: "aks-semsiye",
      label: "Şemsiye",
      category: "aksesuar",
      reason: "Yağıştan korunmak için pratik çözüm",
    });
  }
  if (temp > 27) {
    items.push({
      id: "aks-gunes",
      label: "Güneş Gözlüğü",
      category: "aksesuar",
      reason: "UV ışınlarından gözlerinizi korur",
    });
  }

  // AYAKKABI
  if (isSnow || temp <= 0) {
    items.push({
      id: "ayk-bot",
      label: "Yalıtımlı Bot",
      category: "ayakkabı",
      reason: "Kar ve soğuk zemin için maksimum koruma sağlar",
    });
  } else if (isRain) {
    items.push({
      id: "ayk-spor",
      label: "Su Geçirmez Ayakkabı",
      category: "ayakkabı",
      reason: "Islak zeminde güvenli yürüyüş sağlar",
    });
  } else if (temp >= 26) {
    items.push({
      id: "ayk-sneaker",
      label: "Nefes Alabilir Ayakkabı",
      category: "ayakkabı",
      reason: "Sıcak havada konfor ve havalandırma sunar",
    });
  } else {
    items.push({
      id: "ayk-sneaker",
      label: "Günlük Ayakkabı",
      category: "ayakkabı",
      reason: "Her türlü aktivite için ideal seçim",
    });
  }

  return items;
}

// Konum alma fonksiyonu
const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Konum servisi desteklenmiyor"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        reject(new Error("Konum alınamadı"));
      },
      { timeout: 10000 }
    );
  });
};

export default function OutfitPage() {
  const [city, setCity] = useState("Istanbul");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [snapshot, setSnapshot] = useState<WeatherSnapshot | null>(null);

  const fetchWeatherData = async (cityName: string) => {
    try {
      setLoading(true);

      const data = await getCurrentWeather(cityName);
      const snap: WeatherSnapshot = {
        temp: data.current.temp_c,
        feels: data.current.feelslike_c,
        condition: data.current.condition.text,
        city: data.location.name,
      };

      setSnapshot(snap);
      setCity(data.location.name);
    } catch (e: any) {
      toast.error(e.message || "Hava durumu verisi alınamadı");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    try {
      setLocationLoading(true);
      const location = await getCurrentLocation();
      await fetchWeatherData(`${location.lat},${location.lng}`);
    } catch (e: any) {
      toast.error("Konumunuz alınamadı. Lütfen manuel olarak şehir girin.");
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherData(query.trim());
      setQuery("");
    }
  };

  const outfitItems = useMemo(
    () => (snapshot ? buildOutfit(snapshot) : []),
    [snapshot]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Bölümü */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 dark:border-cyan-700/30 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <SearchHeader
            searchQuery={query}
            isSearching={locationLoading}
            onSearchChange={setQuery}
            onLocationClick={fetchWeatherByLocation}
            onSearchSubmit={handleSubmit}
          />
        </div>

        {/* Hava Durumu Kartı */}
        {snapshot && !loading && (
          <OutfitWeatherCard snapshot={snapshot} city={city} />
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mb-4"></div>
            <p className="text-cyan-600 dark:text-cyan-400">
              Kombin hazırlanıyor...
            </p>
          </div>
        )}

        {/* Kombin Önerileri */}
        {!loading && snapshot && outfitItems.length > 0 && (
          <div className="space-y-6">
            {outfitItems.map((item, index) => (
              <div key={item.id} style={{ animationDelay: `${index * 100}ms` }}>
                <OutfitCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Boş Durum */}
        {!loading && snapshot && outfitItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Bu hava koşulları için kombin önerisi bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
