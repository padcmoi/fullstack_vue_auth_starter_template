const dotenv = require('dotenv')
dotenv.config()

const form = {
  /**
   *
   *
   * @param {String} str
   *
   * @returns {String}
   */
  strip_tags(str) {
    return str.replace(/(<([^>]+)>)/gi, '')
  },

  /**
   *
   *
   * @param {String} str
   *
   * @returns {String}
   */
  htmlspecialchars(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    // .replace(/"/g, '&quot;')
    // .replace(/'/g, '&#039;')
  },

  /**
   * La méthode trim() permet de retirer les blancs en début et fin de chaîne
   *
   * @param {String} str
   *
   * @returns {String}
   */
  trim(str) {
    return str.trim()
  },

  /**
   *
   *
   * @param {String} str
   *
   * @returns {String}
   */
  stripslashes(str) {
    return (str + '').replace(/\\(.?)/g, function (s, n1) {
      switch (n1) {
        case '\\':
          return '\\'
        case '0':
          return '\u0000'
        case '':
          return ''
        default:
          return n1
      }
    })
  },

  /**
   * Nettoie les champs avec 4 methodes de néttoyage
   *
   * @param {String} str
   *
   * @returns {String}
   */
  sanitizeString(str) {
    if (typeof str !== 'string') return str
    str = this.strip_tags(str)
    str = this.htmlspecialchars(str)
    str = this.trim(str)
    str = this.stripslashes(str)

    return str
  },

  /**
   * Nettoie toutes les valeurs des clés d'un Objet
   * Attention, peu avoir des effets indésirables sur les valeurs avec typages numériques, boolean, ...
   *
   * @param {Object} Obj
   * @param {Array} except - Liste des clés qui seront non traitées
   *
   * @returns {Object}
   */
  sanitizeEachData(Obj, except = []) {
    if (typeof except !== 'object') except = []
    if (typeof Obj !== 'object') {
      console.error('sanitizeEachData - param not object')
      return Obj
    }

    for (const [key, value] of Object.entries(Obj)) {
      if (except.indexOf(key) === -1) {
        Obj[key] = this.sanitizeString(value)
      }
    }

    return Obj
  },

  /**
   * Vérifie si un mail a un formation correct
   *
   * @returns {Boolean}
   */
  isValidMail(mail) {
    if (typeof mail !== 'string') return false

    const re =
      /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/
    return re.test(String(mail).toLowerCase())
  },

  /**
   * Type GETTER
   * Génére un GUID
   *
   * @returns {string}
   */
  createGUID() {
    return sprintf(
      '%04X-%04X-%04X-%04X-%04X',
      mt_rand(0, 32768),
      mt_rand(32768, 65535),
      mt_rand(16384, 20479),
      mt_rand(32768, 49151),
      time() - 1593200000
    )
  },
}

module.exports = form
