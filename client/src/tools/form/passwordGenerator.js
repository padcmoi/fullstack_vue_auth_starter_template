import { getRandomInt, checkPasswords } from '@/tools'

let specialChar = '.&@'

/**
 * Génére aléatoirement des caractères dans une chaine
 * avec des consignes comme des symboles spéciaux à inserer
 *
 * @param {Number} size
 *
 * @returns {String}
 */
function randomStrGenerator(size) {
  const Obj = {
    passwdGen: '',
    passwdChar:
      'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789',
    indexSpecialChar: getRandomInt(size - 1),
  }

  for (let idx = 0; idx < parseInt(size); idx++) {
    Obj.passwdGen +=
      idx === Obj.indexSpecialChar
        ? specialChar[getRandomInt(specialChar.length - 1)]
        : Obj.passwdChar[getRandomInt(Obj.passwdChar.length - 1)]
  }

  return Obj.passwdGen
}

/**
 * Génére un mot de passe puis vérifie si ce mot de passe répond aux éxigences,
 * si ce denier ne répond pas la fonction sera appelé une nouvelle fois et
 * ainsi de suite avec un mot de passe de plus en plus long afin d'eviter une eventuelle boucle de la mort
 *
 * @param {Number} size
 * @param {String} spChar
 *
 * @returns {String}
 */
const build = function(size = 8, spChar = '.&@') {
  if (typeof spChar !== 'string') {
    return new Error('spChar doit être une chaine de caractères, minimum 1')
  } else if (spChar.length === 0) {
    return new Error('spChar ne peut pas être vide')
  }

  specialChar = spChar

  const password = randomStrGenerator(size)

  // Exigence non respecté, on relance la fonction en incrémentant +1 à la taille
  if (!checkPasswords(password, password)) return build(size + 1, spChar)

  return password
}

export default build
