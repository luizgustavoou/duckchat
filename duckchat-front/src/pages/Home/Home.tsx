import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useCallback, useEffect, useState } from "react";
import Chat from "@/components/Chat";
import SkeletonCard from "@/components/SkeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/hooks/useAppSelector";
import EditProfile from "@/components/EditProfile";
import AddFriend from "@/components/AddFriend";
import { authSelector } from "@/slices/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { friendsSelector, getAllFriendsOfUser } from "@/slices/friends-slice";
import AppPopover from "@/components/AppPopover";
import AppAlertDialog from "@/components/AppAlertDialog";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user: authUser } = useAppSelector(authSelector);
  const { friendships, status: friendshipStatus } =
    useAppSelector(friendsSelector);

  const dispatch = useAppDispatch();

  const [currentFriendship, setCurrentFriendship] =
    useState<IFriendship | null>(null);

  useEffect(() => {
    dispatch(getAllFriendsOfUser());
  }, []);

  const isSelected = useCallback(
    (friendshio: IFriendship) => {
      return currentFriendship?.id === friendshio.id;
    },
    [currentFriendship]
  );

  const handleFriendshipClick = (friendshipId: IFriendship) => {
    setCurrentFriendship(friendshipId);
  };

  return (
    <div className="flex-1 flex">
      <div className="flex flex-col border-r-2 overflow-auto">
        <div className="flex gap-3 py-5 px-4 items-center border-b-2">
          <Avatar>
            <AvatarImage
              className="w-14 rounded-full"
              src={authUser?.avatarURL}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p>{authUser?.firstName}</p>
            <p className="text-sm text-muted-foreground">{authUser?.about}</p>
          </div>

          <div className="flex flex-col gap-1">
            <AppPopover
              trigger={
                <MoreHorizontalIcon size={20} className="cursor-pointer" />
              }
              content={
                <div className="flex flex-col ">
                  <AddFriend
                    trigger={
                      <div className="px-5 py-3 hover:bg-black/40 cursor-pointer">
                        Adicionar amigo
                      </div>
                    }
                  />
                  <EditProfile
                    trigger={
                      <div className="px-5 py-3 hover:bg-black/40 cursor-pointer">
                        Editar perfil
                      </div>
                    }
                  />
                </div>
              }
              parentContentClassName="w-36 p-0 bg-muted rounded-none"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {friendshipStatus === "loading" ? (
            <SkeletonCard />
          ) : (
            <>
              {friendships.map((friendship) => (
                <CardFriend
                  friendship={friendship}
                  key={friendship.id}
                  isSelected={isSelected}
                  handleFriendshipClick={handleFriendshipClick}
                ></CardFriend>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex">
        {currentFriendship && <Chat friendship={currentFriendship} />}
      </div>
    </div>
  );
}
