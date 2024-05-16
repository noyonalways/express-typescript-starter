import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

router.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK✅");
});

export default router;
