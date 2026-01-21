import Toast, { ToastProps } from "../ui/sonner";
import { toast as sonnerToast } from "sonner";

// Custom Toast Functions
export function successToast(toast: Omit<ToastProps, "id" | "type">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      type="success"
    />
  ));
}
