import { createRouter } from "@tanstack/react-router";

import { appRoute } from "./routes/app";
import { composeRoute } from "./routes/compose";
import { discoveryRoute } from "./routes/discovery";
import { historyRoute } from "./routes/history";
import { indexRoute } from "./routes";
import { letterDetailRoute } from "./routes/letter-detail";
import { loginRoute } from "./routes/login";
import { openLettersRoute } from "./routes/open-letters";
import { profileRoute } from "./routes/profile";
import { rootRoute } from "./routes/root";
import { signupRoute } from "./routes/signup";

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  appRoute,
  composeRoute,
  discoveryRoute,
  historyRoute,
  letterDetailRoute,
  profileRoute,
  openLettersRoute
]);

export const router = createRouter({ routeTree });

