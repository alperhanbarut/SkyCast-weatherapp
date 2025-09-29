import React from "react";

interface VideoBackgroundProps {
  weatherType: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ weatherType, className = "" }) => {
  const backgrounds = {
    sunny: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    rainy: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    cloudy: "linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%)",
    snowy: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    stormy: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    foggy: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"
  };

  const bg = backgrounds[weatherType.toLowerCase() as keyof typeof backgrounds] || backgrounds.sunny;

  return (
    <div className={`fixed inset-0 -z-50 overflow-hidden ${className}`}>
      <div className="absolute inset-0 transition-all duration-500" style={{ background: bg }} />
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30 transition-all duration-500" />
    </div>
  );
};

export default VideoBackground;
