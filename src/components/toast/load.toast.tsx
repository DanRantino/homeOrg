import { toast as sonnerToast } from "sonner";
import Toast, { type ToastProps } from "../ui/sonner";

export function loadingToast(toast: Omit<ToastProps, "id" | "type">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      type="loading"
    />
  ));
}
