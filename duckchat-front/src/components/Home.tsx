import CardFriend, { Friend } from "./CardFriend";
import Chat from "./Chat";

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
    <div className="flex min-h-screen p-6">
      <div className="flex-1 flex bg-gray-900 ">
        <div className="flex flex-col  text-white gap-6 min-w-[16%]">
          {friends.map((friend) => (
            <CardFriend friend={friend}></CardFriend>
          ))}
        </div>

        <div className="text-white flex bg-gray-800 p-5 w-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}
