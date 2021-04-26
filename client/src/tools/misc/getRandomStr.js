import getRandomInt from './getRandomInt'

/**
 * Génére une chaine de caractères aléatoires
 *
 * @param {Number} size - taille de la chaine désiré
 * @param {String} letters - caractères autorisés
 *
 * @return {String}
 */
export default function(size = 32, letters = 'azertyuiopqsdfghjklmwxcvbn') {
  let string = ''
  for (let i = 0; i < size; i++) {
    string += letters[getRandomInt(letters.length - 1)]
  }
  return string
}
