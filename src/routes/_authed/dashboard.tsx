import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({ component: App });

function App() {
  return <div>Test</div>;
}
