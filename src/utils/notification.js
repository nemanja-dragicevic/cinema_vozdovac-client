import { toast } from "react-toastify";

export function error(message) {
  toast.error(message);
  // .success .info
}

export function success(message) {
  toast.success(message);
}
