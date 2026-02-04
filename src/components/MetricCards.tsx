import { Link, type LinkProps } from "@tanstack/react-router";
import { BadgeAlert } from "lucide-react";

type MetricCardsProps = {
  title: string;
  amount: number;
  to: LinkProps;
};

const MetricCards = ({ amount, title, to }: MetricCardsProps) => {
  return (
    <Link {...to}>
      <div className="bg-card rounded-xl border flex p-6 items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className=" text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold">{amount}</p>
        </div>
        <div className="p-3 bg-primary/20 rounded-lg text-primary">
          <BadgeAlert size={30} />
        </div>
      </div>
    </Link>
  );
};

export default MetricCards;
