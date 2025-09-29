export interface OutfitItem {
  id: string;
  label: string;
  category: "üst" | "alt" | "dış" | "aksesuar" | "ayakkabı";
  reason: string;
}

export interface WeatherSnapshot {
  temp: number;
  feels: number;
  condition: string;
  city: string;
}

export interface NavLink { 
  name: string; 
  path: string; 
}