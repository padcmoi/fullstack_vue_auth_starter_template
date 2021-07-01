const { Password } = require('../../middleware/index')

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = function () {
  const result = Password.configuration()
  return result
}
