import { pb } from "@/data/pocketbase";

export const fetchHouseholdByUser = async (userId: string) => {
  const res = await pb.collection("households").getFullList({
    expand: "household_members_via_household",
  });
  return res;
};
