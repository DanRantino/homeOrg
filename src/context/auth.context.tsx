import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { pb } from "@/data/pocketbase";

type AuthContextType = {
  user: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState(auth.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(auth.getUser());
    setLoading(false);

    return pb.authStore.onChange(() => {
      setUser(auth.getUser());
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth fora do AuthProvider");
  return ctx;
}
