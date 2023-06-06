import express from "express";
import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTasks);

// Always Keep the Dynamic route in the last
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
