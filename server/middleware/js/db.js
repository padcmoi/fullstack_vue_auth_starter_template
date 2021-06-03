const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  multipleStatements: false,
})
// NOTE / REFLEXION
// Nul besoin d'ouvrir et de fermer semble t'il ? par rapport à la doc npm mysql
// connection.connect()
// connection.end()

/**
 *
 * @param {String} query
 * @param {Object} preparedStatement
 *
 * @returns {Object}
 */
function requestPromise(query, preparedStatement, hasTransaction = false) {
  const promise = new Promise((resolv, reject) => {
    // Transaction si activé
    if (hasTransaction) {
      connection.query('START TRANSACTION;', null)
    }
    // Transaction si activé

    // Query
    connection.query(query, preparedStatement, (err, data) => {
      if (err) {
        // Transaction si activé
        if (hasTransaction) connection.query('ROLLBACK;', null)
        // Transaction si activé
        return console.error('ERREUR: ' + err + '\n\nQUERY: ' + query + '\n')
      } else {
        resolv(data)
      }
    })
    // Query

    // Transaction si activé
    if (hasTransaction) connection.query('COMMIT;', null)
    // Transaction si activé
  })

  return promise
}

// Paramètres
requestPromise('SET NAMES utf8', null)
requestPromise('SET time_zone = "+02:00";', null)
requestPromise('SET AUTOCOMMIT = 1', null)

// on définit une proprièté ici pour avoir une visibilité privé
// mais qui sera accessible aux méthods dans { Object } db,
// cette proprieté définit ou non si une transaction doit être appliqué aux requêtes SQL
let hasTransaction = true

const db = {
  /**
   * En appelant cette method
   * la prochaine requête SQL sera dans une transation avec un rollBack en cas d'erreur
   * à l'inverse un commit en cas de succès
   *
   * @void
   */
  withTransaction() {
    hasTransaction = true
  },

  /**
   * POUR TOUTES LES REQUETES !!!, à utiliser pour les requetes trop personnalisées
   * Requête vers une promesse,
   * il est recommandé que chaque requete MySQL passe par cette method !!!
   *
   * @param {String} query
   * @param {Object} preparedStatement
   *
   * @returns {Object}
   */
  async query(query, preparedStatement = null) {
    const req = await requestPromise(query, preparedStatement, hasTransaction)

    // apres la transaction, on désactive
    hasTransaction = false
    // apres la transaction, on désactive

    return req
  },

  /**
   * SELECT
   * Pour la récupération de données
   *
   * @call_as_object
   * @param {String} query
   * @param {Object} preparedStatement
   *
   * @returns {Object}
   */
  async get(_req = { query, preparedStatement }) {
    const sql = connection.format(_req.query, _req.preparedStatement)
    const result = await this.query(sql)

    return result
  },

  /**
   * INSERT
   * Commit prenant en charge les fonctions MySQL dans les champs
   *
   * @call_as_object
   * @param {String} query
   * @param {Object} preparedStatement
   *
   * @returns {Number} - Last Insert ID
   */
  async commit(_req = { query, preparedStatement }) {
    const sql = connection.format(_req.query, _req.preparedStatement)
    const data = await this.query(sql)

    return parseInt(data.insertId)
  },

  /**
   * UPDATE
   * Merge prenant en charge les fonctions MySQL dans les champs
   *
   * @call_as_object
   * @param {String} query
   * @param {Object} preparedStatement
   *
   * @returns {Number}
   */
  async merge(_req = { query, preparedStatement }) {
    const sql = connection.format(_req.query, _req.preparedStatement)
    const data = await this.query(sql)

    return parseInt(data.changedRows)
  },

  /**
   * DELETE
   * Suppression prenant en charge les fonctions MySQL dans les champs
   *
   * @call_as_object
   * @param {String} query
   * @param {Object} preparedStatement
   *
   * @returns {Number} nombre de ligne(s) affectée(s)
   */
  async delete(_req = { query, preparedStatement }) {
    const sql = connection.format(_req.query, _req.preparedStatement)
    const data = await this.query(sql)

    return parseInt(data.affectedRows)
  },

  /**
   * Traduit une fonction SQL comme CURRENT_TIMESTAMP()
   * non echappé
   *
   * @param {String} SqlFunction - La fonction SQL
   *
   * @returns {String}
   */
  toSqlString(SqlFunction) {
    if (typeof SqlFunction !== 'string') return ''
    return {
      toSqlString() {
        return `${SqlFunction}`
      },
    }
  },

  /**
   * Pour les champs échappés, permet de formatter une fonction SQL
   *
   * @call_as_object
   * @param {String} query
   * @param {Object} preparedStatement
   *
   * @returns {String}
   */
  formatQuery(_req = { query, preparedStatement }) {
    const sql = connection.format(_req.query, _req.preparedStatement)
    return sql
  },
}

module.exports = db
