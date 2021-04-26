import axios from 'axios'
import store from '@/store'
import { getCsrfToken, makeToast } from '@/tools'

/**
 * Class Api
 *
 * INFO: Ne pas instancier cette class avec new Api() !!
 *       Pour instancier cette Class singleton et son Constructor
 *      >const provider = Api.__construct()
 *      >console.log( typeof provider ) // Object
 *
 * Instance une communication vers une Api
 * et personnalise les requetes
 *
 */
class Api {
  /**
   * Method Static pour Instanciaton Singleton
   *
   * return {stdClass Object}
   */
  static __instance
  static __construct() {
    if (!Api.__instance) {
      Api.__instance = new Api()
      // Constructor
      Api.__instance.axios = null
      Api.__instance.init()
    }

    return Api.__instance // retourne l'instance à chaque appel de la method static
  }

  /**
   * Créer une instance Axios personnalisé
   *
   * @void
   */
  init() {
    this.axios = axios.create({
      baseURL: process.env.VUE_APP_API_URL || 'http://127.0.0.1:3000',
      timeout: 10000,
      responseType: 'json',
      responseEncoding: 'utf8',
      'Content-Type': 'multipart/form-data',
      xsrfCookieName: 'csrf-token',
      xsrfHeaderName: 'csrf-token',
      onUploadProgress: function(progressEvent) {
        // console.error('onUploadProgress ' + JSON.stringify(progressEvent))
      },
      onDownloadProgress: function(progressEvent) {
        // console.warn('onDownloadProgress ' + JSON.stringify(progressEvent))
      },
      // cancelToken: new CancelToken(function(cancel) {
      //   console.log('cancelToken')
      // }),
    })

    // console.warn('Wrap Api init')
  }

  /**
   * Requete une route GET vers une Api
   *
   * @param {String} url
   * @param {Object} params
   * @param {Boolean} overlay
   *
   * @returns {Object}
   */
  async get(url = '', params = {}) {
    if (!this.axios) return {}

    this.axios.defaults.headers['csrf-token'] = getCsrfToken()

    params.access_token = localStorage.getItem('access_token')

    try {
      const response = await this.axios.get(url, { params })

      return this.buildResponse(response)
    } catch (error) {
      makeToast({ type: 'error', msg: '[GET] - API hors ligne' })

      return this.buildResponse({})
    }
  }

  /**
   * Requete une route POST vers une Api
   *
   * @param {String} url
   * @param {Object} params
   * @param {Boolean} overlay
   *
   * @returns {Object}
   */
  async post(url = '', params = {}, overlay = true) {
    if (!this.axios) return {}

    this.overlay(overlay)
    this.axios.defaults.headers['csrf-token'] = getCsrfToken()

    params.access_token = localStorage.getItem('access_token')

    try {
      const response = await this.axios.post(url, {
        // data: qs.stringify(params), // For PHP Api
        params, // For Node Api
      })

      return this.buildResponse(response, true)
    } catch (error) {
      makeToast({ type: 'error', msg: '[POST] - API hors ligne' })
      return this.buildResponse({}, true)
    }
  }

  /**
   * Requete une route PUT vers une Api
   *
   * @param {String} url
   * @param {Object} params
   * @param {Boolean} overlay
   *
   * @returns {Object}
   */
  async put(url = '', params = {}, overlay = true) {
    if (!this.axios) return {}

    this.overlay(overlay)
    this.axios.defaults.headers['csrf-token'] = getCsrfToken()

    params.access_token = localStorage.getItem('access_token')

    try {
      const response = await this.axios.put(url, {
        // data: qs.stringify(params), // For PHP Api
        params, // For Node Api
      })

      return this.buildResponse(response, true)
    } catch (error) {
      makeToast({ type: 'error', msg: '[PUT] - API hors ligne' })
      return this.buildResponse({}, true)
    }
  }

  /**
   * Requete une route DELETE vers une Api
   *
   * @param {String} url
   * @param {Object} params
   * @param {Boolean} overlay
   *
   * @returns {Object}
   */
  async delete(url = '', params = {}, overlay = true) {
    if (!this.axios) return {}

    this.overlay(overlay)
    this.axios.defaults.headers['csrf-token'] = getCsrfToken()

    params.access_token = localStorage.getItem('access_token')

    try {
      const response = await this.axios.delete(url, {
        // data: qs.stringify(params), // For PHP Api
        params, // For Node Api
      })

      return this.buildResponse(response, true)
    } catch (error) {
      makeToast({ type: 'error', msg: '[DELETE] - API hors ligne' })
      return this.buildResponse({}, true)
    }
  }

  /**
   * Construit une réponse d'Api, retourne les champs par défaut défini
   *
   * @param {Object} response
   * @param {Boolean} overlay
   *
   * @returns [Object]
   */
  buildResponse(response = {}, overlay = false) {
    const build = {
      data: response.data || {},
      status: response.status || 404,
      header: response.headers || {},
    }

    this.jsonWebToken(response)

    if (overlay) {
      this.overlay(false)
    }

    return build
  }

  /**
   * On sauvegarde le nouveau Jeton JWT
   * si un nouveau est proposé
   *
   * @param {Object} response
   *
   * @void
   */
  jsonWebToken(response) {
    if (response.data && response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token)
    }
  }

  /**
   * Affiche ou cache l'overlay de chargement
   *
   * @param {Boolean} overlay
   *
   * @void
   */
  overlay(overlay = false) {
    store.dispatch('store_check_form/overlayState', overlay)
  }
}

export default Api.__construct() // Singleton
