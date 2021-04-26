/**
 * Webp format compatible ?
 * retourne Vrai si le navigateur prend en charge
 * ou retourne Faux dans le cas contraire
 *
 * @return {Boolean}
 */
const webpIsSupported = function() {
  var elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }
  // very old browser like IE 8, canvas not supported
  return false
}

export default webpIsSupported
