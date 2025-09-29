import { MapPin, Navigation } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  isSearching: boolean;
  onSearchChange: (value: string) => void;
  onLocationClick: () => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export default function SearchHeader({
  searchQuery,
  isSearching,
  onSearchChange,
  onLocationClick,
  onSearchSubmit,
}: SearchHeaderProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchSubmit(e as any);
      scrollToTop();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
      {/* Sol: Başlık */}
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-800 dark:text-white mb-2">
          Bugün Ne Giysem
        </h1>
        <p className="text-base sm:text-lg text-cyan-600 dark:text-cyan-300">
          Hava durumuna göre kıyafet önerisi alın
        </p>
      </div>

      {/* Sağ: Arama ve Konum */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
        {/* Şehir Arama */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit(e);
            scrollToTop();
          }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Şehir ara..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full sm:w-64 px-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-cyan-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 text-cyan-800 dark:text-white placeholder-cyan-500 dark:placeholder-cyan-400 pr-12"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </form>

        {/* Konumuma Git Butonu */}
        <button
          onClick={() => {
            onLocationClick();
            scrollToTop();
          }}
          disabled={isSearching}
          className="px-4 sm:px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 text-white rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg whitespace-nowrap"
        >
          <Navigation className="w-5 h-5" />
          <span className="hidden sm:inline">
            {isSearching ? "Konum alınıyor..." : "Kombinimi Getir"}
          </span>
          <span className="sm:hidden">
            {isSearching ? "Konum..." : "Konum"}
          </span>
        </button>
      </div>
    </div>
  );
}
