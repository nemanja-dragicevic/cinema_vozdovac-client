import { toast } from "react-toastify";

export function error(message) {
  toast.error(message, { closeOnClick: true, theme: "colored" });
  // .success .info
}

export function success(message) {
  toast.success(message, { closeOnClick: true, theme: "colored" });
}
