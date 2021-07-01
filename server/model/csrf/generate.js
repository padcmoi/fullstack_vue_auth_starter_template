const { Db } = require('../../middleware/index')

/**
 *
 * @param {Object} req
 * @param {String} newToken from csurf package
 * @returns {Object}
 */
module.exports = async function (req, newToken) {
  const headerToken = req.headers['csrf-token']

  // le header.token doit être renseigné
  if (typeof headerToken != 'string') {
    console.log('missing header token')
    return { api_response: 'missing header token' }
  }

  // on ajoute le jeton en base de données, afin de vérifier qu'il existe lors d'une tentative CSRF + XSS
  Db.withTransaction() // prochaine requete SQL en transaction
  const identifier = await Db.commit({
    query: 'INSERT INTO csrf SET ?',
    preparedStatement: [
      // SET
      {
        token: newToken,
        expire_at: Db.toSqlString(
          'DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 15 MINUTE)'
        ),
      },
    ],
  })

  // on supprime le jeton de la base de données, pour nettoyer avant la purge
  await Db.delete({
    query: 'DELETE FROM csrf WHERE ? LIMIT 1',
    preparedStatement: { token: headerToken },
  })

  // on charge le token dans la réponse, ceci permettra d'etre sure que le processus a bien réussi
  const select = await Db.get({
    query: 'SELECT ? FROM csrf WHERE ? LIMIT 1',
    preparedStatement: [
      Db.toSqlString(
        'DATE_FORMAT(`expire_at`, "%d/%m/%Y %H:%i:%s") AS expire_at'
      ),
      { token: newToken },
    ],
  })

  const expire_at = select[0] && select[0].expire_at

  const is_validated = expire_at ? true : false
  const response = {
    identifier,
    csrf_token: newToken,
    expire_at: expire_at || '1970-01-01 00:00:00',
    is_validated,
  }

  return response
}
