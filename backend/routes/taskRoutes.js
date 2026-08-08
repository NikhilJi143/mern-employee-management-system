import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { addTask, getTasks, deleteTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, addTask);

router.get("/", authMiddleware, getTasks);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

export default router;
