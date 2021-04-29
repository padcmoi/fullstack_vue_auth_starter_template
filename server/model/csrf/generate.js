const { Db } = require('../../middleware/index')
const dotenv = require('dotenv')
dotenv.config()

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = async function (_ = { oldToken, newToken }) {
  // Pas besoin de regarder si en header j'ai un jeton csrf, sinon on peut consulter avec req.headers['csrf-token']

  // TO DO on ajoute le jeton en base de données, afin de vérifier qu'il existe lors d'une tentative CSRF + XSS

  Db.withTransaction() // prochaine requete SQL en transaction
  const identifier = await Db.commit({
    query: 'INSERT INTO csrf SET ?',
    preparedStatement: [
      // SET
      {
        token: _.newToken,
        expire_at: Db.toSqlString(
          'DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 15 MINUTE)'
        ),
      },
    ],
  })

  // on supprime le jeton de la base de données, pour nettoyer avant la purge
  if (typeof _.oldToken === 'string') {
    await Db.delete({
      query: 'DELETE FROM csrf WHERE ? LIMIT 1',
      preparedStatement: { token: _.oldToken },
    })
  }
  // on supprime le jeton de la base de données, pour nettoyer avant la purge

  const select = await Db.get({
    query: 'SELECT ? FROM csrf WHERE ? LIMIT 1',
    preparedStatement: [
      Db.toSqlString(
        'DATE_FORMAT(`expire_at`, "%d/%m/%Y %H:%i:%s") AS expire_at'
      ),
      { token: _.newToken },
    ],
  })

  const is_validated = select[0] && select[0].expire_at ? true : false
  const _res = {
    identifier,
    csrf_token: _.newToken,
    expire_at: (select[0] && select[0].expire_at) || '1970-01-01 00:00:00',
    is_validated,
  }
  console.log(_res)
  return _res

  // modelCsrf.read()
}
