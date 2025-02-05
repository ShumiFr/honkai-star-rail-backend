import { StarRail } from "starrail.js";
import User from "../models/userModel.js";

const client = new StarRail();

export async function loginUser(req, res) {
  const { uid } = req.body;

  try {
    const userData = await client.fetchUser(uid);
    const { nickname } = userData;

    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, nickname });
      await user.save();
    }

    res.status(200).json({ uid, nickname });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion de l'utilisateur" });
  }
}

export async function getUser(req, res) {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
}

export async function updateUser(req, res) {
  const { uid } = req.params;
  const userData = req.body;

  try {
    const user = await User.findOneAndUpdate({ uid }, userData, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
}

export async function addLightCone(req, res) {
  const { uid, characterId } = req.params;
  const lightConeData = req.body;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      let characterLightCones = user.characterLightCones.find(
        (clc) => clc.characterId === parseInt(characterId)
      );
      if (!characterLightCones) {
        characterLightCones = {
          characterId: parseInt(characterId),
          lightCones: [],
          relics: [],
        };
        user.characterLightCones.push(characterLightCones);
      }
      characterLightCones.lightCones.push(lightConeData);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du cône de lumière:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du cône de lumière" });
  }
}

export async function updateLightCone(req, res) {
  const { uid, characterId, lightConeId } = req.params;
  const lightConeData = req.body;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      const characterLightCones = user.characterLightCones.find(
        (clc) => clc.characterId === parseInt(characterId)
      );
      if (characterLightCones) {
        const lightCone = characterLightCones.lightCones.find(
          (lc) => lc.id === parseInt(lightConeId)
        );
        if (lightCone) {
          Object.assign(lightCone, lightConeData);
          await user.save();
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "Cône de lumière non trouvé" });
        }
      } else {
        res.status(404).json({ message: "Personnage non trouvé" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cône de lumière:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du cône de lumière" });
  }
}

export async function addRelic(req, res) {
  const { uid, characterId } = req.params;
  const relicData = req.body;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      let characterLightCones = user.characterLightCones.find(
        (clc) => clc.characterId === parseInt(characterId)
      );
      if (!characterLightCones) {
        characterLightCones = {
          characterId: parseInt(characterId),
          lightCones: [],
          relics: [],
        };
        user.characterLightCones.push(characterLightCones);
      }
      characterLightCones.relics.push(relicData);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la relique:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la relique" });
  }
}

export async function updateRelic(req, res) {
  const { uid, characterId, relicId } = req.params;
  const relicData = req.body;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      const characterLightCones = user.characterLightCones.find(
        (clc) => clc.characterId === parseInt(characterId)
      );
      if (characterLightCones) {
        const relic = characterLightCones.relics.find(
          (r) => r.id === parseInt(relicId)
        );
        if (relic) {
          Object.assign(relic, relicData);
          await user.save();
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "Relique non trouvée" });
        }
      } else {
        res.status(404).json({ message: "Personnage non trouvé" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la relique:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la relique" });
  }
}

export async function removeRelic(req, res) {
  const { uid, characterId, relicId } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      const characterLightCones = user.characterLightCones.find(
        (clc) => clc.characterId === parseInt(characterId)
      );
      if (characterLightCones) {
        characterLightCones.relics = characterLightCones.relics.filter(
          (r) => r.id !== parseInt(relicId)
        );
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Personnage non trouvé" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la relique:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la relique" });
  }
}

export async function updateCharacterProgress(req, res) {
  const { uid, characterId } = req.params;
  const progressData = req.body;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      let characterProgress = user.characterProgress.find(
        (cp) => cp.characterId === parseInt(characterId)
      );
      if (!characterProgress) {
        characterProgress = {
          characterId: parseInt(characterId),
          obtained: false,
          level80: false,
          tracesCompleted: false,
        };
        user.characterProgress.push(characterProgress);
      }
      Object.assign(characterProgress, progressData);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la progression" });
  }
}

export async function saveTeam(req, res) {
  const { uid } = req.params;
  const { name, characters } = req.body;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      const newTeam = {
        name,
        characters: characters.map((character) => ({
          name: character.name,
          icon: character.icon,
          role: character.role,
          level80: character.level80,
        })),
      };
      console.log("characters", characters);
      console.log("newTeam", newTeam);
      user.teams.push(newTeam);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'équipe:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la sauvegarde de l'équipe" });
  }
}

export const getTeams = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      res.status(200).json(user.teams);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des équipes pour l'utilisateur avec l'ID: ${uid}`,
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des équipes" });
  }
};

export async function deleteTeam(req, res) {
  const { uid, teamId } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (user) {
      user.teams = user.teams.filter((team) => team._id.toString() !== teamId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipe:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'équipe" });
  }
}
