import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  ChangeEvent,
  useEffect,
  useState,
  MouseEvent,
  ReactNode,
  useMemo,
} from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateProfile, authSelector } from "@/slices/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { IUpdateProfile } from "../interfaces/IUpdateProfile";
import AppSheet from "./AppSheet";
import { userService } from "@/services";

export interface EditProfileProps {
  trigger: ReactNode;
}

function EditProfile({ trigger }: EditProfileProps) {
  const dispatch = useAppDispatch();
  const { user: authUser, status: authStatus } = useAppSelector(authSelector);

  const [previewImage, setPreviewImage] = useState<Blob | null>(null);
  const [profileImage, setProfileImage] = useState<Blob | null>(null);

  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>(null);

  const handleOnChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleOnChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleOnChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleOnChangeAbout = (e: ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const dataUpdateProfile: IUpdateProfile = {};

    if (username) dataUpdateProfile.username = username;
    if (about) dataUpdateProfile.about = about;
    if (firstName) dataUpdateProfile.firstName = firstName;
    if (lastName) dataUpdateProfile.lastName = lastName;
    if (profileImage) dataUpdateProfile.profileImage = profileImage;

    await dispatch(updateProfile(dataUpdateProfile));
  };

  useEffect(() => {
    if (!authUser) return;

    setFirstName(authUser.firstName);
    setLastName(authUser.lastName);
    setUsername(authUser.username);
    setAbout(authUser.about);
  }, [authUser]);

  const disableActions = useMemo(() => authStatus === "loading", [authStatus]);

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0);

    if (!file) return;

    setPreviewImage(file);
    setProfileImage(file);
  };

  const profileImageUrl = useMemo(
    () => previewImage && URL.createObjectURL(previewImage),
    [previewImage]
  );

  useEffect(() => {
    const loadProfileImageUser = async () => {
      if (!authUser?.avatarURL) return;

      const res = await userService.getProfileImage({
        profileImage: authUser.avatarURL,
      });

      setPreviewImage(res);
    };

    loadProfileImageUser();
  }, []);

  return (
    <AppSheet
      trigger={trigger}
      title="Editar Perfil"
      description="Faça alterações em seu perfil aqui. Clique em salvar quando terminar."
      main={
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username || ""}
              onChange={handleOnChangeUsername}
              className="col-span-3"
              disabled={disableActions}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              Primeiro nome
            </Label>
            <Input
              id="firstName"
              value={firstName || ""}
              onChange={handleOnChangeFirstName}
              className="col-span-3"
              disabled={disableActions}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Último nome
            </Label>
            <Input
              id="lastName"
              value={lastName || ""}
              onChange={handleOnChangeLastName}
              className="col-span-3"
              disabled={disableActions}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username || ""}
              onChange={handleOnChangeUsername}
              className="col-span-3"
              disabled={disableActions}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="about" className="text-right">
              Sobre
            </Label>
            <Input
              id="about"
              value={about || ""}
              onChange={handleOnChangeAbout}
              className="col-span-3"
              disabled={disableActions}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profileImage">Picture</Label>
            <Input
              id="profileImage"
              type="file"
              className="col-span-3"
              onChange={handleOnChangeFile}
            />
          </div>
          <div className="flex justify-center items-center">
            {profileImageUrl && (
              <img
                className="w-[150px]  rounded-sm"
                src={profileImageUrl}
              ></img>
            )}
          </div>
        </div>
      }
      close={
        <Button type="submit" onClick={handleSubmit} disabled={disableActions}>
          Salvar mudanças
        </Button>
      }
    />
  );
}

export default EditProfile;
