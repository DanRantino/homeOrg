// src/services/weather/providers/openMeteo.ts
export async function openMeteoCurrent(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
  );

  if (!res.ok) {
    throw new Error("OpenMeteo failed");
  }

  const data = await res.json();

  return {
    temperature:
      data.current_weather.temperature + data.current_weather_units.temperature,
    windSpeed:
      data.current_weather.windspeed + data.current_weather_units.windspeed,
    code: data.current_weather.weathercode,
    condition: weatherCodeMapping[data.current_weather.weathercode], // mapping needed
    provider: "open-meteo",
  };
}

const weatherCodeMapping: Record<number, string> = {
  0: "Céu limpo",
  1: "Principalmente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Nevoeiro com deposição de geada",
  51: "Chuvisco leve",
  53: "Chuvisco moderado",
  55: "Chuvisco denso",
  56: "Chuvisco congelante leve",
  57: "Chuvisco congelante denso",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva congelante leve",
  67: "Chuva congelante forte",
  71: "Queda de neve leve",
  73: "Queda de neve moderada",
  75: "Queda de neve forte",
  77: "Grãos de neve",
  80: "Chuva leve",
  81: "Chuva moderada",
  82: "Chuva forte",
  85: "Neve leve",
  86: "Neve forte",
  95: "Trovoada",
  96: "Trovoada com granizo leve",
  99: "Trovoada com granizo forte",
};
