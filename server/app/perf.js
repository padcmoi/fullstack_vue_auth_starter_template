let ms = 0

const start = function () {
  ms = new Date().getTime()
  return parseFloat(ms / 1000)
}

const end = function () {
  const result = new Date().getTime() - ms
  return parseFloat(result / 1000)
}

module.exports = { start, end }
