import authRouter from "@/modules/auth/auth.routes";
import { Router } from "express";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: authRouter,
  },
];

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
