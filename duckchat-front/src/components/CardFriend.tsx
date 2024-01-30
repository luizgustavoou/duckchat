import { IFriendship } from "@/entities/IFriendship";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface ICardFriendProps {
  friendship: IFriendship;
}

export default function CardFriend({ friendship }: ICardFriendProps) {
  return (
    <div className="flex gap-3 py-3 px-4 items-center hover:bg-accent/50 cursor-pointer">
      <>
        <Avatar>
          <AvatarImage
            className="w-12 rounded-full"
            src={friendship.friend.avatarURL}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div>{friendship.friend.firstName}</div>
          {/* <div>
            {friendship.status ? (
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
          </div> */}
        </div>
      </>
    </div>
  );
}
