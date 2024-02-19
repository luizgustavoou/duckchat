import { userService } from "@/services";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "./useAppSelector";
import { authSelector } from "@/slices/auth-slice";

export const useProfileImageUrl = () => {
  const { user: authUser } = useAppSelector(authSelector);

  const [profileImage, setProfileImage] = useState<Blob | null>(null);

  const profileImageUrl = useMemo(
    () => profileImage && URL.createObjectURL(profileImage),
    [profileImage]
  );

  useEffect(() => {
    const loadProfileImageUser = async () => {
      if (!authUser?.avatarURL) return;

      const res = await userService.getProfileImage({
        profileImage: authUser.avatarURL,
      });

      setProfileImage(res);
    };

    loadProfileImageUser();
  }, [authUser]);

  return {
    profileImageUrl,
  };
};
