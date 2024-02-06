import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useCallback, useEffect, useState } from "react";
import Chat from "@/components/Chat";
import SkeletonCard from "@/components/SkeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/hooks/useAppSelector";
import EditProfile from "@/components/EditProfile";
import AddFriend from "@/components/AddFriend";
import { userSelector } from "@/slices/user-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { friendsSelector, getAllFriendsOfUser } from "@/slices/friends-slice";

export default function Home() {
  const { user: userAuth } = useAppSelector(userSelector);
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
      <div className="flex flex-col border-r-2">
        <div className="flex gap-3 py-5 px-4 items-center border-b-2">
          <Avatar>
            <AvatarImage
              className="w-14 rounded-full"
              src={userAuth?.avatarURL}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p>{userAuth?.firstName}</p>
            <p className="text-sm text-muted-foreground">{userAuth?.about}</p>
          </div>

          <div className="flex flex-col ">
            <EditProfile />
            <AddFriend />
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
