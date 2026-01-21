import { Link, LinkProps } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type MetricCardsProps = {
  title: string;
  amount: number;
  to: LinkProps;
};

const MetricCards = ({ amount, title, to }: MetricCardsProps) => {
  return (
    <Link {...to}>
      <Card className="flex-1 min-w-45 max-w-62.5 hover:bg-accent-foreground/20">
        <CardHeader className="p-2">
          <CardTitle className="text-center text-sm">{title}</CardTitle>
        </CardHeader>

        <CardDescription className="text-3xl font-bold text-destructive text-center">
          {amount}
        </CardDescription>
      </Card>
    </Link>
  );
};

export default MetricCards;
