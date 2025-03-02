import { Router } from "express";
import authRoutes from "./auth-routes";
import apiRoutes from "./api/index";
import { authenticateToken } from "../middleware/auth";

const router = Router();

app.use("/api", apiRoutes

router.use("/auth", authRoutes);
router.use("/api", authenticateToken, apiRoutes);

export default router;
