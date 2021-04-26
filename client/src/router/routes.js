const routes = [
  {
    path: '*',
    name: 'ErrorHandling404',
    component: () =>
      import(
        /* webpackChunkName: "error_handling_404" */ '../views/ErrorHandling/ErrorHandling404.vue'
      ),
    meta: {
      dropdown: false,
      requires: {
        nav: false,
        auth: false,
        anonymous: false,
        admin: false,
      },
      seo: {
        title: '404 - Ressource inexistante',
        keywords: 'Ressource, inexistante',
        description: "La ressource n'est plus accessible ou a été supprimée",
      },
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      dropdown: false,
      requires: {
        nav: true,
        auth: false,
        anonymous: false,
        admin: false,
      },
      seo: {
        title: "Page d'acceuil",
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      dropdown: false,
      requires: {
        nav: true,
        auth: false,
        anonymous: true,
        admin: false,
      },
      seo: {
        title: 'Connexion',
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      dropdown: false,
      requires: {
        nav: true,
        auth: false,
        anonymous: true,
        admin: false,
      },
      seo: {
        title: "S'enregistrer",
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "forgot_password" */ '../views/ForgotPassword.vue'
      ),
    meta: {
      dropdown: false,
      requires: {
        nav: false,
        auth: false,
        anonymous: true,
        admin: false,
      },
      seo: {
        title: "S'enregistrer",
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      dropdown: false,
      requires: {
        nav: true,
        auth: true,
        anonymous: false,
        admin: false,
      },
      seo: {
        title: 'Dashboard',
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },
  {
    path: '/admin',
    name: 'Adminboard',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      dropdown: true,
      requires: {
        nav: true,
        auth: true,
        anonymous: false,
        admin: true,
      },
      seo: {
        title: 'Panel admin',
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      dropdown: false,
      requires: {
        nav: true,
        auth: false,
        anonymous: false,
        admin: false,
      },
      seo: {
        title: 'A propos',
        keywords: 'composant, homepage, autre',
        description: 'Une courte description',
      },
    },
  },

  {
    path: '/logout',
    name: 'Logout',
    component: () =>
      import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
    beforeEnter: (to, from, next) => {
      const answer = window.confirm('Voulez-vous vraiment vous déconnecter ?')
      if (answer) {
        next()
      } else {
        next(false)
      }
    },
    meta: {
      dropdown: true,
      requires: {
        nav: true,
        auth: true,
        anonymous: false,
        admin: false,
      },
      seo: {
        title: 'Logout',
        keywords: '', // Inutile de référencer un logout
        description: '', // Inutile de référencer un logout
      },
    },
  },
]

export default routes
