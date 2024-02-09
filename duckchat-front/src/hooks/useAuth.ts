import { authSelector } from "@/slices/auth-slice";
import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
  const { user } = useAppSelector(authSelector);

  
};
