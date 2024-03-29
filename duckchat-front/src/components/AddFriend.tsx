import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState, MouseEvent, ReactNode, ChangeEvent } from "react";
import { IUser } from "@/entities/IUser";
import SkeletonCard from "./SkeletonCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addFriend } from "@/slices/friends-slice";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  getAllNonFriendsUsers,
  nonFriendsUsersSelector,
} from "../slices/non-friends-users-slice";
import AppDialog from "./AppDialog";
import { useDebounce } from "@/hooks/useDebounce";
import { promise } from "zod";
import { getNonFriendsUsersBySearch } from "../slices/non-friends-users-slice";
import { getProfileImageUrl } from "@/utils/get-profile-image-url";

export interface AddFriendProps {
  trigger: ReactNode;
}
function AddFriend({ trigger }: AddFriendProps) {
  const dispatch = useAppDispatch();

  const { nonFriendsUsers, status: nonFriendsStatus } = useAppSelector(
    nonFriendsUsersSelector
  );

  const [search, setSearch] = useState<string | null>(null);
  const [newFriends, setNewFriends] = useState<string[]>([]);

  const handleSearch = useDebounce(async (value: string) => {
    if (!value || value === "") {
      await dispatch(getAllNonFriendsUsers());
      return;
    }

    await dispatch(getNonFriendsUsersBySearch({ searchValue: value }));
  }, 2000);

  const handleOnSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    handleSearch(value);
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const dispatchPromises = newFriends.map((id) =>
      dispatch(addFriend({ userId: id }))
    );

    await Promise.all(dispatchPromises);

    await dispatch(getAllNonFriendsUsers());

    setNewFriends([]);
  };

  const handleAddFriend = async (user: IUser) => {
    const newValue = [...newFriends];

    const index = newFriends.indexOf(user.id);

    if (index === -1) {
      newValue.push(user.id);
    } else {
      newValue.splice(index, 1);
    }

    setNewFriends(newValue);
  };

  useEffect(() => {
    dispatch(getAllNonFriendsUsers());
  }, []);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;

  //   if (search === null || search === "") return;

  //   interval = setTimeout(() => {
  //     console.log("Fazer requisição!");
  //   }, 2000);

  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [search]);

  const disableActions = nonFriendsStatus === "loading";

  return (
    <AppDialog
      trigger={trigger}
      title="Adicionar amigos"
      description="Faça novas amizades para iniciar um novo bate-papo."
      main={
        <div className="max-h-[500px] flex flex-col gap-4 py-4 ">
          <div className="flex items-center">
            {/* <Search width={16} height={16} /> */}
            <Input
              id="name"
              placeholder="Procurar usuário..."
              value={search || ""}
              onChange={handleOnSearchChange}
            />
          </div>

          {disableActions && <SkeletonCard length={4} />}

          <div className="overflow-auto">
            {nonFriendsStatus != "loading" &&
              nonFriendsUsers.map((user) => (
                <div
                  className="flex gap-3 py-5 px-4 items-center hover:bg-accent/50  cursor-pointer rounded-sm"
                  onClick={(_) => handleAddFriend(user)}
                  key={user.id}
                >
                  <Avatar>
                    <AvatarImage
                      className="w-12  rounded-full"
                      src={getProfileImageUrl(user.avatarURL)}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 me-auto">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  {newFriends.includes(user.id) && <Check />}
                </div>
              ))}
          </div>
        </div>
      }
      footer={
        <div className="w-full flex justify-between">
          <p className="text-sm text-muted-foreground">
            Selecione usuários para serem adicionados
          </p>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={disableActions || newFriends.length === 0}
          >
            Adicionar
          </Button>
        </div>
      }
    />
  );
}

export default AddFriend;
