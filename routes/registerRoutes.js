import express from "express";
import {
  createRegister,
  getAllRegisters,
  getRegisterById,
  redirectToQR,
} from "../controllers/registerController.js";

const router = express.Router();

/* Register */
router.post("/", createRegister);
router.get("/", getAllRegisters);

/*url redirect*/
router.get("/r/:regNum", redirectToQR);

/* Single */
router.get("/:id", getRegisterById);

export default router;
