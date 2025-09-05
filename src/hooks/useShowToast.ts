import { useRef } from "react";
import { toast } from "react-toastify";

export function useShowToast() {
  const isToastActiveRef = useRef(false);

  return (type: "success" | "warning" | "error" | "info", text: string) => {
    if (isToastActiveRef.current) return;
    isToastActiveRef.current = true;
    toast[type](text, {
      onClose: () => {
        isToastActiveRef.current = false;
      }
    });
  };
}