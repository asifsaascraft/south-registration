import express from "express";
import {
  createRegister,
  getAllRegisters,
  getRegisterById,
} from "../controllers/registerController.js";

const router = express.Router();

/* Register */
router.post("/", createRegister);
router.get("/", getAllRegisters);

/* Single */
router.get("/:id", getRegisterById);

export default router;
