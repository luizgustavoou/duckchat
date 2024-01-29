import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { IFriendship } from "@/entities/IFriendship";

export default function Chat() {
  const friendship: IFriendship = {
    id: "952f2ea2-a997-44ac-92ec-50217bafc6d7",
    friend: {
      id: "c9f94b42-303e-410d-8635-c4bf6353b885",
      username: "jorge",
      password: "123",
      firstName: "Jorge",
      lastName: "Fernandes",
      avatarURL: "https://github.com/shadcn.png",
    },
  };

  const mensage = {
    message: "Garcia é otaku",
    username: "Luiz",
    createdAt: Date.now(),
    avatar:
      "https://images.vexels.com/media/users/3/308170/isolated/preview/6f83ccf0efa21e0a5a1864723411c8d2-pato-de-borracha-flutuante.png",
  };

  const chatName = "Luiz Gustavo";

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage
            className="w-12 rounded-full"
            src={friendship.friend.avatarURL}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{`${friendship.friend.firstName} ${friendship.friend.lastName}`}</p>
      </div>

      <div className="flex-1">
        <div className="flex py-3 px-4 items-center gap-2 hover:bg-slate-600 cursor-pointer">
          <>
            <Avatar>
              <AvatarImage className="w-12 rounded-full" src={mensage.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div>
                {mensage.username}{" "}
                <span className="text-sm text-muted-foreground">
                  {mensage.createdAt}
                </span>
              </div>
              <div>{mensage.message}</div>
            </div>
          </>
        </div>
      </div>

      <Textarea
        className="resize-none bg-slate-600 focus-visible:ring-transparent"
        placeholder={`Comversar com ${chatName}`}
      />
    </div>
  );
}
