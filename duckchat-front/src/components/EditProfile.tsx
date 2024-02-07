import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateProfile, userSelector } from "@/slices/user-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { IUpdateProfile } from "../interfaces/IUpdateProfile";

// export interface EditProfileProps {
//   user: IUser;
// }

function EditProfile() {
  const dispatch = useAppDispatch();
  const { user: userAuth } = useAppSelector(userSelector);

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

    await dispatch(updateProfile(dataUpdateProfile));
  };

  useEffect(() => {
    if (!userAuth) return;

    setFirstName(userAuth.firstName);
    setLastName(userAuth.lastName);
    setUsername(userAuth.username);
    setAbout(userAuth.about);
  }, [userAuth]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-primary text-primary-foreground"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Faça alterações em seu perfil aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Salvar mudanças
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
