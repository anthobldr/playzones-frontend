# PlayZones — Frontend

Interface web de **PlayZones**, une plateforme de jeux de société en ligne.
Application monopage en React, conçue en *mobile-first*.

API associée : [playzones-api](https://github.com/anthobldr/playzones-api)

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| React | 19 | Bibliothèque d'interface |
| TypeScript | 6 | Typage statique |
| Vite | 8 | Serveur de développement et build |
| React Router | 7 | Navigation côté client |
| Bootstrap | 5.3 | Grille responsive et composants |
| Vitest | 5 | Tests unitaires |

## Prérequis

- [Node.js](https://nodejs.org/) 22 ou plus, et npm
- L'[API PlayZones](https://github.com/anthobldr/playzones-api) lancée sur `http://localhost:8000`

## Installation

```bash
git clone https://github.com/anthobldr/playzones-frontend.git
cd playzones-frontend
npm ci
cp .env.example .env.local
```

| Variable | Description | Exemple |
|---|---|---|
| `VITE_API_URL` | URL de l'API | `http://localhost:8000` |

> Les variables `VITE_*` sont incluses dans le JavaScript envoyé au navigateur :
> **elles ne doivent jamais contenir de secret.**

## Lancer l'application

```bash
npm run dev
```

Ouvre **`http://localhost:5173`** (et non `127.0.0.1`) : le cookie de session de l'API n'est transmis que si le front et l'API sont sur le même site.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérification TypeScript, puis build de production dans `dist/` |
| `npm run preview` | Prévisualisation du build de production |
| `npm run lint` | Analyse du code avec ESLint |
| `npm test` | Lance les tests une fois |
| `npm run test:watch` | Relance les tests à chaque modification |

## Architecture

```
src/
├── components/   Composants réutilisables (Navbar, Footer, Hero…)
├── context/      Contexte d'authentification
├── data/         Données statiques (liens de navigation, jeux)
├── hooks/        Hooks personnalisés (useAuth)
├── pages/        Pages de l'application (auth, home, dashboard)
├── providers/    AuthProvider : charge l'utilisateur connecté au démarrage
├── router/       Routes et ProtectedRoute
├── services/     Appels à l'API (api.ts centralise fetch)
├── types/        Types TypeScript partagés
└── utils/        Fonctions utilitaires (validation du mot de passe)
```

## Authentification

1. L'API ouvre une **session** et renvoie un cookie HttpOnly. Le front ne stocke aucun jeton.
2. Au démarrage, `AuthProvider` appelle `GET /auth/me` pour savoir si l'utilisateur est connecté.
3. `ProtectedRoute` redirige vers `/auth/login` les visiteurs non connectés sur les pages `/account/*`.

> `ProtectedRoute` améliore l'expérience utilisateur, mais la **vraie protection** est côté API :
> toute requête non authentifiée y est refusée (401).

## Déploiement

Voir le [guide de déploiement](https://github.com/anthobldr/playzones-api/blob/main/DEPLOIEMENT.md).