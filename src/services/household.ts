import { fetchHouseholdByUser } from "@/providers/household";

export const getHouseholdByUser = async (userId: string) => {
  if (!userId || userId === "") {
    throw new Error("User ID is required");
  }
  return fetchHouseholdByUser(userId);
};
