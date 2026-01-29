import { pb } from "@/data/pocketbase";
import type { RecordModel } from "pocketbase";
import { create } from "zustand";
import type { PersistStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

export interface AuthState {
  isAuthenticated: boolean;
  user: RecordModel | null;
  token: string | null;
  otpId: string | null;
  setAuth: (auth: Partial<AuthState>) => void;
  syncFromPocketbase: () => void;
  requestOTP: (email: string) => Promise<string>;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: (
    email: string,
    otpId: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearAuth: () => void;
}

const key = "pocketbase_auth";

// Custom storage that works on both server and client
const createStorage = (): PersistStorage<AuthState> => {
  if (typeof window === "undefined") {
    // Server-side: use memory storage (no-op)
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  // Client-side: use localStorage
  return {
    getItem: (name) => {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    },
    setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
    removeItem: (name) => localStorage.removeItem(name),
  };
};

function getAuthFromPocketbase(): Partial<AuthState> {
  return {
    isAuthenticated: pb.authStore.isValid,
    user: pb.authStore.model,
    token: pb.authStore.token,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      otpId: null,
      setAuth: (auth) => set(auth),
      syncFromPocketbase: () => {
        const authData = getAuthFromPocketbase();
        set(authData);
      },
      requestOTP: async (email: string) => {
        const response = await pb.collection("users").requestOTP(email);
        set({ otpId: response.otpId });
        return response.otpId;
      },
      login: async (email: string, password: string) => {
        try {
          const authData = await pb
            .collection("users")
            .authWithPassword(email, password);
          set({
            isAuthenticated: true,
            user: authData.record,
            token: authData.token,
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },
      loginWithOTP: async (otpId: string, password: string) => {
        try {
          const authData = await pb
            .collection("users")
            .authWithOTP(otpId, password);
          set({
            isAuthenticated: true,
            user: authData.record,
            token: authData.token,
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },
      logout: async () => {
        pb.authStore.clear();
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          otpId: null,
        });
      },
      clearAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          otpId: null,
        });
      },
    }),
    {
      name: key,
      storage: createStorage(),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) console.error("Failed to rehydrate auth store", error);
          // Sync with pocketbase after rehydration
          if (state) {
            state.syncFromPocketbase();
          }
        };
      },
    },
  ),
);
