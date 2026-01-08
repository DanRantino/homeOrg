export type NotificationType = {
  id: string;
  type: "to do" | "delayed" | "approved";
  message: string;
};
