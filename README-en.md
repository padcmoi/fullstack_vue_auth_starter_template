
## 📦 STARTER TEMPLATE SPA VUE.JS / API NODE.JS + MYSQL 📦

### *The only goal of this project is personal learning*
A basic frontend and backend template for a complete authentification.

### 📝Frontend
Existing components Vue.js:
✔️ Navbar
✔️ Home
❌ About
✔️ Login
✔️ Register
❌ LostPassword
❌ Dashboard
❌ Admin

Vue.js content application is:
- A ``VueX`` store for data handling
- An Api service using ``Axios`` for data calls.
- ``Bootstrap`` for the front end component and for accessibility
- A ``JsonWebToken`` authentification
- Forms will be submitted with a CSRF customed secured token and will not be saved into the cookies in order to avoid XSS fault.
- Units tests with ``Jest``

#### 🌎 Demo
http://demo-vue-jest.naskot.fr/

credentials:
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
The Api will be set in a Node.js environment and will use ECMAScript 5
Among features:
- Design pattern MVC
- Node.js application will work as multi-threading handler with the module ``cluster`` (default is 1 thread)
- ``JsonWebToken`` To create and handle token, where RefreshToken fault has been considered
- ``BCrypt`` for password encyption
- ``MySQL`` for a relational SQL database 
- ``Csurf`` in order to only use generation of tokens
- Severals customised middlewares in order to handle the all aboves options and add another security layer.
- Unit tests with ``Jest``

It is a free project wich is simply a way to learn. The main goal in this project is the units tests mastery with ``Jest``


## 🔖 License
This project is under [MIT](/LICENSE.md).

## If you are up to join the project's discord:
🟨 [DISCORD project only French 🇫🇷](https://discord.gg/257rUb9)


## 🍺 If you are up to pay me a beer:
😍 [PAYPAL](https://www.paypal.com/paypalme/Julien06100?locale.x=fr_FR)
