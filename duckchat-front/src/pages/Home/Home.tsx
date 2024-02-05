import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useCallback, useEffect, useState } from "react";
import { userService } from "@/services";
import Chat from "@/components/Chat";
import SkeletonCard from "@/components/SkeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/hooks/useAppSelector";
import EditProfile from "@/components/EditProfile";

export default function Home() {
  const { user } = useAppSelector((state) => state.userReducer);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [friendships, setFriendships] = useState<IFriendship[]>([]);

  const [currentFriendship, setCurrentFriendship] =
    useState<IFriendship | null>(null);

  useEffect(() => {
    const getAllFriendsOfUser = async () => {
      try {
        setStatus("loading");
        const res = await userService.getAllFriendsOfUser();

        setFriendships(res);

        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    };

    getAllFriendsOfUser();
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
      <div className="flex flex-col border-r-2 ">
        <div className="flex gap-3 py-5 px-4 items-center border-b-2">
          <Avatar>
            <AvatarImage className="w-14 rounded-full" src={user?.avatarURL} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p>{user?.firstName}</p>
            <p className="text-sm text-muted-foreground">{user?.about}</p>
          </div>

          {user && <EditProfile user={user} />}
        </div>

        <div className="flex-1 flex flex-col">
          {status === "loading" ? (
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
