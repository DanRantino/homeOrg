import { toast as sonnerToast } from "sonner";
import Toast, { type ToastProps } from "../ui/sonner";

export function confirmationToast(toast: Omit<ToastProps, "id" | "type">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      type="confirmation"
    />
  ));
}
