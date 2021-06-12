const express = require('express')
const createError = require('http-errors')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { start, end } = require('./app/perf')
const readDir = require('readdir')
const controllerFiles = readDir.readSync('controller/', ['**.js'])
const dotenv = require('dotenv')
dotenv.config()

if (require('./app/cluster')) {
  const app = express()

  app
    .use(cors())
    // .use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .all('*', function (req, res, next) {
      start()
      next() // pass control to the next handler
    })

  for (const file of controllerFiles) {
    const _file = file.split('.')[0] || ''
    if (_file.length === 0) continue

    app.use(`/${_file}`, require(`./controller/${_file}`))
  }

  // error handler
  app
    .use(function (req, res, next) {
      next(createError(404))
    })
    .use(function (err, req, res, next) {
      const view = {
        api_response: 'forbidden request',
        execution_time: { ms: end() },
      }

      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      res.type('application/json')
      res.json(view)
    })

  // All workers use this port
  app.listen(process.env.PORT || 3000)
}
