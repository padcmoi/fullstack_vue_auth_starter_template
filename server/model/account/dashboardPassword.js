const {} = require('../../middleware/index')

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = async function (_ = { access_token }) {
  console.warn(_.params.user)
  console.warn(_.params.email)
  console.warn(_.params.captcha)

  return {}
}
