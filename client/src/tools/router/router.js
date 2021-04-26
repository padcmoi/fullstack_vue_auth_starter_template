import store from '@/store'

/**
 *
 * @param {String} value
 *
 * {Void}
 */
const routerSetTitle = (value) => (document.title = value || '')

/**
 *
 * @param {String} key
 * @param {String} value
 *
 * {Void}
 */
const routerSetMeta = (key, value) =>
  (document.head.querySelector(key).content = value || '')

/**
 *
 * @param {String} key
 * @param {String} value
 *
 * {Void}
 */
const routerSetLink = (key, value) =>
  (document.head.querySelector(key).href = value || '')

/**
 * Vérifie les droits par rapport à la route utilisé,
 * redirige en cas de non autorisation
 *
 * @param {Object} to
 * @param {Router instance} router
 * @param {Boolean} - vrai = n'utilise pas VueRouter pour les redirections forcées / en cause un problème avec la navigation guard de VueRouter
 *
 * {Void}
 */
const routerRightsCheck = async function(to, router, nativeMode = false) {
  const isLogged = store.state.store_auth.isLogged
  const isAdmin = store.state.store_auth.isAdmin
  const requireAuth = to.meta.requires.auth
  const requireAnonymous = to.meta.requires.anonymous
  const requireAdmin = to.meta.requires.admin

  const currentPath = router.currentRoute.path

  // Requiert d'etre connecté
  if (requireAuth && !isLogged && currentPath !== '/login') {
    nativeMode ? (document.location = '/login') : router.push('/login')
  }
  // Tentative de connexion à une page de login
  else if (isLogged && requireAnonymous && currentPath !== '/dashboard') {
    nativeMode ? (document.location = '/dashboard') : router.push('/dashboard')
  }
  // Requiert d'etre admin et connecté
  else if (!isAdmin && requireAdmin && currentPath !== '/login') {
    nativeMode ? (document.location = '/login') : router.push('/login')
  }
}

/**
 * Vérifie les droits par rapport à la route utilisé,
 * redirige en cas de non autorisation
 *
 * @param {Object} to
 * @param {Router instance} router
 * @param {Function} next
 *
 * {Void}
 */
const routerRightsCheckNext = async function(to, router, next) {
  // await store.dispatch('store_auth/init_auth')
  await store.dispatch('store_auth/check_auth')

  const isLogged = store.state.store_auth.isLogged
  const isAdmin = store.state.store_auth.isAdmin
  const requireAuth = to.meta.requires.auth
  const requireAnonymous = to.meta.requires.anonymous
  const requireAdmin = to.meta.requires.admin

  const currentPath = router.currentRoute.path

  // Requiert d'etre connecté
  if (requireAuth && !isLogged && currentPath !== '/login') {
    next('login')
  }
  // Tentative de connexion à une page de login
  else if (isLogged && requireAnonymous && currentPath !== '/dashboard') {
    next('dashboard')
  }
  // Requiert d'etre admin et connecté
  else if (!isAdmin && requireAdmin && currentPath !== '/login') {
    next('login')
  }
  // Vous avez les autorisations requises
  else {
    routerSetTitle(to.meta.seo.title)
    routerSetMeta('meta[name=description]', to.meta.seo.description)
    routerSetMeta('meta[name=keywords]', to.meta.seo.keywords)
    routerSetLink('link[rel=canonical]', document.location.origin + to.path)

    next()
  }
}

export {
  routerRightsCheck,
  routerRightsCheckNext,
  routerSetTitle,
  routerSetMeta,
  routerSetLink,
}
