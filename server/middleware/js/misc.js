const dotenv = require('dotenv')
const e = require('express')
dotenv.config()

const misc = {
  /**
   * formate la chaine de caractères en minuscule
   *
   * @param {String} str
   *
   * @returns {String}
   */
  lowerCase(str) {
    if (typeof str !== 'string') return str
    return str.toLowerCase()
  },
  /**
   * formate la chaine de caractères en majuscule
   *
   * @param {String} str
   *
   * @returns {String}
   */
  upperCase(str) {
    if (typeof str !== 'string') return str
    return str.toUpperCase()
  },
  /**
   * formate la première lettre en majuscule
   *
   * @param {String} str
   *
   * @returns {String}
   */
  capitalize(str) {
    if (typeof str !== 'string') return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  /**
   * Arrondit un nombre entier
   *
   * @param {Number} number
   * @param {Number} ends
   *
   * @returns {Number}
   */
  roundNum(number, ends = 0) {
    return parseFloat(number.toFixed(ends))
  },

  /**
   * Obtient un chiffre aléatoire compris entre 2 valeurs
   *
   * @param {Number} min
   * @param {Number} max
   *
   * @returns {Number}
   */
  getRandomInt(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  /**
   * Génére des caractères aléatoires
   *
   * @param {Number} size
   * @param {String} letters
   *
   * @returns {String}
   */
  getRandomStr(size = 32, letters = 'azertyuiopqsdfghjklmwxcvbn') {
    let string = ''
    for (let i = 0; i < size; i++) {
      string += letters[this.getRandomInt(0, letters.length - 1)]
    }
    return string
  },

  /**
   * Convertit une chaine de caractères en slug
   *
   * @param {String} str
   *
   * @returns {String}
   */
  slugify(str = '') {
    if (typeof str != 'string') throw 'fn truncate arg str not string'

    const convert = {
      'à|á|ä|â': 'a',
      'è|é|ë|ê': 'e',
      'ì|í|ï|î': 'i',
      'ò|ó|ö|ô': 'o',
      'ù|ú|ü|û': 'u',
      ñ: 'n',
      '/|_|,|;|\'|"': '-',
    }

    str = str.replace(/^\s+|\s+$/g, '').toLowerCase() // trim + lowercase

    for (const [key, value] of Object.entries(convert)) {
      str = str.replace(new RegExp(key, 'g'), value)
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes

    return str
  },

  /**
   * Tronque une chaine de caractères avec une limite à définir
   *
   * @param {String} str
   * @param {Number} length
   *
   * @returns {String}
   */
  truncate(str, length) {
    if (typeof length != 'number') throw 'fn truncate arg length not number'
    else if (typeof str != 'string') throw 'fn truncate arg str not string'

    return str.length > length ? str.substring(0, length) : str
  },
}

module.exports = misc
