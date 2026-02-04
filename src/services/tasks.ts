import {
  fetchPendingTasksByUser,
  fetchTodaysTasksByUser,
} from "@/providers/tasks";

export const getPendingTasksByUser = async (userId: string) => {
  if (userId === "" || userId === null || userId === undefined) {
    throw new Error("User ID is required");
  }
  return await fetchPendingTasksByUser(userId);
};

export const getTodaysTasksByUser = async (userId: string) => {
  if (userId === "" || userId === null || userId === undefined) {
    throw new Error("User ID is required");
  }

  return await fetchTodaysTasksByUser(userId);
};
