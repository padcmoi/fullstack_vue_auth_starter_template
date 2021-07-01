const { end } = require('../../app/perf')

const json = function (res, view) {
  view.execution_time = { ms: end() }
  res.type('application/json')
  // res.json(JSON.stringify(view))
  res.json(view)
}

module.exports = { json }
