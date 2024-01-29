import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export interface Friend {
  name: string;
  status: boolean;
  image: string;
}

interface CardFriendProps {
  friend: Friend;
}

export default function CardFriend(props: CardFriendProps) {
  return (
    <div className="flex gap-3 py-3 px-4 items-center hover:bg-slate-600 cursor-pointer">
      <>
        <Avatar>
          <AvatarImage className="w-12 rounded-full" src={props.friend.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div>{props.friend.name}</div>
          <div>
            {props.friend.status ? (
              <div className="flex items-center gap-1">
                <span>Ativo</span>{" "}
                <div className="rounded-full w-3 h-3 bg-green-300 align-middle"></div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span>Inativo</span>{" "}
                <div className="rounded-full w-3 h-3 bg-red-400 align-middle"></div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
