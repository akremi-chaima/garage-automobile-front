# GarageAutomobileFront

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Installation

Installer node v21.5.0 https://nodejs.org/en/download/current

Installer angular https://angular.io/guide/setup-local
![ScreenShot](/Users/chayma/Desktop/Projets/garage-automobile-front/readme/angular_version.png)

## Comment lancer le projet en local
Exécuter `npm install --force` dans le dossier projet à la racine pour installer les librairies

Si le projet API est installé en local, dans le fichier `src/environment.ts` on doit avoir l'url vers l'API `http://0.0.0.0:8080/`

Si le projet API n'est installé pas en local, on peut utiliser les APIs sur le serveur en utilisant l'url vers l'API `https://garage-automobile-api.chaimaakremi.com/` dans le fichier `src/environment.ts`

Exécuter `ng serve` pour lancer le serveur dev

Ouvrir le navigateur `http://localhost:4200/`

## Architecture projet
![ScreenShot](/Users/chayma/Desktop/Projets/garage-automobile-front/readme/architecture.png)

- Le dossier `src/environments` contient les fichiers des variables d'environnement
- Le dossier `src/assets/fonts` contient les fonts
- Le dossier `src/assets/images` contient les images
- Le dossier `src/app/administration` contient les composants pour l'administration du site
- Le dossier `src/app/api-services` contient les fichiers services pour appeler les APIs
- Le dossier `src/app/common` contient les composants communs entre la partie administration et la partie visiteur
- Le dossier `src/app/models` contient les interfaces pour faire le mapping avec les réponses et les requests des APIs
- Le dossier `src/app/visitor` contient les composants pour la partie visiteur
- Le fichier `src/app/routes.ts` contient les routes du site
- Le fichier `src/app/consts.helper.ts` contient les contantes du projet comme les patternes de validation des champs, les messages d'erreurs ...

## Pour générer un nouveau composant

Exécuter `ng generate component component-name`

## Build

Exécuter `ng build`. Le build sera dans le dossier `dist/`
