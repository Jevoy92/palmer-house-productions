import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectRequestsRouter from "./projectRequests";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectRequestsRouter);
router.use(authRouter);

export default router;
