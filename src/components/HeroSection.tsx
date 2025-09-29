import { World } from "@/components/ui/globe";

function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-15 pb-6">
      {/* Hero Text */}
      <div className="text-center mb-8">
        <div className="mb-8">
          <span className="inline-block px-6 py-2 bg-cyan-50 dark:bg-cyan-900/50 rounded-full text-sm font-medium text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700">
            SkyCast - Akıllı Hava Durumu Platformu
          </span>
        </div>
        <p className="text-xl md:text-2xl font-body text-cyan-600 dark:text-cyan-400 max-w-4xl mx-auto leading-relaxed mb-10">
          Dünyanın her köşesinden anlık hava durumu verileri.
          <br />
          Akıllı kıyafet önerileri ve gelişmiş tahminlerle
          <br />
          günlük yaşamınızı kolaylaştırın.
        </p>
      </div>

      {/* Interactive Globe */}
      <div className="mb-8 flex justify-center">
        <World
          globeConfig={{
            arcsData: [
              {
                startLat: 41.0082, // İstanbul
                startLng: 28.9784,
                endLat: 40.7128, // New York
                endLng: -74.006,
                arcAlt: 0.3,
                color: "rgba(59, 130, 246, 0.8)",
              },
              {
                startLat: 41.0082, // İstanbul
                startLng: 28.9784,
                endLat: 51.5074, // Londra
                endLng: -0.1278,
                arcAlt: 0.2,
                color: "rgba(16, 185, 129, 0.8)",
              },
              {
                startLat: 41.0082, // İstanbul
                startLng: 28.9784,
                endLat: 35.6762, // Tokyo
                endLng: 139.6503,
                arcAlt: 0.4,
                color: "rgba(251, 191, 36, 0.8)",
              },
              {
                startLat: 41.0082, // İstanbul
                startLng: 28.9784,
                endLat: -33.8688, // Sydney
                endLng: 151.2093,
                arcAlt: 0.5,
                color: "rgba(236, 72, 153, 0.8)",
              },
              {
                startLat: 41.0082, // İstanbul
                startLng: 28.9784,
                endLat: 37.7749, // San Francisco
                endLng: -122.4194,
                arcAlt: 0.35,
                color: "rgba(139, 92, 246, 0.8)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
