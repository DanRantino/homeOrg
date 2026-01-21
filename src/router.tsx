import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { getServerAuthSnapshot } from "./lib/auth.ssr";

// Create a new router instance
export const getRouter = (request?: Request) => {
  const router = createRouter({
    routeTree,
    context: {
      auth: null,
    },

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
