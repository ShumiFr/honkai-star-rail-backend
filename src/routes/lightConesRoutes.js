import { Router } from "express";
import {
  getAllLightCones,
  getAllRelics,
} from "../controllers/charactersController.js";

const router = Router();

// Route pour obtenir tous les cônes de lumière
router.get("/", getAllLightCones);
router.get("/relics", getAllRelics);

export default router;
