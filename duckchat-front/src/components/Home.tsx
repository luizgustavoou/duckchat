import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "./ui/skeleton";

export default function Home() {

  const friends = [{
    'name': 'joão',
    'status' : true,
    'image' : 'https://github.com/shadcn.png'
  }]

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col bg-secondary-foreground p-3 text-white gap-2 min-w-[16%]">
        <div className="flex items-center space-x-4">
        {friends.map((friend) => (
          <>
            <Avatar>
              <AvatarImage className="w-12 rounded-full" src={friend.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              <div className="space-y-2">
                <div>{friend.name}</div>
                <div>
                  {friend.status ? <span>Ativo <div className="rounded-full w-3 h-3 bg-green-300"></div></span>: <span>Inativo</span>}
                </div>
              </div>
          </>
        ))}
        </div>
      </div>



      <div className="text-white flex-1">
        sfdsdfsdf
      </div>
    </div>
  );
}
