import { authSelector } from "@/slices/auth-slice";
import { useAppSelector } from "./useAppSelector";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { user } = useAppSelector(authSelector);

  const [auth, setAuth] = useState<boolean>(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    setAuth(!!user);

    setState("success");
  }, [user]);

  return { auth, state };
};
