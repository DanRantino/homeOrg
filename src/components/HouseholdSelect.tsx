import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pb } from "@/data/pocketbase";
import { useGetHouseholdByUser } from "@/hooks/households";
import Cookies from "js-cookie";
import { ChevronsUpDown, House } from "lucide-react";
import React from "react";

export const HouseholdSelect = () => {
  const user = pb.authStore.record;
  const [open, setOpen] = React.useState(false);
  const householdsQuery = useGetHouseholdByUser(user?.id || "");
  const [household, setHousehold] = React.useState(
    Cookies.get("household") ||
      (householdsQuery?.data && householdsQuery?.data[0]?.id) ||
      "",
  );

  const handleSelectHousehold = (householdId: string) => {
    Cookies.set("household", householdId, { expires: 7 });
    setHousehold(householdId);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-full h-fit flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <img
              className="size-8 rounded-md bg-cover bg-center"
              src={
                "http://127.0.0.1:8090/api/files/_pb_users_auth_/npr96cyh1nc96kc/" +
                user?.avatar
              }
            />
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1">
                Casa atual
              </p>
              <p className="text-sm font-semibold text-white">
                {householdsQuery.data?.find((h) => h.id === household)?.name}
              </p>
            </div>
          </div>
          <ChevronsUpDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full rounded-md">
        <DropdownMenuGroup className="w-full rounded-md">
          {householdsQuery.data?.map((h) => (
            <DropdownMenuItem
              key={h.id}
              className="w-full max-w-52 justify-start hover:bg-accent hover:cursor-pointer"
              onClick={() => handleSelectHousehold(h.id)}
            >
              <House className="size-4 mr-2" />
              <div className="flex flex-col justify-center items-center max-w-52 w-52">
                {h.name}
                {Cookies.get("household") === h.id && (
                  <span className="text-xs ml-2 text-blue-600">
                    (Selecionada)
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
