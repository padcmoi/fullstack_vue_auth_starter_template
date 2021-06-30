const { Db } = require('../../middleware/index')
const dotenv = require('dotenv')
dotenv.config()

/**
 *
 * @param {Object} req
 * @returns {Object}
 */
module.exports = async function (req) {
  const headerToken = req.headers['csrf-token']

  // le header.token doit être renseigné
  if (typeof headerToken != 'string') {
    console.log('missing header token')
    return { api_response: 'missing header token' }
  }
  // UPDATE csrf SET `expire_at` = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 15 MINUTE) WHERE `token` = 'lfAKUwXN-Lf_M6GeMsiziu7OEj8P7ov6C1Ds' AND  TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) < 0

  await Db.merge({
    query: 'UPDATE csrf SET ? WHERE ? AND ? LIMIT 1',
    preparedStatement: [
      // SET
      {
        expire_at: Db.toSqlString(
          'DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 15 MINUTE)'
        ),
      },
      // WHERE
      { token: headerToken },
      // AND
      Db.toSqlString(
        'TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) < 0'
      ),
    ],
  })

  const select = await Db.get({
    query: 'SELECT ? FROM csrf WHERE ? AND ? LIMIT 1',
    preparedStatement: [
      // SELECT
      Db.toSqlString(
        'DATE_FORMAT(`expire_at`, "%d/%m/%Y %H:%i:%s") AS expire_at'
      ),
      // WHERE
      { token: headerToken },
      // AND
      Db.toSqlString(
        'TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) < 0'
      ),
    ],
  })

  const is_validated = select[0] && select[0].expire_at ? true : false
  const response = {
    csrf_token: is_validated ? headerToken : '',
    expire_at: (select[0] && select[0].expire_at) || '1970-01-01 00:00:00',
    is_validated,
  }

  return response
}
