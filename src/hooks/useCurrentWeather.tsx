// src/hooks/useCurrentWeather.ts
import { getCurrentWeather } from "@/services/weather";
import { useQuery } from "@tanstack/react-query";

export function useCurrentWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getCurrentWeather(lat, lon),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
  });
}
