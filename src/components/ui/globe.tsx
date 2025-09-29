"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { COBEOptions } from "cobe";
import { useSpring } from "@react-spring/core";
import { useThemeClass } from "@/hooks/useThemeClass";

// Şehir bilgileri ile marker'lar
const CITY_MARKERS = [
  { location: [14.5995, 120.9842], size: 0.03, city: "Manila" },
  { location: [19.076, 72.8777], size: 0.1, city: "Mumbai" },
  { location: [23.8103, 90.4125], size: 0.05, city: "Dhaka" },
  { location: [30.0444, 31.2357], size: 0.07, city: "Cairo" },
  { location: [39.9042, 116.4074], size: 0.08, city: "Beijing" },
  { location: [-23.5505, -46.6333], size: 0.1, city: "São Paulo" },
  { location: [19.4326, -99.1332], size: 0.1, city: "Mexico City" },
  { location: [40.7128, -74.006], size: 0.1, city: "New York" },
  { location: [34.6937, 135.5023], size: 0.05, city: "Osaka" },
  { location: [41.8781, -87.6298], size: 0.08, city: "Chicago" },
  { location: [51.5072, -0.1276], size: 0.08, city: "London" },
  { location: [40.9176, -74.179], size: 0.04, city: "Newark" },
  { location: [37.7749, -122.4194], size: 0.05, city: "San Francisco" },
  { location: [52.52, 13.405], size: 0.05, city: "Berlin" },
  { location: [50.1109, 8.6821], size: 0.05, city: "Frankfurt" },
  { location: [53.9045, 27.5615], size: 0.03, city: "Minsk" },
  { location: [41.3851, 2.1734], size: 0.06, city: "Barcelona" },
  { location: [-34.6118, -58.396], size: 0.05, city: "Buenos Aires" },
  { location: [-33.8568, 151.2153], size: 0.1, city: "Sydney" },
  { location: [31.2304, 121.4737], size: 0.1, city: "Shanghai" },
  { location: [39.3209, -76.2909], size: 0.07, city: "Baltimore" },
  { location: [25.276, 55.296], size: 0.1, city: "Dubai" },
  { location: [21.3099, -157.8581], size: 0.02, city: "Honolulu" },
  { location: [55.676, 12.568], size: 0.02, city: "Copenhagen" },
  { location: [-22.9068, -43.1729], size: 0.1, city: "Rio de Janeiro" },
  { location: [-1.292, 36.8219], size: 0.02, city: "Nairobi" },
  { location: [38.7223, -9.1393], size: 0.08, city: "Lisbon" },
  { location: [55.7558, 37.6176], size: 0.1, city: "Moscow" },
  { location: [60.1699, 24.9384], size: 0.05, city: "Helsinki" },
  { location: [54.6872, 25.2797], size: 0.03, city: "Vilnius" },
  { location: [64.1466, -21.9426], size: 0.02, city: "Reykjavik" },
  { location: [40.4637, -3.7492], size: 0.1, city: "Madrid" },
  { location: [41.0082, 28.9784], size: 0.1, city: "Istanbul" },
  { location: [39.9334, 32.8597], size: 0.08, city: "Ankara" },
  { location: [38.4192, 27.1287], size: 0.06, city: "Izmir" },
  { location: [35.6762, 139.6503], size: 0.1, city: "Tokyo" },
  { location: [48.8566, 2.3522], size: 0.08, city: "Paris" },
  { location: [45.4642, 9.19], size: 0.06, city: "Milan" },
  { location: [59.3293, 18.0686], size: 0.05, city: "Stockholm" },
];

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: CITY_MARKERS.map((marker) => ({
    location: marker.location as [number, number],
    size: marker.size,
  })),
};

export interface WorldProps {
  globeConfig?: Partial<COBEOptions> & {
    arcsData?: Array<{
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      arcAlt: number;
      color: string;
    }>;
  };
  data?: Array<{
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
  }>;
}

export function World({ globeConfig }: WorldProps) {
  const themeMode = useThemeClass();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      ...Object.fromEntries(
        Object.entries(globeConfig || {}).filter(([key]) => key !== "arcsData")
      ),
      width: width * 2,
      height: width * 2,
      dark: themeMode === "dark" ? 1 : 0,
      baseColor: themeMode === "dark" ? [0.15, 0.15, 0.2] : [1, 1, 1],
      glowColor: themeMode === "dark" ? [0.3, 0.4, 0.6] : [1, 1, 1],
      mapBrightness: themeMode === "dark" ? 1.5 : 1.2,
      markerColor:
        themeMode === "dark"
          ? [0.8, 0.6, 0.2] // Dark mode için altın sarısı marker
          : [251 / 255, 100 / 255, 21 / 255], // Light mode için turuncu
      onRender: (state: any) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + r.get();
        globeConfig?.onRender?.(state);
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [globeConfig, r, themeMode]);

  return (
    <div className="relative w-full flex justify-center">
      {/* Globe */}
      <div className="aspect-square w-full max-w-[600px] relative">
        <canvas
          className="size-full opacity-0 transition-opacity duration-500 [contain:layout_style_size]"
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grabbing";
            }
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
            }
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
            }
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({ r: delta / 200 });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({ r: delta / 100 });
            }
          }}
        />
      </div>
    </div>
  );
}
