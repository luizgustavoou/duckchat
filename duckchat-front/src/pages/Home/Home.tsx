import CardFriend, { Friend } from "../../components/CardFriend";
import Chat from "../../components/Chat";

export default function Home() {
  const friends: Friend[] = [
    {
      name: "Joab",
      status: false,
      image: "https://github.com/shadcn.png",
    },
    {
      name: "Luiz",
      status: true,
      image: "https://github.com/shadcn.png",
    },
  ];

  return (
    <>
      <div className="flex flex-col text-white gap-6">
        {friends.map((friend) => (
          <CardFriend friend={friend}></CardFriend>
        ))}
      </div>

      <div className="flex-1 text-white flex bg-gray-800 p-5">
        <Chat />
      </div>
    </>
  );
}
