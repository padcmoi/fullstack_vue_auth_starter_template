const { Jwt, Csrf, Db, View, Password } = require('../middleware/index')

setInterval(async () => {
  await Csrf.databasePurge()
  await Jwt.databasePurge()
}, 60000)
