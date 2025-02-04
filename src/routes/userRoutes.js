import { Router } from "express";
import {
  loginUser,
  getUser,
  updateUser,
  addLightCone,
  updateLightCone,
  addRelic,
  updateRelic,
  removeRelic,
  updateCharacterProgress,
  saveTeam,
  getTeams,
  deleteTeam,
} from "../controllers/userController.js";

const router = Router();

// Route pour la connexion de l'utilisateur
router.post("/login", loginUser);

// Route pour récupérer les données de l'utilisateur
router.get("/:uid", getUser);

// Route pour mettre à jour les données de l'utilisateur
router.put("/:uid", updateUser);

// Route pour ajouter un cône de lumière à un personnage spécifique
router.post("/:uid/characters/:characterId/light-cones", addLightCone);

// Route pour mettre à jour un cône de lumière d'un personnage spécifique
router.put(
  "/:uid/characters/:characterId/light-cones/:lightConeId",
  updateLightCone
);

// Route pour ajouter une relique à un personnage spécifique
router.post("/:uid/characters/:characterId/relics", addRelic);

// Route pour mettre à jour une relique d'un personnage spécifique
router.put("/:uid/characters/:characterId/relics/:relicId", updateRelic);

// Route pour supprimer une relique d'un personnage spécifique
router.delete("/:uid/characters/:characterId/relics/:relicId", removeRelic);

// Route pour mettre à jour la progression d'un personnage spécifique
router.put("/:uid/characters/:characterId/progress", updateCharacterProgress);

// Route pour sauvegarder une équipe
router.post("/:uid/teams", saveTeam);

// Route pour récupérer les équipes d'un utilisateur
router.get("/:uid/teams", getTeams);

// Route pour supprimer une équipe
router.delete("/:uid/teams/:teamId", deleteTeam);

export default router;
