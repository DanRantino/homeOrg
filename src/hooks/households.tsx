import { getHouseholdByUser } from "@/services/household";
import { useQuery } from "@tanstack/react-query";

export const useGetHouseholdByUser = (userId: string) => {
  return useQuery({
    queryKey: ["household", userId],
    queryFn: () => getHouseholdByUser(),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
  });
};
