```markdown
# 🌱 ECO-fit — Backend API

Bienvenue dans le backend de **ECO-fit**, une application mobile qui récompense les utilisateurs pour leurs activités physiques écoresponsables.  
Ce backend gère l’authentification, les activités, les éco-points, les défis, les récompenses et le profil utilisateur.

---

## 🔧 Technologies utilisées

- **Node.js** / **Express.js**
- **SQLite** (base de données locale légère)
- **JWT** pour l’authentification
- **bcrypt** pour le hachage des mots de passe
- **CORS** / **dotenv**

---

## 📁 Structure du projet

```

src/
│
├── controllers/          # Logique métier (user, activity, challenge, reward, profile)
├── models/               # Fonctions SQL vers SQLite
├── routes/               # Définition des routes Express
├── middlewares/          # Authentification JWT
├── config/               # Connexion à la base SQLite
└── server.js             # Point d’entrée principal

````

---

## 🚀 Lancer le projet en local

### 1. Installer les dépendances

```bash
npm install
````

### 2. Créer un fichier `.env` à la racine

```
JWT_SECRET=super_secret_key
```

### 3. Lancer le serveur

```bash
npm run dev
```

L’API sera accessible sur `http://localhost:5000`

---

## 🔐 Authentification

* `POST /api/users/register` — Crée un compte
* `POST /api/users/login` — Connexion + JWT

> Toutes les routes protégées nécessitent un header :

```
Authorization: Bearer <token>
```

---

## 📍 Routes principales

### 👤 Utilisateurs

* `POST /api/users/register`
* `POST /api/users/login`
* `GET /api/points` — Récupérer les éco-points de l’utilisateur connecté
* `POST /api/points/decrement` — Soustraire des points après un achat

### 🏃 Activités

* `POST /api/activities` — Ajouter une activité (course ou défi)
* `GET /api/activities` — Voir les activités de l’utilisateur

### 🏆 Récompenses & Défis

* `GET /api/rewards`
* `GET /api/challenges`

### 👤 Profil utilisateur

* `GET /api/profile`
* `POST /api/profile` — Mettre à jour nom, âge, taille, poids

---

## 🧪 Développement & fonctionnement

* Le backend est conçu pour communiquer avec une app mobile React Native.
* Les activités ajoutées automatiquement ou manuellement génèrent des points.
* Les points sont mis à jour dynamiquement dans la base de données.
* Le contexte global `PointsContext` côté mobile permet de synchroniser les points en temps réel.

---

## ✅ Améliorations futures

* Système avancé de badges
* Interface d’administration
* API publique de leaderboard
* Notifications server-to-client

---


© 2025 ECO-fit — Tous droits réservés.

