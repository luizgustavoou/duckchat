import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";

export default function Chat() {
  const mensage = {
    message: "Garcia é otaku",
    username: "Luiz",
    createdAt: Date.now(),
    avatar:
      "https://images.vexels.com/media/users/3/308170/isolated/preview/6f83ccf0efa21e0a5a1864723411c8d2-pato-de-borracha-flutuante.png",
  };

  const chatName = "Luiz Gustavo";

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage className="w-12 rounded-full" src={mensage.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{chatName}</p>
      </div>

      <div className="flex-1">
        <div className="flex py-3 px-4 items-center space-x-4 hover:bg-slate-600 cursor-pointer">
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

      <div className="">
        <Textarea className="resize-none bg-slate-600 focus-visible:ring-transparent" placeholder={`Comversar com ${chatName}`} />
      </div>
    </div>
  );
}
