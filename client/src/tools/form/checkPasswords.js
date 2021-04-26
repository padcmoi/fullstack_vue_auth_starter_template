import store from '@/store'

/**
 * Vérifie si un mot de passe réspecte les exigences
 *
 * @param {String} password1
 * @param {String} password2
 *
 * @return {Boolean}
 */
export default function(password1, password2) {
  if (typeof password1 === 'string' && password1.length === 0) return null
  const check = {
    matches: password1 === password2,
    size: password1.length,
    uppercase: 0,
    lowercase: 0,
    number: 0,
  }

  for (let i = 0; i < check['size']; i++) {
    if (password1[i] >= 'a' && password1[i] <= 'z') {
      check['lowercase']++
    } else if (password1[i] >= 'A' && password1[i] <= 'Z') {
      check['uppercase']++
    } else if (password1[i] >= '0' && password1[i] <= '9') {
      check['number']++
    }
  }

  const requirement = store.state.store_check_form.passwordRequire

  if (
    !check['matches'] ||
    check['size'] < parseInt(requirement.length) ||
    check['uppercase'] < parseInt(requirement.upper) ||
    check['lowercase'] < parseInt(requirement.lower) ||
    check['number'] < parseInt(requirement.number)
  ) {
    return false
  }

  return true
}
