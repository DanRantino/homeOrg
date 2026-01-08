import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "lucide-react";
import { UserType } from "@/types/user";
import { Button } from "./ui/button";

function UserAvatar({ fallback, user }: { fallback?: string; user: UserType }) {
  return (
    <div className="pr-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="rounded-lg">
            <AvatarImage src={user.avatarUrl} alt="User Avatar" />
            <AvatarFallback>{fallback ? fallback : "UA"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-accent rounded-md p-3 text-accent-foreground"
          align="end"
        >
          <DropdownMenuItem>
            <div className="flex flex-col">
              <div className="flex pb-3">
                <User className="inline-block mr-2 h-4 w-4" />
                <p>{user.name}</p>
              </div>
              <div className="flex pb-3">
                <p>{user.email}</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-accent-foreground" />
          <DropdownMenuItem className="hover:bg-card cursor-pointer">
            <DropdownMenuLabel className="text-sm">
              Meu Perfil
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-card cursor-pointer">
            <DropdownMenuLabel className="text-sm">
              Prefências do App
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-accent-foreground" />
          <DropdownMenuItem>
            <Button
              variant="link"
              className="w-full text-left text-destructive hover:bg-muted"
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserAvatar;
