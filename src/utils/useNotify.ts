import { toast, ToastOptions } from "react-toastify";

export function useNotify() {
  return (
    type: "success" | "warning" | "error" | "info",
    msg: string,
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        return toast.success(msg, options);
      case "warning":
        return toast.warning(msg, options);
      case "error":
        return toast.error(msg, options);
      case "info":
        return toast.info(msg, options);
    }
  };
}
