import { pb } from "@/data/pocketbase";

let initialized = false;

export async function bootstrapSession() {
  if (initialized) return;
  initialized = true;

  // força leitura do authStore
  pb.authStore.isValid;
}
