import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectRequestsRouter from "./projectRequests";
import authRouter from "./auth";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectRequestsRouter);
router.use(authRouter);
router.use(aiRouter);

export default router;
