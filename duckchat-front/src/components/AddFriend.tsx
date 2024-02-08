import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState, MouseEvent } from "react";
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

function AddFriend() {
  const dispatch = useAppDispatch();

  const { nonFriendsUsers, status: nonFriendsStatus } = useAppSelector(
    nonFriendsUsersSelector
  );

  const [newFriends, setNewFriends] = useState<string[]>([]);

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

  const disableActions = nonFriendsStatus === "loading";

  return (
    <AppDialog
      trigger={
        <Button
          variant="outline"
          size="icon"
          className="bg-primary text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </Button>
      }
      title="Adicionar amigos"
      description="Faça novas amizades para iniciar um novo bate-papo."
      main={
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center">
            {/* <Search width={16} height={16} /> */}
            <Input id="name" placeholder="Procurar usuário..." />
          </div>

          {disableActions && <SkeletonCard length={4} />}

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
                    src={"https://github.com/shadcn.png"}
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
