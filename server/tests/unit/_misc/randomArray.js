const { Misc, Db, Password } = require('../../../middleware/index')

const randomArray = function (available, max = -1, min = 0) {
  let range = parseInt(max)
  if (max === -1) {
    range = Misc.getRandomInt(parseInt(min), available.length)
  }

  const result = []

  for (let i = 0; i < range; i++) {
    const idx = Misc.getRandomInt(0, available.length - 1)
    result.push(available[idx])
    available.splice(idx, 1)
  }

  return result
}

module.exports = randomArray
