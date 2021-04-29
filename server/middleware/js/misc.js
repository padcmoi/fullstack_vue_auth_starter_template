const dotenv = require('dotenv')
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
}

module.exports = misc
