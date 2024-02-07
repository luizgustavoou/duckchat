import { IFriendship } from "@/entities/IFriendship";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MouseEvent } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeFriend } from "@/slices/friends-slice";
interface ICardFriendProps {
  friendship: IFriendship;
  handleFriendshipClick: (friendship: IFriendship) => void;
  isSelected: (friendshio: IFriendship) => boolean;
}

export default function CardFriend({
  friendship,
  isSelected,
  handleFriendshipClick,
}: ICardFriendProps) {
  const dispatch = useAppDispatch();

  const handleMouseOver = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {};

  const handleClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    console.log("opa!");
  };

  const handleRemove = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    await dispatch(removeFriend({ friendshipId: friendship.id }));
  };

  return (
    <div
      className={`relative flex gap-3 py-5 px-4 items-center hover:bg-accent/50 cursor-pointer ${
        isSelected(friendship) && "bg-accent/50"
      }`}
      onClick={(_) => handleFriendshipClick(friendship)}
      onMouseOver={handleMouseOver}
    >
      <Avatar>
        <AvatarImage
          className="w-12 rounded-full"
          src={friendship.friend.avatarURL}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p>{friendship.friend?.firstName}</p>
        <p className="text-sm text-muted-foreground">
          {friendship.friend?.about}
        </p>
      </div>
      <div className="absolute top-auto right-3 " onClick={handleClick}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Remover amizade com {friendship.friend.firstName}{" "}
                {friendship.friend.lastName}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso excluirá sua amizade e
                todas as mensagens.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemove}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
