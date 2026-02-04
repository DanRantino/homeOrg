import { pb } from "@/data/pocketbase";
import type { Task } from "@/types/tasks";

export const fetchPendingTasksByUser = async (
  userId: string,
): Promise<Task[]> => {
  return pb.collection("tasks").getFullList({
    filter: `assignedTo = "${userId}" && status = "pending"`,
    sort: "-created",
  }) as Promise<Task[]>;
};

export const fetchTodaysTasksByUser = async (
  userId: string,
): Promise<Task[]> => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  //Date needs to be DD-MM-YYYY HH:MM:SS format
  const startOfDayFormated = `${startOfDay.getUTCFullYear()}-${String(
    startOfDay.getUTCMonth() + 1,
  ).padStart(
    2,
    "0",
  )}-${String(startOfDay.getUTCDate() - 1).padStart(2, "0")} 00:00:00`;

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const endOfDayFormated = `${endOfDay.getUTCFullYear()}-${String(
    endOfDay.getUTCMonth() + 1,
  ).padStart(
    2,
    "0",
  )}-${String(endOfDay.getUTCDate() - 1).padStart(2, "0")} 23:59:59`;

  return pb.collection("tasks").getFullList({
    filter: `assignedTo = "${userId}" && dueDate >= "${startOfDayFormated}" && dueDate <= "${endOfDayFormated}"`,
    sort: "dueDate",
  }) as Promise<Task[]>;
};
