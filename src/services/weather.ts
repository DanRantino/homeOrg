// src/services/weather/weatherService.ts
import { openMeteoCurrent } from "@/providers/openMeteo";

export async function getCurrentWeather(lat: number, lon: number) {
  return await openMeteoCurrent(lat, lon);
}
