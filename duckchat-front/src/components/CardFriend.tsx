import { IFriendship } from "@/entities/IFriendship";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface ICardFriendProps {
  friendship: IFriendship;
  handleFriendshipClick: (friendship: IFriendship) => void;
  isSelected: (friendshio: IFriendship) => boolean;
}

export default function CardFriend({
  friendship,
  isSelected,
  handleFriendshipClick,
}: ICardFriendProps) {
  return (
    <div
      className={`flex gap-3 py-5 px-4 items-center hover:bg-accent/50 cursor-pointer ${
        isSelected(friendship) && "bg-accent/50"
      }`}
      onClick={(_) => handleFriendshipClick(friendship)}
    >
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
