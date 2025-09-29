import React from "react";

interface VideoBackgroundProps {
  weatherType: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  weatherType,
  className = "",
}) => {
  const getWeatherAnimation = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sunny':
        return {
          background: 'linear-gradient(45deg, #FFE066, #FF6B6B, #4ECDC4, #45B7D1)',
          animation: 'sunny-pulse 3s ease-in-out infinite alternate'
        };
      case 'rainy':
        return {
          background: 'linear-gradient(180deg, #4A90A4, #2C3E50)',
          animation: 'rainy-drops 2s linear infinite'
        };
      case 'cloudy':
        return {
          background: 'linear-gradient(180deg, #BDC3C7, #7F8C8D)',
          animation: 'cloudy-drift 4s ease-in-out infinite alternate'
        };
      case 'snowy':
        return {
          background: 'linear-gradient(180deg, #E8F4F8, #BDC3C7)',
          animation: 'snowy-flakes 3s linear infinite'
        };
      case 'stormy':
        return {
          background: 'linear-gradient(135deg, #2C3E50, #4A4A4A, #1A252F)',
          animation: 'stormy-flash 2s ease-in-out infinite'
        };
      case 'foggy':
        return {
          background: 'linear-gradient(180deg, #D5DBDB, #AEB6BF)',
          animation: 'foggy-wave 4s ease-in-out infinite'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: 'default-glow 3s ease-in-out infinite alternate'
        };
    }
  };

  const weatherStyle = getWeatherAnimation(weatherType);

  return (
    <>
      <style>{`
        @keyframes sunny-pulse {
          0% { filter: brightness(1) hue-rotate(0deg); }
          100% { filter: brightness(1.2) hue-rotate(10deg); }
        }
        
        @keyframes rainy-drops {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        @keyframes cloudy-drift {
          0% { transform: translateX(-2px) translateY(-1px); }
          100% { transform: translateX(2px) translateY(1px); }
        }
        
        @keyframes snowy-flakes {
          0% { background-position: 0% 0%, 20% 0%, 40% 0%; }
          100% { background-position: 0% 100%, 20% 100%, 40% 100%; }
        }
        
        @keyframes stormy-flash {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 1.3; filter: brightness(1.5); }
        }
        
        @keyframes foggy-wave {
          0% { transform: translateX(-10px); opacity: 0.7; }
          50% { transform: translateX(0px); opacity: 1; }
          100% { transform: translateX(10px); opacity: 0.7; }
        }
        
        @keyframes default-glow {
          0% { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.1) saturate(1.2); }
        }
      `}</style>
      
      <div className={`fixed inset-0 -z-50 overflow-hidden ${className}`}>
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: weatherStyle.background,
            animation: weatherStyle.animation,
            backgroundSize: '400% 400%'
          }}
        />
        
        {/* Weather-specific overlay effects */}
        {weatherType.toLowerCase() === 'rainy' && (
          <div className="absolute inset-0 opacity-30">
            <div className="rain-effect"></div>
          </div>
        )}
        
        {weatherType.toLowerCase() === 'snowy' && (
          <div className="absolute inset-0 opacity-40">
            <div className="snow-effect"></div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30 transition-all duration-500" />
      </div>
    </>
  );
};

export default VideoBackground;
