import { IFriendship } from "@/entities/IFriendship";
import CardFriend from "../../components/CardFriend";
import Chat from "../../components/Chat";
import { Button } from "@/components/ui/button";

export default function Home() {
  const friendships: IFriendship[] = [
    {
      id: "88d8fd19-a014-43db-9d50-94c0d03898d5",
      friend: {
        id: "c4981d52-2ec3-47ab-9ede-3f110a6a76db",
        username: "cleidiane",
        password: "123",
        firstName: "Cleidiane",
        lastName: "Moura",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "952f2ea2-a997-44ac-92ec-50217bafc6d7",
      friend: {
        id: "c9f94b42-303e-410d-8635-c4bf6353b885",
        username: "jorge",
        password: "123",
        firstName: "Jorge",
        lastName: "Fernandes",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col text-white gap-6">
        {friendships.map((friendship) => (
          <CardFriend friendship={friendship} key={friendship.id}></CardFriend>
        ))}
      </div>

      <div className="flex-1 text-white flex  p-5">
        <Chat />
      </div>
    </>
  );
}
