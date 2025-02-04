# Documentation du Backend

Ce projet est une application backend pour gérer les utilisateurs et leurs personnages dans le jeu Honkai Star Rail. Il utilise Node.js avec le framework Express pour créer une API RESTful.

## Structure du Projet

- **src/**: Contient le code source de l'application.
  - **controllers/**: Contient la logique métier pour gérer les utilisateurs.
    - `userController.js`: Gère les opérations liées aux utilisateurs.
  - **models/**: Définit les modèles de données.
    - `userModel.js`: Modèle de données pour les utilisateurs.
  - **routes/**: Configure les routes de l'application.
    - `userRoutes.js`: Routes pour les opérations liées aux utilisateurs.
  - `app.js`: Point d'entrée de l'application, configure le serveur et les routes.

## Installation

1. Clonez le dépôt:
   ```
   git clone <URL_DU_DEPOT>
   ```

2. Accédez au dossier backend:
   ```
   cd honkai-star-rail-app/backend
   ```

3. Installez les dépendances:
   ```
   npm install
   ```

## Exécution

Pour démarrer le serveur, utilisez la commande suivante:
```
npm start
```

Le serveur sera accessible à l'adresse `http://localhost:3000`.

## API

### Routes Utilisateur

- `POST /login`: Connexion d'un utilisateur avec son UID.
- `GET /user`: Récupérer les données d'un utilisateur.
- `PUT /user`: Mettre à jour les données d'un utilisateur.

## Contribuer

Les contributions sont les bienvenues! Veuillez soumettre une demande de tirage pour toute amélioration ou correction.

## License

Ce projet est sous licence MIT.