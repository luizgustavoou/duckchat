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
import { Check, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState, MouseEvent } from "react";
import { IUser } from "@/entities/IUser";
import SkeletonCard from "./SkeletonCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addFriend } from "@/slices/friends-slice";
import {
  getAllNonFriends,
  nonFriendsSelector,
} from "@/slices/non-friends-slice";
import { useAppSelector } from "@/hooks/useAppSelector";

function AddFriend() {
  const dispatch = useAppDispatch();

  const { nonFriends, status: nonFriendsStatus } =
    useAppSelector(nonFriendsSelector);

  const [newFriends, setNewFriends] = useState<string[]>([]);

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const dispatchPromises = newFriends.map((id) =>
      dispatch(addFriend({ userId: id }))
    );

    await Promise.all(dispatchPromises);

    await dispatch(getAllNonFriends());

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
    dispatch(getAllNonFriends());
  }, []);

  const disableActions = nonFriendsStatus === "loading";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-primary text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar amigos</DialogTitle>
          <DialogDescription>
            Faça novas amizades para iniciar um novo bate-papo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center">
            {/* <Search width={16} height={16} /> */}
            <Input id="name" placeholder="Procurar usuário..." />
          </div>

          {disableActions && <SkeletonCard length={4} />}

          {nonFriendsStatus != "loading" &&
            nonFriends.map((user) => (
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
        <DialogFooter>
          <div className="w-full flex justify-between">
            <p className="text-sm text-muted-foreground">
              Selecione usuários para serem adicionados
            </p>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={disableActions}
            >
              Adicionar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddFriend;
