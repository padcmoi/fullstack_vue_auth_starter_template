const express = require('express')
const createError = require('http-errors')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { start, end } = require('./app/perf')
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

  app
    // .use('/test', require('./controller/test'))
    .use('/csrf', require('./controller/csrf'))
    .use('/account', require('./controller/account'))

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
