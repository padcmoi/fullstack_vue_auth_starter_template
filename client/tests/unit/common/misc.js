import { Lowercase, Uppercase, Capitalize } from '@/tools/index'

/**
 * Retourne des caractères aléatoires
 *
 * @param {Number} size
 * @returns {String}
 */
const randomStr = function(size = 32) {
  let string = '',
    letters = 'azertyuiopqsdfghjklmwxcvbn123456789AZERTYUIOPQSDFGHJKLMWXCVBN'
  for (let i = 0; i < size; i++) {
    string += letters[Math.floor(Math.random() * Math.floor(letters.length))]
  }
  return string
}

/**
 * Correspond au formattage Lowercase
 *
 * @param {String} Str
 *
 * @returns {Boolean}
 */
const isLowercase = function(Str) {
  if (typeof Str !== 'string') return false
  return Str === Lowercase(Str) ? true : false
}

/**
 * Correspond au formattage Uppercase
 *
 * @param {String} Str
 *
 * @returns {Boolean}
 */
const isUppercase = function(Str) {
  if (typeof Str !== 'string') return false
  return Str === Uppercase(Str) ? true : false
}

/**
 * Correspond au formattage Capitalize
 *
 * @param {String} Str
 *
 * @returns {Boolean}
 */
const isCapitalized = function(Str) {
  if (typeof Str !== 'string') return false
  return Str === Capitalize(Str) ? true : false
}

export { randomStr, isLowercase, isUppercase, isCapitalized }
