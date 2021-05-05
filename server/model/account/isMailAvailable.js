const { Db } = require('../../middleware/index')
const dotenv = require('dotenv')
dotenv.config()

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = async function (_ = { mail }) {
  const mail = _.mail.toLowerCase() || ''

  // SELECT * FROM account WHERE `id` = 1 AND `jwt_hash` = MD5('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW4iOm51bGwsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJwYWRjbW9pIiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYxNjIwMDU2MSwiZXhwIjoxNjE2MjAwNTkxfQ.44Q6te_RKwcgRPAuOwBQASQOXS7WjjYwKuBDvQnAWN0') LIMIT 1
  let data = await Db.get({
    query: 'SELECT id, mail FROM account WHERE ? LIMIT 1',
    preparedStatement: [{ mail }],
  })

  // console.log(data)

  let accountData = data && data[0]
  let isAvailable = accountData && accountData.mail ? false : true

  const result = { isAvailable }

  // console.log('/status/mail/' + mail)

  return result
}
