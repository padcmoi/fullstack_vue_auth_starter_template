const Db = require('./db')
const View = require('./view')
const dotenv = require('dotenv')
dotenv.config()

const csrf = {
  /**
   * Vérifie les validités de tous les jetons
   * et purge les jetons csrf trop ancien
   *
   * @void
   */
  async databasePurge() {
    let perf_start = new Date().getTime()

    const affected_row = await Db.delete({
      query:
        'DELETE FROM csrf ' +
        'WHERE TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) > 0',
    })

    let perf_end = new Date().getTime()
    let perf_result = perf_end - perf_start
    perf_result /= 1000

    console.log(
      `${affected_row} jeton(s) csrf obsolète(s) supprimé(s) en ${perf_result} seconde(s)`
    )
  },

  async isValidHeader(req, res) {
    // TO DO Vérifier si le jeton CSRF se situe en base de données
    // if (!check_db(req.headers['csrf-token'])) return
    const csrf_token = req.headers['csrf-token']

    // SELECT token FROM `csrf` WHERE token = 'NTG390ER-f2o6WWd5IiyKmybTKYV_qYRzp09' AND TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) < 0

    let is_validated = false

    if (typeof csrf_token === 'string') {
      const select = await Db.get({
        query: 'SELECT token FROM csrf WHERE ? AND ? LIMIT 1',
        preparedStatement: [
          // WHERE
          { token: csrf_token },
          // AND
          Db.toSqlString(
            'TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) < 0'
          ),
        ],
      })

      is_validated = select[0] && select[0].token ? true : false
    }

    if (!is_validated) View.json(res, { api_response: 'invalid csrf header' })

    return is_validated
  },

  async useHeaderToken() {
    // TO DO Vérifier si le jeton CSRF se situe en base de données
    // if (!check_db(req.headers['csrf-token'])) return
    const csrf_token = req.headers['csrf-token']

    if (typeof csrf_token === 'string') {
      await Db.delete({
        query: 'DELETE FROM csrf WHERE ? LIMIT 1',
        preparedStatement: { token: csrf_token },
      })
      return true
    } else {
      return false
    }
  },
}

module.exports = csrf
