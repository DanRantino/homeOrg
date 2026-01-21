import { pb } from "@/data/pocketbase";

export const auth = {
  async login(email: string, password: string) {
    const { record } = await pb
      .collection("users")
      .authWithPassword(email, password);

    return record;
  },

  async logout() {
    pb.authStore.clear();
  },

  getUser() {
    return pb.authStore.record;
  },

  isAuthenticated() {
    return pb.authStore.isValid;
  },
};
