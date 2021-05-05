const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
const Db = require('./db')
dotenv.config()

const jwt = {
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
        'DELETE FROM jwt ' +
        'WHERE TIME_TO_SEC( TIMEDIFF(CURRENT_TIMESTAMP() , `expire_at`) ) > 0 AND `is_revoke` = 0',
    })

    let perf_end = new Date().getTime()
    let perf_result = perf_end - perf_start
    perf_result /= 1000

    console.log(
      `${affected_row} jeton(s) jwt obsolète(s) supprimé(s) en ${perf_result} seconde(s)`
    )
  },

  /**
   * Génére un jeton en incluant un payload
   *
   * @param {Object} payload
   *
   * @returns {String} token
   */
  async make(payload = { userId: -1, username: null }) {
    const token = jsonwebtoken.sign(payload, process.env.JWT_PRIVATE_KEY, {
      algorithm: 'HS256',
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
    })

    return token
  },

  /**
   * Vérifie si c'est un jeton JWT
   * et si sa validité horaire est correct et retourne vrai
   *
   * @param {String} token
   *
   * @returns {Boolean}
   */
  isValid(token = '') {
    try {
      jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY)
    } catch (error) {
      return false
    }
    return true
  },

  /**
   * Retourne seulement la partie Payload d'un jeton
   * à condition qu'il soit valide,
   * le cas échéant retourne un format payload standard
   *
   * @param {String} token
   * @param {Boolean} complete - affiche les clés iat , exp
   *
   * @returns {Object} payload
   */
  async read(token = '', complete = false) {
    const payload = this.isValid(token)
      ? jsonwebtoken.decode(token, { complete: false })
      : null

    if (!complete) {
      delete payload.iat
      delete payload.exp
    }

    return payload
  },

  /**
   * Met à jour la validité horaire du jeton,
   * à condition qu'il soit valide
   * retourne un String si valide sinon un null
   *
   * @param {String} token
   *
   * @returns {String/Object}
   */
  async update(token = '') {
    if (this.isValid(token)) {
      const existToken = await Db.get({
        query: 'SELECT is_revoke FROM jwt WHERE token = md5(?) LIMIT 1',
        preparedStatement: [token],
      })

      // console.log(existToken[0])
      if (!existToken[0]) {
        // console.log('jeton inexistant')
        return null
      } else if (existToken[0] && existToken[0].is_revoke) {
        // console.log('jeton révoqué')
        return null
      }

      const payload = await this.read(token, true)
      const remainingTime = payload.exp - Math.floor(Date.now() / 1000)
      delete payload.iat
      delete payload.exp

      if (remainingTime <= parseInt(process.env.JWT_NOT_BEFORE)) {
        const newToken = await this.make(payload)

        const affected_row = await Db.merge({
          query:
            'UPDATE jwt SET token = md5(?), `expire_at` = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ? SECOND) WHERE token = md5(?) LIMIT 1',
          preparedStatement: [
            newToken,
            parseInt(process.env.JWT_EXPIRES_IN),
            token,
          ],
        })
        // console.log('affec row: ' + affected_row)
        // await Db.delete({
        //   query: 'DELETE FROM jwt WHERE token = md5(?) LIMIT 1',
        //   preparedStatement: [token],
        // })
        return newToken
      } else {
        return token
      }
    }
    return null
  },

  async get(payload = { userId: -1, username: null }) {
    const newToken = await this.make(payload)

    const existToken = await Db.get({
      query: 'SELECT is_revoke FROM jwt WHERE token = md5(?) LIMIT 1',
      preparedStatement: [newToken],
    })

    if (!existToken[0]) {
      Db.withTransaction()
      await Db.commit({
        query:
          'INSERT INTO jwt SET token = md5(?), expire_at = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ? SECOND)',
        preparedStatement: [newToken, parseInt(process.env.JWT_EXPIRES_IN)],
      })

      return newToken
    } else {
      return null
    }
  },

  /**
   * Met à jour le jeton JWT dans le compte
   *
   * @param {String} newToken
   * @param {Number} userId
   *
   * @void
   */
  async accountUpdate(newToken, userId) {
    await Db.merge({
      query: 'UPDATE account SET `jwt_hash` = MD5(?) WHERE ? LIMIT 1',
      preparedStatement: [
        // SET
        newToken,
        // WHERE
        { id: parseInt(userId) },
      ],
    })
  },
}

module.exports = jwt
