import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { useEffect, useState } from "react";
import TextSkeleton from "./skeletons/TextSkeleton";

export const Weather = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: -23.55052, longitude: -46.633308 });

  useEffect(() => {
    window &&
      window.navigator.geolocation.getCurrentPosition((position) =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );
  }, []);

  const weather = useCurrentWeather(location.latitude, location.longitude);

  const getDayOfWeek = () => {
    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const date = new Date();
    return daysOfWeek[date.getDay()];
  };

  const getDayMonth = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${getDayOfWeek()}, ${day} de ${month}`;
  };

  return (
    <>
      {weather.isLoading ? <TextSkeleton /> : null}
      {weather.data ? (
        <div className="mt-4 flex text-sm">
          <p>{getDayMonth()}</p>
          <div className="mx-2">|</div>
          <p>{weather.data.temperature}</p>
          <div className="mx-2">|</div>
          <p>{weather.data.condition}</p>
        </div>
      ) : null}
    </>
  );
};
