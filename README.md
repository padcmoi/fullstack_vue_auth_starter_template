
## 📦 STARTER TEMPLATE SPA VUE.JS / API NODE.JS + MYSQL 📦

### *Ce projet a été réalisé dans le seul but d'apprendre à titre personnel*
Un template de base avec une authentification complète incluant Frontend et Backend

### 📝Frontend
Composants existant Vue.js:
✔️ Navbar
✔️ Home
❌ About
✔️ Login
✔️ Register
❌ LostPassword
❌ Dashboard
❌ Admin

L'application Vue.js contient:
- Un store ``Vuex`` pour la gestion des données
- Un service Api utilisant ``Axios`` pour la communication des données vers et de l'API Node.js
- ``Bootstrap`` pour l'accessibilité, et les components déjà réalisé
- une authentification avec un échange de jeton ``JsonWebToken``
- les formulaires seront soumis à un jeton CSRF personnalisés qui ne seront pas sauvegardés dans les Cookies afin d'éviter de contourner la sécurité CSRF par la faille XSS
- Tests unitaires ``Jest``

#### 🖱️ Démo
http://demo-vue-jest.naskot.fr/

credentiels:
- login: demo
- password: demo123


#### 💾 Installation
```
cd client && npm install
```

#### 🖥️ Usage
##### Compiles and hot-reloads for development
```
cd client && npm run serve
```

##### Compiles and minifies for production
```
cd client && npm run build
```

##### Run your unit tests
```
cd client && npm run test:unit
```

##### Run your end-to-end tests
```
cd client && npm run test:e2e
```

### 📝Backend
L'Api sera réalisé dans l'environnement Node.js, et utilisera ECMAScript 5
Parmi les fonctionnalités:
- Une architecture MVC
- l'App Node.js fonctionnera en multi-thread avec le paquetage ``cluster`` (par défaut 1 thread)
- ``JsonWebToken`` pour la génération des jetons et la gestion, la faille RefreshToken a été prise en compte
- ``BCrypt`` pour l'encryptage des mots de passe
- ``MySQL`` pour avoir une base de données relationnelle plutot que noSQl
- ``Csurf`` afin d'utiliser uniquement la génération de jetons
- Plusieurs Middleware personnalisé pour gérer le tout, et y ajouter une couche de sécurité personnalisé
- Tests unitaires ``Jest``

C’est un projet libre, dans le but simplement d'apprendre, l'objectif principal de ce projet est la maîtrise des tests unitaires avec ``Jest``


## 🔖 Licence
Ce travail est sous licence [MIT](/LICENSE.md).


## Si vous souhaitez rejoindre le discord du projet
🟨 [DISCORD du projet](https://discord.gg/257rUb9)


## 🍺 Si vous souhaitez m’offrir une bière
😍 [PAYPAL](https://www.paypal.com/paypalme/Julien06100?locale.x=fr_FR)
