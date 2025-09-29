import axios, { AxiosError } from 'axios';
import { getCityAlternatives } from '@/utils/citySearch';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';


const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  params: {
    key: API_KEY,
  },
});


weatherApi.interceptors.request.use(
  (config) => {
    if (!API_KEY) {
      const errorMessage = 'Weather API key is not configured';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    return config;
  },
  (error) => {
    console.error('İstek gönderilirken bir hata oluştu');
    return Promise.reject(error);
  }
);


weatherApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = 'Hava durumu verisi alınamadı';
    
    if (error.response) {

      switch (error.response.status) {
        case 400:
          errorMessage = 'Geçersiz şehir adı veya koordinat';
          break;
        case 401:
          errorMessage = 'API anahtarı geçersiz';
          break;
        case 403:
          errorMessage = 'API kullanım limiti aşıldı';
          break;
        case 404:
          errorMessage = 'Şehir bulunamadı';
          break;
        case 500:
          errorMessage = 'Sunucu hatası oluştu';
          break;
        default:
          errorMessage = `API Hatası: ${error.response.status}`;
      }
    } else if (error.request) {

      errorMessage = 'İnternet bağlantısı kontrol edin';
    } else if (error.code === 'ECONNABORTED') {

      errorMessage = 'İstek zaman aşımına uğradı';
    }
    
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export interface CurrentWeather {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

export interface ForecastWeather extends CurrentWeather {
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        totalsnow_cm: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
      };
      hour: Array<{
        time_epoch: number;
        time: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        will_it_rain: number;
        chance_of_rain: number;
        will_it_snow: number;
        chance_of_snow: number;
        vis_km: number;
        vis_miles: number;
        gust_mph: number;
        gust_kph: number;
        uv: number;
      }>;
    }>;
  };
}

export const getCurrentWeather = async (location: string): Promise<CurrentWeather> => {
  const cityAlternatives = getCityAlternatives(location);
  
  let lastError;
  for (const cityName of cityAlternatives) {
    try {
      const response = await weatherApi.get('/current.json', {
        params: {
          q: cityName,
          aqi: 'no',
        },
      });
      
      return response.data;
    } catch (error) {
      lastError = error;
      continue;
    }
  }
  
  throw lastError;
};

export const getForecastWeather = async (
  location: string,
  days: number = 7
): Promise<ForecastWeather> => {
  const cityAlternatives = getCityAlternatives(location);
  
  let lastError;
  for (const cityName of cityAlternatives) {
    try {
      const response = await weatherApi.get('/forecast.json', {
        params: {
          q: cityName,
          days: days,
          aqi: 'no',
          alerts: 'no',
        },
      });
      
      return response.data;
    } catch (error) {
      lastError = error;
      continue;
    }
  }
  
  throw lastError;
};

export const searchLocations = async (query: string) => {
  try {
    const response = await weatherApi.get('/search.json', {
      params: {
        q: query,
      },
    });
    
    if (response.data.length === 0) {
      console.log('Aradığınız şehir bulunamadı');
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWeatherIcon = (iconUrl: string) => {
  return `https:${iconUrl}`;
};

export const getWeatherEmoji = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return '☀️';
  } else if (conditionLower.includes('partly cloudy')) {
    return '⛅';
  } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
    return '☁️';
  } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return '🌧️';
  } else if (conditionLower.includes('thunderstorm') || conditionLower.includes('thunder')) {
    return '⛈️';
  } else if (conditionLower.includes('snow')) {
    return '❄️';
  } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return '🌫️';
  } else if (conditionLower.includes('wind')) {
    return '💨';
  } else {
    return '🌤️';
  }
};