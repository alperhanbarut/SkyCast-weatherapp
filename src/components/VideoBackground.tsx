import React from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  className = "",
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className={`fixed inset-0 -z-50 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.7) contrast(1.1)",
          minWidth: "100vw",
          minHeight: "100vh",
          objectPosition: "center center",
        }}
        onLoadedData={() => {}}
        onError={() => {}}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
    </div>
  );
};

export default VideoBackground;
