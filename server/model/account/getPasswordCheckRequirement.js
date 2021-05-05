const { Password } = require('../../middleware/index')
const dotenv = require('dotenv')
dotenv.config()

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = function () {
  const result = Password.configuration()
  // console.log(result)
  return result
}
