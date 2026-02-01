import { pb } from "@/data/pocketbase";
import type { RecordModel } from "pocketbase";
import { useSyncExternalStore } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  user: RecordModel | null;
  token: string | null;
}

const getSnapshot = (): AuthState => ({
  isAuthenticated: pb.authStore.isValid,
  user: pb.authStore.record,
  token: pb.authStore.token,
});

const getServerSnapshot = (): AuthState => ({
  isAuthenticated: false,
  user: null,
  token: null,
});

const subscribe = (callback: () => void) => {
  const unsubscribe = pb.authStore.onChange(() => callback(), true);
  return () => {
    if (typeof unsubscribe === "function") unsubscribe();
  };
};

let initializePromise: Promise<void> | null = null;

export async function initializeAuth() {
  if (!initializePromise) {
    initializePromise = (async () => {
      if (pb.authStore.isValid) {
        try {
          await pb.collection("users").authRefresh();
        } catch {
          pb.authStore.clear();
        }
      }
    })();
  }

  return initializePromise;
}

export function getAuthSnapshot() {
  return getSnapshot();
}

export function useAuth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export async function requestOTP(email: string) {
  const response = await pb.collection("users").requestOTP(email);
  return response.otpId;
}

export async function login(email: string, password: string) {
  await pb.collection("users").authWithPassword(email, password);
}

export async function loginWithOTP(otpId: string, password: string) {
  await pb.collection("users").authWithOTP(otpId, password);
}

export async function logout() {
  pb.authStore.clear();
}
