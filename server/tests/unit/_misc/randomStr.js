const { Misc, Db, Password } = require('../../../middleware/index')

const randomStr = function (size = 0) {
  const hack = '<script>alert("HACK")</script>'
  const random = Misc.getRandomStr(
    parseInt(size),
    ' azertyuiopqsdfghjklmwxcvbn\'"éàùô '
  )
  const result = hack + random
  return result
}

module.exports = randomStr
