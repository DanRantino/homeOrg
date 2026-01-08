import { createContext, useContext, ReactNode } from "react";

import client from "@/data/client";
import { AuthRecord } from "pocketbase";

type AuthContextType = {
  user: AuthRecord | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = client.authStore.record;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
