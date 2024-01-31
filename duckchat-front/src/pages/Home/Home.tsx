import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useCallback, useEffect, useState } from "react";
import { userService } from "@/services";
import Chat from "@/components/Chat";

export default function Home() {
  const [friendships, setFriendships] = useState<IFriendship[]>([]);
  const [currentFriendship, setCurrentFriendship] =
    useState<IFriendship | null>(null);

  useEffect(() => {
    const getAllFriendsOfUser = async () => {
      const res = await userService.getAllFriendsOfUser();

      console.log(res);
      setFriendships(res);
    };

    getAllFriendsOfUser();
  }, []);

  const isSelected = useCallback(
    (friendshio: IFriendship) => {
      return currentFriendship?.id === friendshio.id;
    },
    [currentFriendship]
  );

  // const isSelected = useMemo(
  //   () => (friendshio: IFriendship) => {
  //     return currentFriendship?.id === friendshio.id;
  //   },
  //   [currentFriendship]
  // );

  const handleFriendshipClick = (friendshipId: IFriendship) => {
    setCurrentFriendship(friendshipId);
  };

  return (
    <div className="flex-1 flex max-h-screen">
      <div className="flex flex-col  border-r-2 ">
        {friendships.map((friendship) => (
          <CardFriend
            friendship={friendship}
            key={friendship.id}
            isSelected={isSelected}
            handleFriendshipClick={handleFriendshipClick}
          ></CardFriend>
        ))}
      </div>

      <div className="flex-1 flex p-5 ">
        {/* <Outlet /> */}
        {currentFriendship && <Chat friendship={currentFriendship} />}
      </div>
    </div>
  );
}
