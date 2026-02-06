import { pb } from "@/data/pocketbase";
import type { Household } from "@/types/household";

export const fetchHouseholdByUser = async () => {
  const res = (await pb.collection("households").getFullList({
    expand: "household_members_via_household",
  })) as Household[];
  return res;
};
