import React from "react";
import VideoBackground from "./VideoBackground";

interface AnimatedBackgroundProps {
  weatherCondition: string;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  weatherCondition,
  className = "",
}) => {
  const getVideoFile = React.useMemo(() => {
    const condition = weatherCondition.toLowerCase();

    if (
      condition.includes("partly cloudy") ||
      condition.includes("parçalı bulutlu") ||
      condition.includes("partly") ||
      condition.includes("parçalı") ||
      condition.includes("broken clouds") ||
      condition.includes("scattered clouds")
    ) {
      return "/videos/cloudy.mp4";
    }

    if (
      condition.includes("snow") ||
      condition.includes("kar") ||
      condition.includes("sleet")
    ) {
      return "/videos/snowy.mp4";
    }

    if (
      condition.includes("rain") ||
      condition.includes("yağmur") ||
      condition.includes("drizzle") ||
      condition.includes("shower") ||
      condition.includes("çisenti") ||
      condition.includes("sağanak")
    ) {
      return "/videos/rainy.mp4";
    }

    if (
      condition.includes("cloud") ||
      condition.includes("bulut") ||
      condition.includes("overcast") ||
      condition.includes("kapalı") ||
      condition.includes("scattered") ||
      condition.includes("few clouds") ||
      condition.includes("broken")
    ) {
      return "/videos/cloudy.mp4";
    }

    if (
      condition.includes("sunny") ||
      condition.includes("güneşli") ||
      condition.includes("clear") ||
      condition.includes("açık") ||
      condition.includes("fair") ||
      condition.includes("bright") ||
      condition.includes("sunshine")
    ) {
      return "/videos/sunny.mp4";
    }

    if (
      condition.includes("thunder") ||
      condition.includes("storm") ||
      condition.includes("fırtına") ||
      condition.includes("lightning")
    ) {
      return "/videos/stormy.mp4";
    }

    if (
      condition.includes("fog") ||
      condition.includes("mist") ||
      condition.includes("sis") ||
      condition.includes("haze")
    ) {
      return "/videos/foggy.mp4";
    }

    return "/videos/sunny.mp4";
  }, [weatherCondition]);

  const videoExists = React.useMemo(() => {
    return true;
  }, [getVideoFile]);

  const getWeatherType = () => {
    const condition = weatherCondition.toLowerCase();
    if (condition.includes("rain") || condition.includes("yağmur"))
      return "rainy";
    if (condition.includes("snow") || condition.includes("kar")) return "snowy";
    if (condition.includes("cloud") || condition.includes("bulut"))
      return "cloudy";
    if (condition.includes("storm") || condition.includes("fırtına"))
      return "stormy";
    if (condition.includes("fog") || condition.includes("sis")) return "foggy";
    if (condition.includes("clear") || condition.includes("açık"))
      return "sunny";
    return "sunny";
  };

  if (videoExists) {
    return (
      <VideoBackground
        key={weatherCondition}
        weatherType={getWeatherType()}
        className={className}
      />
    );
  }

  const getWeatherBackground = () => {
    const condition = weatherCondition.toLowerCase();

    if (condition.includes("snow") || condition.includes("kar")) {
      return "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800";
    }
    if (condition.includes("rain") || condition.includes("yağmur")) {
      return "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 dark:from-slate-800 dark:via-slate-900 dark:to-black";
    }
    if (condition.includes("cloud") || condition.includes("bulut")) {
      return "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900";
    }
    if (
      condition.includes("sunny") ||
      condition.includes("clear") ||
      condition.includes("güneşli")
    ) {
      return "bg-gradient-to-br from-yellow-300 via-orange-300 to-yellow-400 dark:from-yellow-600 dark:via-orange-500 dark:to-yellow-700";
    }
    if (
      condition.includes("thunder") ||
      condition.includes("storm") ||
      condition.includes("fırtına")
    ) {
      return "bg-gradient-to-br from-purple-900 via-gray-900 to-black";
    }
    if (condition.includes("fog") || condition.includes("sis")) {
      return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800";
    }

    return "bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900";
  };

  return (
    <div
      className={`fixed inset-0 -z-50 ${getWeatherBackground()} ${className}`}
    />
  );
};

export default AnimatedBackground;
