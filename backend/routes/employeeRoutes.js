import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  getEmployeesPagination,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", authMiddleware, addEmployee);

router.get("/", authMiddleware, getEmployees);

router.put("/:id", authMiddleware, updateEmployee);

router.delete("/:id", authMiddleware, deleteEmployee);

router.get("/search", authMiddleware, searchEmployee);

router.get("/pagination", authMiddleware, getEmployeesPagination);

export default router;
