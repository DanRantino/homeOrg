export type Household = {
  collectionId: string;
  collectionName: string;
  id: string;
  name: string;
  created: Date;
  updated: Date;
  expand: {
    household_members_via_household: HouseholdMembers[];
  };
};

export type HouseholdMembers = {
  collectionId: string;
  collectionName: string;
  id: string;
  household: string;
  user: string;
  created: Date;
  role: "owner" | "member" | "guest";
};

export type NormalizedHouseholdByUser = {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  role: "Dono" | "Membro" | "Convidado";
};
