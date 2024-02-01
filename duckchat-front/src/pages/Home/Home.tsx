import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useCallback, useEffect, useState } from "react";
import { userService } from "@/services";
import Chat from "@/components/Chat";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
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
    <div className="flex-1 flex max-h-screen">
      <div className="flex flex-col  border-r-2 ">
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

      <div className="flex-1 flex p-5 ">
        {/* <Outlet /> */}
        {currentFriendship && <Chat friendship={currentFriendship} />}
      </div>
    </div>
  );
}
