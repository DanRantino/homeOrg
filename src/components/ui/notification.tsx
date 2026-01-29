import { Bell, BellDot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { type NotificationType } from "@/types/notifications";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "./drawer";

type NotificationProps = {
  notifications: NotificationType[];
};

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const hasNotifications = notifications.length > 0;
  const displayCount = notifications.length > 9 ? "9+" : notifications.length;

  const typeToIcon = (type: string) => {
    switch (type) {
      case "to do":
        return "ℹ️ Tarefa Pendente";
      case "delayed":
        return "⚠️ Tarefa Atrasada";
      case "approved":
        return "✅ Tarefa Aprovada";
      default:
        return "ℹ️ Tarefa Pendente";
    }
  };
  return (
    <Drawer direction="right">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative inline-flex items-center justify-center">
            {hasNotifications ? (
              <BellDot className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Bell className="h-5 w-5 text-muted-foreground" />
            )}

            {hasNotifications && (
              <span
                className="
              absolute
              -top-1
              -right-1
              min-w-4
              h-4
              px-1
              rounded-full
              bg-destructive
              text-destructive-foreground
              text-[10px]
              font-medium
              flex
              items-center
              justify-center
              leading-none
              "
              >
                {displayCount}
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="px-4 py-2 font-medium">
            Notifications
          </DropdownMenuLabel>
          {notifications.map((notification, index) => {
            if (index >= 5) return null; // Limit to 5 notifications
            return (
              <DropdownMenuItem key={index}>
                <div>
                  <p>{typeToIcon(notification.type)}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
              </DropdownMenuItem>
            );
          })}
          {notifications.length > 5 && (
            <DrawerTrigger>
              <DropdownMenuItem>
                <div className="text-center w-full font-medium">
                  See all notifications +
                </div>
              </DropdownMenuItem>
            </DrawerTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DrawerContent>
        <DrawerHeader>
          <h2 className="text-lg font-semibold mb-4">All Notifications</h2>
        </DrawerHeader>
        <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border rounded-md">
              <p className="font-medium">{typeToIcon(notification.type)}</p>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Notification;
