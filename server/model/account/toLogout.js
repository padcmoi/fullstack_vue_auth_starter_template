const { Db } = require('../../middleware/index')

/**
 *
 * @param {String} access_token
 * @returns
 */
module.exports = async function (access_token = '') {
  console.warn('logout')

  await Db.merge({
    query:
      'UPDATE account SET ' +
      '`is_logged_in` = 0 ' +
      'WHERE `jwt_hash` = MD5(?) LIMIT 1',
    preparedStatement: [
      // WHERE
      access_token,
    ],
  })

  return { isLogout: true }
}
