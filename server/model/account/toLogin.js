const { Db, Form, Jwt, Password } = require('../../middleware/index')
const dotenv = require('dotenv')
dotenv.config()

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = async function (_ = { params }) {
  Form.sanitizeEachData(_.params, ['access_token'])
  let data = null
  const toastMessage = []
  let access_token = ''

  console.warn(_.params.user)
  console.warn(_.params.password)
  console.warn(_.params.captcha)

  // const select = await Db.get({
  // const select = Db.formatQuery({
  data = await Db.get({
    query: 'SELECT ? FROM account AS a WHERE ? LIMIT 1',
    preparedStatement: [
      // SELECTOR / NOTE: On place les DATE_FORMAT apres le * pour écraser les valeurs non formatés
      Db.toSqlString(
        'a.*, ' +
          'DATE_FORMAT(`created_at`, "%d/%m/%Y %H:%i:%s") AS created_at, ' +
          'DATE_FORMAT(`updated_at`, "%d/%m/%Y %H:%i:%s") AS updated_at'
      ),
      // WHERE
      { username: _.params.user + '' },
      // { password: _.params.password + '' },
    ],
  })

  let accountData = data && data[0]
  let hashPassword = (accountData && accountData.password) || ''

  const isValidPassword = await Password.check(_.params.password, hashPassword)

  let isLock = accountData && accountData.is_lock ? true : false
  let isLoggedIn = accountData && !isLock && isValidPassword ? true : false

  if (isLock || !isValidPassword) {
    accountData = null
  }

  if (!isLock && isLoggedIn) {
    access_token = await Jwt.get({
      // access_token: null,
      userId: (accountData && accountData.id) || -1,
      // isLoggedIn,
      // isAdmin: accountData && accountData.is_admin ? true : false,
    })

    await Db.merge({
      query:
        'UPDATE account SET ' +
        '`is_logged_in` = 1, `jwt_hash` = MD5(?), `last_connected_at` = CURRENT_TIMESTAMP() ' +
        'WHERE ? LIMIT 1',
      preparedStatement: [
        // SET
        access_token,
        // WHERE
        { id: (accountData && accountData.id) || -1 },
      ],
    })
  }

  if (isLock) {
    toastMessage.push({ msg: 'Compte verrouillé' })
  } else if (!isLoggedIn) {
    toastMessage.push({ msg: 'Identification incorrecte' })
  }

  const result = {
    isLock,
    isLoggedIn,
    isAdmin: accountData && accountData.is_admin ? true : false,
    firstName: (accountData && accountData.firstname) || undefined,
    lastName: (accountData && accountData.lastname) || undefined,
    toastMessage,
    access_token,
  }

  return result
}
