import { Home } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ModeToggle } from "./mode-toggle";
import Notification from "./ui/notification";

import { type NotificationType } from "@/types/notifications";
import UserAvatar from "./user-avatar";

export const notificationsMock: NotificationType[] = [
  {
    id: "1",
    type: "to do",
    message: "Revisar contrato do fornecedor",
  },
  {
    id: "2",
    type: "approved",
    message: "Pagamento do aluguel aprovado",
  },
  {
    id: "3",
    type: "delayed",
    message: "Manutenção do ar-condicionado atrasada",
  },
  {
    id: "4",
    type: "to do",
    message: "Comprar ração dos pets",
  },
  {
    id: "5",
    type: "approved",
    message: "Conta de luz paga com sucesso",
  },
  {
    id: "6",
    type: "to do",
    message: "Agendar consulta veterinária",
  },
  {
    id: "7",
    type: "delayed",
    message: "Entrega do botijão de gás",
  },
  {
    id: "8",
    type: "approved",
    message: "Orçamento da reforma aprovado",
  },
  {
    id: "9",
    type: "to do",
    message: "Trocar filtro de água",
  },
  {
    id: "10",
    type: "delayed",
    message: "Pagamento do condomínio pendente",
  },
  {
    id: "11",
    type: "approved",
    message: "Seguro residencial renovado",
  },
];

export default function Header() {
  return (
    <>
      <header className="p-4 h-16 items-center bg-card text-black shadow-lg sticky top-0 z-50 flex justify-between">
        <div>
          <div className="flex items-center space-x-2 h-8">
            <Select>
              <SelectTrigger size="sm" className="w-45 h-12 pl-2 font-semibold">
                <SelectValue placeholder="Home" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">
                  <Home className="mr-2 inline-block font-semibold" />
                  Home
                </SelectItem>
                <SelectItem value="home 2">
                  <Home className="mr-2 inline-block font-semibold" />
                  Home 2
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-muted-foreground">
            {
              notificationsMock.filter(
                (notification) => notification.type === "to do",
              ).length
            }{" "}
            tarefas pendentes hoje
          </p>
        </div>
        <div className="flex space-x-4 justify-center items-center">
          <Notification notifications={notificationsMock} />
          <ModeToggle />
          <UserAvatar
            user={{
              email: "danielsmith30@gmail.com",
              id: "1",
              name: "Daniel Fürst",
              avatarUrl: "",
            }}
            fallback="NT"
          />
        </div>
      </header>
    </>
  );
}
