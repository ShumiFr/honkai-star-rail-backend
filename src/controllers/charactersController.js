import { StarRail } from "starrail.js";
import User from "../models/userModel.js";

const client = new StarRail();

const cleanDescription = (description) => {
  let cleanedDescription = description
    .replace(/<[^>]*>/g, "")
    .replace(/#\d+\[i\]/g, "10"); // Remplacer les balises HTML et les placeholders

  // Ajouter des balises <span> autour des valeurs en pourcentage et numériques
  cleanedDescription = cleanedDescription.replace(
    /(\d+%)/g,
    '<span class="value">$1</span>'
  );

  // Ajouter des balises <span> autour des termes spécifiques
  const terms = {
    "DGT quantiques": "quantum-damage",
    quantique: "quantum",
    quantiques: "quantum",
    "cumul de mérite": "quantum",
    "chances de coup critique": "crit-chance",
    "DGT imaginaires": "imaginary-damage",
    imaginaire: "imaginary",
    imaginaires: "imaginary",
    "DGT de feu": "fire-damage",
    feu: "fire",
    "DGT critiques": "crit-damage",
    "faiblesse au feu": "fire-weakness",
    ignore: "ignore",
    "de la DÉF de la cible": "def-target",
    "supplémentaires de la DÉF": "def-extra",
    "effet de rupture": "break-effect",
    "DGT de rupture": "break-damage",
    rupture: "break",
    "DGT de rupture extrême": "extreme-break-damage",
    "DGT de glace": "ice-damage",
    glace: "ice",
    "DGT de foudre": "lightning-damage",
    foudre: "lightning",
    "DGT de vent": "wind-damage",
    vent: "wind",
    "soins prodigués": "healing",
  };

  for (const [term, className] of Object.entries(terms)) {
    const regex = new RegExp(`(${term})`, "gi");
    cleanedDescription = cleanedDescription.replace(
      regex,
      `<span class="${className}">$1</span>`
    );
  }

  return cleanedDescription;
};

const rolesByPath = {
  "L'Abondance": "Support",
  "La Destruction": "DPS Principal",
  "L'Érudition": "DPS Principal",
  "L'Harmonie": "Soutien",
  "La Chasse": "DPS Principal",
  "La Nihilité": "Soutien",
  "La Préservation": "Support",
  "Le Souvenir": "Soutien",
};

const exceptions = {
  Herta: "DPS Secondaire",
  Jade: "DPS Secondaire",
  Serval: "DPS Secondaire",
  Moze: "DPS Secondaire",
  "Topaz et Compti": "DPS Secondaire",
  Achéron: "DPS Principal",
  "Cygne noir": "DPS Secondaire",
  Kafka: "DPS Principal",
  Luka: "DPS Principal",
  Sampo: "DPS Secondaire",
  Welt: "DPS Secondaire",
  Aglaé: "DPS Principal",
  "March 7th": {
    "La Chasse": "DPS Secondaire",
    "La Préservation": "Support",
  },
};

const getRole = (character) => {
  const characterName = character.name?.get("fr");
  const characterPath = character.path.name.get("fr");

  if (exceptions[characterName]) {
    if (typeof exceptions[characterName] === "string") {
      return exceptions[characterName];
    }
    return exceptions[characterName][characterPath] || "DPS Principal";
  }
  return rolesByPath[characterPath] || "DPS Principal";
};

export const getCharacters = async (req, res) => {
  try {
    const characters = await client.getAllCharacters();
    const users = await User.find(); // Récupérer tous les utilisateurs pour obtenir les données de progression des personnages

    const simplifiedCharacters = characters.map((character) => {
      // Trouver les données de progression pour ce personnage
      const characterProgress = users
        .flatMap((user) => user.characterProgress)
        .find((progress) => progress.characterId === character.id);

      return {
        id: character.id,
        name:
          character.name?.get("fr") === "{NICKNAME}"
            ? "Pionnier"
            : character.name?.get("fr") || "Nom indisponible",
        description:
          character.description?.get("fr") || "Description indisponible",
        shopItemIcon: character.shopItemIcon?.url || "",
        icon: character.icon?.url || "",
        splashImage: character.splashImage?.url || "",
        stars: character.stars,
        combatType: {
          id: character.combatType.id,
          name: character.combatType.name?.get("fr") || "Nom indisponible",
          icon: character.combatType.icon?.url || "",
        },
        path: {
          id: character.path.id,
          name: character.path.name?.get("fr") || "Nom indisponible",
          icon: character.path.icon?.url || "",
          smallIcon: character.path.smallIcon?.url || "",
        },
        skills:
          character.skills?.map((skill) => ({
            id: skill.id,
            name: skill.name?.get("fr") || "Nom indisponible",
            description:
              skill.description?.get("fr") || "Description indisponible",
          })) || [],
        role: getRole(character),
        obtained: characterProgress ? characterProgress.obtained : false, // Ajout du champ "obtenu"
      };
    });
    res.status(200).json(simplifiedCharacters);
  } catch (error) {
    console.error("Erreur lors de la récupération des personnages:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des personnages" });
  }
};

export const getCharacterById = async (req, res) => {
  try {
    const characters = await client.getAllCharacters();
    const users = await User.find(); // Récupérer tous les utilisateurs pour obtenir les données de progression des personnages

    const character = characters.find(
      (char) => char.id === parseInt(req.params.id)
    );
    if (!character) {
      return res.status(404).json({ message: "Personnage non trouvé" });
    }

    // Trouver les données de progression pour ce personnage
    const characterProgress = users
      .flatMap((user) => user.characterProgress)
      .find((progress) => progress.characterId === character.id);

    const simplifiedCharacter = {
      id: character.id,
      name:
        character.name?.get("fr") === "{NICKNAME}"
          ? "Pionnier"
          : character.name?.get("fr") || "Nom indisponible",
      description:
        character.description?.get("fr") || "Description indisponible",
      shopItemIcon: character.shopItemIcon?.url || "",
      icon: character.icon?.url || "",
      splashImage: character.splashImage?.url || "",
      stars: character.stars,
      combatType: {
        id: character.combatType.id,
        name: character.combatType.name?.get("fr") || "Nom indisponible",
        icon: character.combatType.icon?.url || "",
      },
      path: {
        id: character.path.id,
        name: character.path.name?.get("fr") || "Nom indisponible",
        icon: character.path.icon?.url || "",
        smallIcon: character.path.smallIcon?.url || "",
      },
      skills:
        character.skills?.map((skill) => ({
          id: skill.id,
          name: skill.name?.get("fr") || "Nom indisponible",
          description:
            skill.description?.get("fr") || "Description indisponible",
        })) || [],
      role: getRole(character), // Ajout du rôle
      obtained: characterProgress ? characterProgress.obtained : false, // Ajout du champ "obtenu"
    };
    res.status(200).json(simplifiedCharacter);
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du personnage" });
  }
};

const formatEffect = (description, paramsList) => {
  let formattedDescription = description;
  const paramValues = paramsList[0].map((_, index) => {
    return paramsList.map((params) => params[index]);
  });

  paramValues.forEach((values, index) => {
    const regex = new RegExp(`#${index + 1}\\[i\\]`, "g");
    const isPercentage = values.some((value) => value < 1);
    const formattedValues = values.every((value) => value === values[0])
      ? isPercentage
        ? `<span style="color: rgb(255, 200, 112);">${(values[0] * 100).toFixed(
            0
          )}%</span>`
        : `<span style="color: rgb(255, 200, 112);">${values[0]}</span>`
      : values
          .map((value) =>
            isPercentage
              ? `<span style="color: rgb(255, 200, 112);">${(
                  value * 100
                ).toFixed(0)}%</span>`
              : `<span style="color: rgb(255, 200, 112);">${value}</span>`
          )
          .join("/");
    formattedDescription = formattedDescription.replace(regex, formattedValues);
  });

  formattedDescription = formattedDescription.replace(
    /<color=.*?>|<\/color>|<unbreak>|<\/unbreak>/g,
    ""
  );
  return formattedDescription;
};

export const getAllLightCones = async (req, res) => {
  try {
    const lightCones = await client.getAllLightCones();
    const simplifiedLightCones = lightCones.map((lightCone) => {
      const effectDescription =
        lightCone.superimpositions[0]?.description?.get("fr") ||
        "Effet indisponible";
      const paramsList = lightCone.superimpositions.map((s) => s.paramList);
      const effect = formatEffect(effectDescription, paramsList);
      return {
        id: lightCone.id,
        name: lightCone.name?.get("fr") || "Nom indisponible",
        effect: effect,
        icon: lightCone.icon?.url || "",
        path: {
          id: lightCone.path.id,
          name: lightCone.path.name?.get("fr") || "Nom indisponible",
        },
      };
    });
    res.status(200).json(simplifiedLightCones);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des cônes de lumière:",
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des cônes de lumière" });
  }
};

export const getAllRelics = async (req, res) => {
  try {
    const relics = await client.getAllRelics();
    const relicSets = {};

    relics.forEach((relic) => {
      const setId = relic.set.id;
      if (!relicSets[setId]) {
        relicSets[setId] = {
          id: relic.set.id,
          name: relic.set.name?.get("fr") || "Nom indisponible",
          icon: relic.set.icon?.url || "",
          setBonus: relic.set.setBonus.map((bonus) => ({
            needCount: bonus.needCount,
            description: cleanDescription(
              bonus.description?.get("fr") || "Description indisponible"
            ),
          })),
        };
      }
    });

    const simplifiedRelicSets = Object.values(relicSets);
    res.status(200).json(simplifiedRelicSets);
  } catch (error) {
    console.error("Erreur lors de la récupération des reliques:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des reliques" });
  }
};
