// src/hooks/useCurrentWeather.ts
import { getPendingTasksByUser, getTodaysTasksByUser } from "@/services/tasks";
import { useQuery } from "@tanstack/react-query";

export function useCurrentTasks(userId: string) {
  return useQuery({
    queryKey: ["tasks", userId, "pending"],
    queryFn: () => getPendingTasksByUser(userId),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
  });
}

export function useTodaysTasks(userId: string) {
  return useQuery({
    queryKey: ["tasks", userId, "today"],
    queryFn: () => getTodaysTasksByUser(userId),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
  });
}
