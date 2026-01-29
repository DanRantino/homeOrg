import Toast, { type ToastProps } from "../ui/sonner";
import { toast as sonnerToast } from "sonner";

export function infoToast(toast: Omit<ToastProps, "id" | "type">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      type="info"
    />
  ));
}
