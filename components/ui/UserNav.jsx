import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useRouter } from "next/router";
import { useContext } from "react";
import authContext from "@/store/auth-context";

export function UserNav() {
  const router = useRouter();
  const authCtx = useContext(authContext);
  const { logout, user } = authCtx;

  const logoutHandler = () => {
    logout();
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.push("/auth/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-green-500">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none"></p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.name}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.usertype === "Staff" && (
            <DropdownMenuItem className="border border-t-0 border-x-0">
              <Link href={`/staff/${user.uniqueid}`}>Profile</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="border border-t-0 border-x-0">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
