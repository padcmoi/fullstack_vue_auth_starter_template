/**
 * Génére un nombre aléatoire
 *
 * @param {Number} max
 *
 * @return {Number}
 */
export default function(max = 32000) {
  return Math.floor(Math.random() * Math.floor(max + 1))
}
