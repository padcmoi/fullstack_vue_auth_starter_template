/**
 * Vérifie si le format d'une adresse email est correct
 *
 * @param {String} mail
 *
 * @return {Boolean}
 */
export default function(mail) {
  if (typeof mail !== 'string') return null

  const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/
  return re.test(String(mail).toLowerCase())
}
