import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import CardFriend from "./CardFriend";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function AddFriend() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-primary text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar amigos</DialogTitle>
          <DialogDescription>
            Faça novas amizades para iniciar um novo bate-papo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center">
            {/* <Search width={16} height={16} /> */}
            <Input id="name" placeholder="Procurar usuário..." />
          </div>

          <div className="flex p-3 gap-3 items-center hover:bg-accent rounded-sm cursor-pointer">
            <Avatar>
              <AvatarImage
                className="w-10 rounded-full"
                src={"https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p>{"teste"}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between">
            <p className="text-sm text-muted-foreground">
              Selecione usuários para serem adicionados
            </p>
            <Button type="submit">Adicionar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddFriend;
