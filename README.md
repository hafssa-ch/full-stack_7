
# 📚 API RESTful de Gestion de Bibliothèque

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Swagger](https://img.shields.io/badge/Swagger-UI-orange)](https://swagger.io/)

---

## 🎯 Objectif du projet

Ce projet est une **API RESTful complète** pour la gestion d'une bibliothèque.  
Il a été réalisé dans le cadre d’un TP de **développement web full-stack avec JavaScript**.

## Fonctionnalités principales

- Gestion des **auteurs**, **livres**, **emprunts** et **utilisateurs**
- Authentification JWT avec rôles (`utilisateur`, `bibliothecaire`, `admin`)
- Validation des données avec **Joi**
- Documentation interactive **Swagger / OpenAPI**
- Pagination, tri et filtrage sur les endpoints de liste
- Tests unitaires avec **Jest** & **Supertest**
- Conteneurisation **MongoDB** avec Docker

---

## 🧱 Stack technique

| Couche | Technologie(s) |
|---|---|
| Backend | Node.js, Express, TypeScript |
| Base de données | MongoDB (via Mongoose ODM) |
| Authentification | JSON Web Token (JWT), bcryptjs |
| Validation | Joi |
| Documentation | Swagger UI + OpenAPI 3.0 |
| Tests | Jest, Supertest |
| Conteneurisation | Docker (MongoDB) |

---

## 🚀 Installation et lancement

### 1. Prérequis

- **Node.js** (version 14 ou ultérieure)
- **npm** ou **yarn**
- **MongoDB** (local ou conteneur Docker)
- **Docker** (optionnel mais recommandé)

---

### 2. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/bibliotheque-api.git
cd bibliotheque-api
````

---

### 3. Installer les dépendances

```bash
npm install
```

---

### 4. Configurer les variables d’environnement

Créez un fichier `.env` à la racine en vous inspirant de `.env.example` :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bibliotheque
NODE_ENV=development
JWT_SECRET=votre_secret_jwt_tres_long_et_securise
```

---

### 5. Démarrer MongoDB avec Docker (recommandé)

```bash
docker run -d --name mongodb-bibliotheque -p 27017:27017 -e MONGO_INITDB_DATABASE=bibliotheque mongo:latest
```

---

### 6. Lancer l’application

#### Mode développement

```bash
npm run dev
```

#### Mode production

```bash
npm run build
npm start
```

L’API sera disponible sur :

```txt
http://localhost:3000
```

---

## 📖 Documentation interactive – Swagger UI

Accédez à la documentation complète et testez les endpoints directement depuis votre navigateur :

```txt
http://localhost:3000/api-docs
```

<img width="955" height="502" alt="image" src="https://github.com/user-attachments/assets/c0483880-92e0-4ab0-825a-4a9a89cd8896" />

<img width="956" height="474" alt="image" src="https://github.com/user-attachments/assets/c6d960ea-241c-447c-835a-10eec99498fa" />

<img width="955" height="476" alt="image" src="https://github.com/user-attachments/assets/e0cdd055-247c-403e-b398-0b452ed1bcc5" />


---

## 🔐 Authentification et autorisation

L’API utilise **JWT (JSON Web Token)**.

Pour accéder aux routes protégées (`POST`, `PUT`, `DELETE`…), vous devez :

1. Créer un utilisateur
2. Vous connecter pour obtenir un token JWT
3. Ajouter le token dans l’en-tête :

```http
Authorization: Bearer <votre_token>
```

Dans Swagger :

* Cliquez sur le bouton **Authorize**
* Collez le token 

<img width="947" height="472" alt="image" src="https://github.com/user-attachments/assets/3cf92408-a0c8-4329-9762-3e03f7ab09fb" />


---

## 🧪 Exemples de requêtes (curl)

### 🔹 Créer un utilisateur (admin)

```bash
curl -X POST http://localhost:3000/api/v1/utilisateurs/register \
  -H "Content-Type: application/json" \
  -d '{"nom":"Dupont","prenom":"Jean","email":"jean@example.com","password":"123456","role":"admin"}'
```

#### Réponse attendue

```json
{
  "success": true,
  "data": {
    "_id": "69ff146d31935db091829923",
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@example.com",
    "role": "admin"
  }
}
```

<img width="952" height="497" alt="enregistrer_utilisateur" src="https://github.com/user-attachments/assets/f19130b5-651c-450c-b3e7-e087b9b3fcd8" />


---

### 🔹 Connexion et récupération du token

```bash
curl -X POST http://localhost:3000/api/v1/utilisateurs/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jean@example.com","password":"123456"}'
```

#### Réponse attendue

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@example.com"
  }
}
```
<img width="954" height="492" alt="seconnecter" src="https://github.com/user-attachments/assets/24fbe497-a470-4d6b-957f-4ddf1b604638" />

---

### 🔹 Créer un auteur (route protégée)

```bash
curl -X POST http://localhost:3000/api/v1/auteurs \
  -H "Authorization: Bearer <votre_token>" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Hugo","prenom":"Victor","dateNaissance":"1802-02-26"}'
```
<img width="953" height="499" alt="cree_auteur" src="https://github.com/user-attachments/assets/5d0f4e6f-fe3c-4efe-9b97-fba908c9b0fc" />


---

### 🔹 Lister les auteurs (public)

```bash
curl -X GET "http://localhost:3000/api/v1/auteurs?page=1&limit=5&sort=-createdAt"
```

#### Réponse paginée

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalPages": 2,
    "totalItems": 8
  }
}
```

<img width="947" height="442" alt="lister_les_auteurs" src="https://github.com/user-attachments/assets/072bc3d5-93de-4491-bbf7-54f321a2597b" />

---

## 📂 Structure du projet

```txt
bibliotheque-api/
├── src/
│   ├── config/            # Connexion à MongoDB
│   ├── models/            # Modèles Mongoose
│   ├── validations/       # Schémas Joi
│   ├── middlewares/       # Authentification, validation, erreurs
│   ├── services/          # Logique métier
│   ├── controllers/       # Gestion requêtes/réponses
│   ├── routes/v1/         # Routes versionnées
│   ├── utils/             # Swagger, utilitaires
│   ├── app.ts             # Configuration Express
│   └── server.ts          # Point d’entrée
├── __tests__/             # Tests unitaires
├── .env.example
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

---


## 📌 Liste des endpoints principaux

| Méthode | Endpoint                        | Description             | Accès                 |
| ------- | ------------------------------- | ----------------------- | --------------------- |
| POST    | `/api/v1/utilisateurs/register` | Inscription utilisateur | Public                |
| POST    | `/api/v1/utilisateurs/login`    | Connexion utilisateur   | Public                |
| GET     | `/api/v1/utilisateurs`          | Liste utilisateurs      | Admin                 |
| GET     | `/api/v1/utilisateurs/:id`      | Détails utilisateur     | Authentifié           |
| PUT     | `/api/v1/utilisateurs/:id`      | Modifier utilisateur    | Authentifié           |
| DELETE  | `/api/v1/utilisateurs/:id`      | Supprimer utilisateur   | Admin                 |
| GET     | `/api/v1/auteurs`               | Liste auteurs           | Public                |
| POST    | `/api/v1/auteurs`               | Ajouter auteur          | Bibliothécaire, Admin |
| GET     | `/api/v1/auteurs/:id`           | Détails auteur          | Public                |
| PUT     | `/api/v1/auteurs/:id`           | Modifier auteur         | Bibliothécaire, Admin |
| DELETE  | `/api/v1/auteurs/:id`           | Supprimer auteur        | Admin                 |
| GET     | `/api/v1/livres`                | Liste livres            | Public                |
| POST    | `/api/v1/livres`                | Ajouter livre           | Bibliothécaire, Admin |
| GET     | `/api/v1/livres/:id`            | Détails livre           | Public                |
| PUT     | `/api/v1/livres/:id`            | Modifier livre          | Bibliothécaire, Admin |
| DELETE  | `/api/v1/livres/:id`            | Supprimer livre         | Admin                 |
| GET     | `/api/v1/emprunts`              | Liste emprunts          | Bibliothécaire, Admin |
| POST    | `/api/v1/emprunts`              | Créer emprunt           | Authentifié           |
| GET     | `/api/v1/emprunts/:id`          | Détails emprunt         | Authentifié           |
| PUT     | `/api/v1/emprunts/:id`          | Retour livre            | Authentifié           |

---

## 🐳 Utilisation avec Docker Compose

Un fichier `docker-compose.yml` est fourni pour lancer MongoDB et l’API ensemble.

```bash
docker-compose up -d
```

Services disponibles :

* API → `http://localhost:3000`
* MongoDB → `mongodb://localhost:27017`

---


## ✨ Auteurs

Projet réalisé par:
Hafssa CHKOUKED

Encadré par :
Pr.lachgar

 dans le cadre du cours :
  Développement web full-stack avec JavaScript
  
---








---

## 🎉 Conclusion

Cette API RESTful fournit une architecture moderne et sécurisée pour la gestion d’une bibliothèque avec :

* Authentification JWT
* Validation des données
* Documentation Swagger
* Tests automatisés
* Architecture modulaire TypeScript

Pour toute question, consultez la documentation Swagger ou ouvrez une issue sur le dépôt GitHub.


