import { fetchHouseholdByUser } from "@/providers/household";
import type { NormalizedHouseholdByUser } from "@/types/household";

export const getHouseholdByUser = async () => {
  const household = await fetchHouseholdByUser();
  const normalizedHousehold: NormalizedHouseholdByUser[] = [];
  household.forEach((h) => {
    const householdMember = h.expand.household_members_via_household.find(
      (hm) => hm.user === h.id,
    );
    if (householdMember) {
      normalizedHousehold.push({
        id: h.id,
        name: h.name,
        created: h.created,
        updated: h.updated,
        role: getRole(householdMember.role),
      });
    }
  });
  return normalizedHousehold;
};

const getRole = (role: "owner" | "member" | "guest") => {
  if (role === "owner") return "Dono";
  if (role === "member") return "Membro";
  return "Convidado";
};
