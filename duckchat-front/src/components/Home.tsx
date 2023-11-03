import CardFriend, { Friend } from "./CardFriend";

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
    <div className="flex min-h-screen">
      <div className="flex flex-col bg-secondary-foreground  text-white gap-6 min-w-[16%]">
        {friends.map((friend) => (
          <CardFriend friend={friend}></CardFriend>
        ))}
      </div>

      <div className="text-white flex-1"></div>
    </div>
  );
}
