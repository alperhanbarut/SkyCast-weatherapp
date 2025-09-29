

export const translateWeatherCondition = (condition: string): string => {
  const conditionMap: { [key: string]: string } = {

    'Sunny': '☀️ Güneşli',
    'Clear': '🌞 Açık',
    'Fair': '🌤️ Güzel',
    

    'Partly cloudy': '⛅ Parçalı Bulutlu',
    'Partly Cloudy': '⛅ Parçalı Bulutlu',
    'Cloudy': '☁️ Bulutlu',
    'Overcast': '☁️ Kapalı',
    'Mostly Cloudy': '🌥️ Çoğunlukla Bulutlu',

    'Light rain': '🌦️ Hafif Yağmur',
    'Moderate rain': '🌧️ Orta Yağmur',
    'Heavy rain': '🌧️ Şiddetli Yağmur',
    'Rain': '🌧️ Yağmur',
    'Drizzle': '🌦️ Çisenti',
    'Light drizzle': '🌦️ Hafif Çisenti',
    'Patchy rain possible': '🌦️ Yer Yer Yağmur',
    'Light rain shower': '🌦️ Hafif Sağanak',
    'Moderate or heavy rain shower': '🌧️ Orta/Şiddetli Sağanak',
    

    'Snow': '❄️ Kar',
    'Light snow': '🌨️ Hafif Kar',
    'Heavy snow': '❄️ Yoğun Kar',
    'Patchy snow possible': '🌨️ Yer Yer Kar',
    'Light snow showers': '🌨️ Hafif Kar Yağışı',
    'Moderate or heavy snow showers': '❄️ Orta/Yoğun Kar Yağışı',
    'Sleet': '🌨️ Karla Karışık Yağmur',
    

    'Thundery outbreaks possible': '⛈️ Gök Gürültülü Sağanak',
    'Patchy light rain with thunder': '⛈️ Gök Gürültülü Hafif Yağmur',
    'Moderate or heavy rain with thunder': '⛈️ Gök Gürültülü Şiddetli Yağmur',
    'Thunder': '⛈️ Gök Gürültüsü',
    'Thunderstorm': '⛈️ Fırtına',

    'Fog': '🌫️ Sis',
    'Freezing fog': '🌫️ Dondurucu Sis',
    'Mist': '🌫️ Hafif Sis',
    'Haze': '🌫️ Pus',
    

    'Ice pellets': '🧊 Buz Taneleri',
    'Light showers of ice pellets': '🧊 Hafif Dolu',
    'Moderate or heavy showers of ice pellets': '🧊 Şiddetli Dolu',
    

    'Windy': '💨 Rüzgarlı',
    'Strong winds': '💨 Kuvvetli Rüzgar',
  };


  if (conditionMap[condition]) {
    return conditionMap[condition];
  }


  const lowerCondition = condition.toLowerCase();
  for (const [key, value] of Object.entries(conditionMap)) {
    if (lowerCondition.includes(key.toLowerCase())) {
      return value;
    }
  }


  return `🌤️ ${condition}`;
};

export const translateWindDirection = (direction: string): string => {
  const directionMap: { [key: string]: string } = {
    'N': 'Kuzey',
    'NNE': 'Kuzey-Kuzeydoğu',
    'NE': 'Kuzeydoğu', 
    'ENE': 'Doğu-Kuzeydoğu',
    'E': 'Doğu',
    'ESE': 'Doğu-Güneydoğu',
    'SE': 'Güneydoğu',
    'SSE': 'Güney-Güneydoğu',
    'S': 'Güney',
    'SSW': 'Güney-Güneybatı',
    'SW': 'Güneybatı',
    'WSW': 'Batı-Güneybatı',
    'W': 'Batı',
    'WNW': 'Batı-Kuzeybatı',
    'NW': 'Kuzeybatı',
    'NNW': 'Kuzey-Kuzeybatı'
  };

  return directionMap[direction] || direction;
};