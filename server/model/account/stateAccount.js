const { Db, Jwt } = require('../../middleware/index')

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = async function (_ = { access_token }) {
  // TO DO à partir de ce token req.query['access_token'],
  // on vérifie les droits en base de données et recuperer les informations

  // Met à jour le token
  const access_token = await Jwt.update(_.access_token)

  // await Jwt.updateState({ newToken: token })

  // réponse standard pour utilisateur non connecté
  let response = {
    access_token: null,
    userId: -1,
    isLoggedIn: false,
    isAdmin: false,
    username: null,
    firstname: null,
    lastname: null,
  }

  if (access_token) {
    const payload1 = await Jwt.read(access_token)

    if (_.access_token !== access_token) {
      // TO DO, le jeton a été mis à jour donc nous allons faire un update en base de données

      await Jwt.accountUpdate(access_token, payload1.userId)
    }

    // SELECT * FROM account WHERE `id` = 1 AND `jwt_hash` = MD5('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW4iOm51bGwsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJwYWRjbW9pIiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYxNjIwMDU2MSwiZXhwIjoxNjE2MjAwNTkxfQ.44Q6te_RKwcgRPAuOwBQASQOXS7WjjYwKuBDvQnAWN0') LIMIT 1
    let data = await Db.get({
      query:
        'SELECT * FROM account WHERE `id` = ? AND `jwt_hash` = MD5(?) LIMIT 1',
      preparedStatement: [parseInt(payload1.userId), access_token],
    })

    const accountData = data && data[0]

    let isLock = accountData && accountData.is_lock ? true : false
    let isLoggedIn =
      accountData && accountData.is_logged_in && !isLock ? true : false
    let isAdmin = accountData && accountData.is_admin ? true : false
    const userId = parseInt(accountData && accountData.id) || -1
    let username = (accountData && accountData.username) || null
    let firstname = (accountData && accountData.firstname) || null
    let lastname = (accountData && accountData.lastname) || null

    if (isLock) {
      await Db.merge({
        query: 'UPDATE account SET `is_logged_in` = 0 WHERE ? LIMIT 1',
        preparedStatement: [{ id: parseInt(userId) }],
      })
    }

    response = {
      userId,
      isLoggedIn,
      isAdmin,
      username,
      firstname,
      lastname,
      access_token,
    }
  }

  return response
}
