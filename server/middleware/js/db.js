const mysql = require('mysql')

/**
 * Ouvre une connection
 *
 * @returns {Object}
 */
function openConnection() {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: false,
  })

  connection.connect()

  return connection
}

/**
 *
 * @param {String} query
 * @param {Object} preparedStatement
 *
 * @returns {Object}
 */
function requestPromise(query, preparedStatement, hasTransaction = false) {
  const promise = new Promise((resolv, reject) => {
    // Ouvre la connection dans la promesse
    const connection = openConnection()

    // Transaction si activé
    if (hasTransaction) {
      connection.query('START TRANSACTION;', null)
    }

    // Query
    connection.query(query, preparedStatement, (err, data) => {
      if (err) {
        // Transaction si activé
        if (hasTransaction) connection.query('ROLLBACK;', null)

        console.error('ERREUR: ' + err + '\n\nQUERY: ' + query + '\n')
        resolv({}) // En cas de requete SQL erronée on ne paralyse pas l'Api
      } else {
        resolv(data)
      }
    })

    // Transaction si activé
    if (hasTransaction) connection.query('COMMIT;', null)

    // Ferme la connection dans la promesse
    connection.end()
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
  async get(req = { query, preparedStatement }) {
    const data = await this.query(req.query, req.preparedStatement)

    return data
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
  async commit(req = { query, preparedStatement }) {
    const data = await this.query(req.query, req.preparedStatement)

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
  async merge(req = { query, preparedStatement }) {
    const data = await this.query(req.query, req.preparedStatement)

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
  async delete(req = { query, preparedStatement }) {
    const data = await this.query(req.query, req.preparedStatement)

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
  formatQuery(req = { query, preparedStatement }) {
    const connection = openConnection()
    const sql = connection.format(req.query, req.preparedStatement)
    connection.end()
    return sql
  },
}

module.exports = db
