/**
 * Configure le jeton CSRF en header
 *
 * @param {String} attribut
 *
 * @return {String} - le jeton
 */
const set = function(attribut) {
  document
    .querySelector('meta[name="csrf-token"]')
    .setAttribute('content', attribut)

  return attribut
}

/**
 * Retourne le jeton CSRF stocké en header
 *
 * @return {String} - le jeton
 */
const get = function() {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content')

  return token
}

export { get as getCsrfToken, set as setCsrfToken }
