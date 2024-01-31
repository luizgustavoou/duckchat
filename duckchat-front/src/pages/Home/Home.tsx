import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useEffect, useState } from "react";
import { userService } from "@/services";
import { Outlet } from "react-router-dom";
import { useAppNavigate } from "@/hooks/useNavigate";
import Chat from "@/components/Chat";

export default function Home() {
  const navigate = useAppNavigate();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

  const handleFriendshipClick = (friendshipId: IFriendship) => {
    setCurrentFriendship(friendshipId);
  };

  return (
    <>
      <div className="flex flex-col text-white gap-6 border-r-2">
        {friendships.map((friendship) => (
          <CardFriend
            friendship={friendship}
            key={friendship.id}
            handleFriendshipClick={handleFriendshipClick}
          ></CardFriend>
        ))}
      </div>

      <div className="flex-1 text-white flex p-5">
        {/* <Outlet /> */}
        {currentFriendship && <Chat friendship={currentFriendship} />}
      </div>
    </>
  );
}
