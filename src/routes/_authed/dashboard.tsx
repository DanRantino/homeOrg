import MetricCards from "@/components/MetricCards";
import PageStructure from "@/components/PageStructure";
import {
  createFileRoute,
  linkOptions,
  type LinkProps,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({ component: App });

const arrCards: { 
  amount: number;
  title: string;
  to: LinkProps;
}[] = [
  {
    amount: 4,
    title: "Hoje",
    to: linkOptions({
      to: "/tasks",
      search: {
        status: "today",
      },
    }),
  },
  {
    amount: 2,
    title: "Atrasadas",
    to: linkOptions({
      to: "/tasks",
      search: {
        status: "delayed",
      },
    }),
  },
  {
    amount: 8,
    title: "Pendentes",
    to: linkOptions({
      to: "/tasks",
      search: {
        status: "pending",
      },
    }),
  },
  {
    amount: 6,
    title: "Concluídas",
    to: linkOptions({
      to: "/tasks",
      search: {
        status: "done",
      },
    }),
  },
];

function App() {
  return (
    <PageStructure title="Dashboard" description="Visão geral da casa hoje.">
      {arrCards.map((opt) => (
        <MetricCards
          key={opt.title}
          amount={opt.amount}
          title={opt.title}
          to={opt.to}
        />
      ))}
    </PageStructure>
  );
}
