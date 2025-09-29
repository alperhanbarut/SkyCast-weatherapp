import { getCategoryColor, getOutfitImage } from "@/utils/outfitImages";
import type { OutfitItem } from "@/types";

interface OutfitCardProps {
  item: OutfitItem;
}

export default function OutfitCard({ item }: OutfitCardProps) {
  const img = getOutfitImage(item.id);

  return (
    <div
      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-lg overflow-hidden "
      style={{ height: "auto", minHeight: "400px" }}
    >
      <div className="flex flex-col md:flex-row h-full min-h-[400px] md:min-h-[600px]">
        {/* Sol: Resim */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={item.label}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 opacity-60"></div>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 opacity-60"></div>
            </div>
          )}

          {/* Kategori Badge */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(
              item.category
            )}`}
          >
            {item.category}
          </div>
        </div>

        {/* Sağ: Açıklama */}
        <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {item.label}
          </h3>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
