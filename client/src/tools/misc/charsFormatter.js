/**
 * Formatte une chaine de caractères
 *
 * @param {String} Str
 *
 * @return {String} - chaine traitée
 */
const Lowercase = function formatter_lowercase(Str) {
  if (typeof Str !== 'string') return Str
  return Str.toLowerCase()
}

/**
 * Formatte une chaine de caractères
 *
 * @param {String} Str
 *
 * @return {String} - chaine traitée
 */
const Uppercase = function formatter_uppercase(Str) {
  if (typeof Str !== 'string') return Str
  return Str.toUpperCase()
}

/**
 * Formatte une chaine de caractères
 *
 * @param {String} Str
 *
 * @return {String} - chaine traitée
 */
const Capitalize = function formatter_capitalize(Str) {
  if (typeof Str !== 'string') return Str
  return Str.charAt(0).toUpperCase() + Str.slice(1)
}

export { Lowercase, Uppercase, Capitalize }
