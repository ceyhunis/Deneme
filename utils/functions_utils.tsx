import { toast } from "react-toastify";

export const notify = async (
    message: string,
    type: "error" | "success" | "info",
  ) => {
    toast[type](message);
  };