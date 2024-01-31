import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import { useEffect, useState } from "react";
import { userService } from "@/services";
import { Outlet } from "react-router-dom";
import { useAppNavigate } from "@/hooks/useNavigate";

export default function Home() {
  const navigate = useAppNavigate();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [friendships, setFriendships] = useState<IFriendship[]>([]);

  useEffect(() => {
    const getAllFriendsOfUser = async () => {
      const res = await userService.getAllFriendsOfUser();

      setFriendships(res);
    };

    getAllFriendsOfUser();
  }, []);

  const handleFriendshipClick = (friendshipId: string) => {
    navigate(friendshipId);
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
        <Outlet />
      </div>
    </>
  );
}
