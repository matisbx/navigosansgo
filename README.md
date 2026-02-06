# NavigoSansGo 🚇

## 📚 Projet d'étude

Ce projet est un **projet d'étude** réalisé dans le but d'apprendre et de comprendre :

- La création et l'utilisation d'**APIs** avec Next.js
- Le fonctionnement du framework **Next.js** et son architecture App Router
- L'intégration de données externes via des routes API

## 🎯 Objectifs pédagogiques

- Comprendre le système de routage de Next.js (App Router)
- Apprendre à créer des routes API (`/api/access`, `/api/setram`)
- Manipuler des données et les exposer via des endpoints REST
- Découvrir les bonnes pratiques de développement avec React et TypeScript

## 🛠️ Technologies utilisées

- **Next.js 16** - Framework React pour le développement web
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique pour JavaScript
- **ESLint** - Linting du code

## 📁 Structure du projet

```
app/
├── api/
│   ├── access/      # Route API pour les accès
│   └── setram/      # Route API pour Setram
├── docs/            # Page de documentation
├── layout.tsx       # Layout principal
└── page.tsx         # Page d'accueil
```

## 🚀 Démarrage

### Installation des dépendances

```bash
npm install
```

### Configuration

Créez un fichier `.env.local` à la racine du projet :

```bash
cp .env.example .env.local
```

Puis modifiez les valeurs selon votre configuration.

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📖 Ressources utiles

- [Documentation Next.js](https://nextjs.org/docs) - Documentation officielle
- [Learn Next.js](https://nextjs.org/learn) - Tutoriel interactif
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Création d'APIs

---

> ⚠️ **Note** : Ce projet est à but éducatif uniquement.
