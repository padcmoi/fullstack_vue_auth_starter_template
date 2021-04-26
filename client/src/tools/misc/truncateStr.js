/**
 * Tronque une chaine de caractères en définisant une limite de caractères désirées
 *
 * @param {String} string - chaine de caractères
 * @param {Number} limit - taille de la chaine désiré
 * @param {String} toAdd - caractères à ajouter en cas de dépassement
 *
 * @return {String}
 */
export default function(string = '', limit = 1, toAdd = '...') {
  if (limit >= string.length) {
    limit = string.length
  }
  let limitation = limit < string.length

  let text = ''
  for (let i = 0; i < limit; i++) {
    text += string[i]
  }
  return text + (limitation ? toAdd : '')
}
