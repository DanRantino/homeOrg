import { SearchIcon } from "lucide-react";
import Notification from "./ui/notification";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { pb } from "@/data/pocketbase";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <div className="border-b px-8 py-4">
      <header className="sticky top-0 left-0 flex gap-4 items-center bg-background-light dark:bg-background-dark">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="max-w-md">
            <Input
              icon={<SearchIcon size={15} />}
              size={200}
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center justify-center pt-2">
            <Notification notifications={[]} />
          </div>
        </div>
        <div className="h-8 w-px bg-accent mx-1"></div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col">
            <span className="text-lg">{pb.authStore.record?.name}</span>
            <span className="text-sm font-light text-right">Admin</span>
          </div>
          <Avatar>
            <AvatarImage
              src={
                "http://127.0.0.1:8090/api/files/_pb_users_auth_/npr96cyh1nc96kc/" +
                pb.authStore.record?.avatar
              }
              alt={pb.authStore.record?.name}
            />
          </Avatar>
        </div>
      </header>
    </div>
  );
}
