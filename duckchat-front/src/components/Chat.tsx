import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { IFriendship } from "@/entities/IFriendship";
import { IMessage } from "@/entities/IMessage";

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

  const messages: IMessage[] = [
    {
      id: "3b221db3-35b2-43bd-908e-ca2dc41a85b7",
      createdAt: "2024-01-28T17:34:40.419Z",
      updatedAt: "2024-01-28T17:34:40.433Z",
      content: "msg atualizada kkk errei a palavra",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "6ebf89b3-110f-4bee-9d46-62eb111f8c37",
      createdAt: "2024-01-28T17:40:27.480Z",
      updatedAt: "2024-01-28T17:40:27.480Z",
      content: "tudo bem?",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "a4adab8f-2ad8-45fd-a152-04a185b43267",
      createdAt: "2024-01-28T19:40:09.854Z",
      updatedAt: "2024-01-28T19:40:09.854Z",
      content: "olá sou joao?",
      user: {
        id: "c9f94b42-303e-410d-8635-c4bf6353b885",
        username: "jorge",
        password: "123",
        firstName: "Jorge",
        lastName: "Fernandes",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "edd4229d-ac4f-4eba-ad13-97a3634b45c1",
      createdAt: "2024-01-28T19:41:13.374Z",
      updatedAt: "2024-01-28T19:41:13.374Z",
      content: "olá João, sou luiz?",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "0ef69890-1a42-46ac-9c47-a8e1a1eb7761",
      createdAt: "2024-01-28T20:37:09.611Z",
      updatedAt: "2024-01-28T20:37:09.611Z",
      content: "teste1",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "25cf6313-3ee0-4da1-8456-25d5399b9bb2",
      createdAt: "2024-01-28T21:45:27.314Z",
      updatedAt: "2024-01-28T21:45:27.314Z",
      content: "teste1",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "f799234d-96b4-4bc3-978a-98bdd4496599",
      createdAt: "2024-01-29T14:05:16.294Z",
      updatedAt: "2024-01-29T14:05:16.294Z",
      content: "eai cara!",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "1578cc13-0db5-4034-bf79-c3679b4a5714",
      createdAt: "2024-01-29T16:25:41.485Z",
      updatedAt: "2024-01-29T16:25:41.485Z",
      content: "eai cara!",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "5771f997-2f0e-48ff-b048-1f71dedc4f85",
      createdAt: "2024-01-29T16:25:59.484Z",
      updatedAt: "2024-01-29T16:25:59.484Z",
      content: "eai cara!",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
    {
      id: "4825f248-401a-4d1b-93b6-00d47da763dc",
      createdAt: "2024-01-29T16:29:26.599Z",
      updatedAt: "2024-01-29T16:29:26.599Z",
      content: "eai cara!",
      user: {
        id: "64f7485f-9083-409e-ba2d-67a37429a399",
        username: "luizgustavoou",
        password: "123",
        firstName: "gugu delicia",
        lastName: "Umbelino",
        avatarURL: "https://github.com/shadcn.png",
      },
    },
  ];

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
        {messages.map((message) => (
          <div
            className="flex py-3 px-4 items-center gap-2 hover:bg-accent/50 cursor-pointer"
            key={message.id}
          >
            <Avatar>
              <AvatarImage
                className="w-12 rounded-full"
                src={message.user.avatarURL}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className="mr-1">{message.user.firstName}</span>
              <span className="text-sm text-muted-foreground">
                {message.createdAt}
              </span>

              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Textarea
        className="resize-none bg-input focus-visible:ring-transparent"
        placeholder={`Conversar com ${friendship.friend.firstName}`}
      />
    </div>
  );
}
