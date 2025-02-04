import { Router } from "express";
import {
  getCharacters,
  getCharacterById,
} from "../controllers/charactersController.js";

const router = Router();

// Route pour obtenir la liste des personnages
router.get("/", getCharacters);

// Route pour obtenir un personnage par ID
router.get("/:id", getCharacterById);

export default router;
