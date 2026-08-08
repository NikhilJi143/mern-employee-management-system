import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { dashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", authMiddleware, dashboardStats);

export default router;
