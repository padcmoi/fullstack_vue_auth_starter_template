const { View } = require('../middleware/index')
const modelCsrf = require('../model/csrf')

const express = require('express')
const router = express.Router()
const csurf = require('csurf')

router
  .get('/generate', csurf({ cookie: true }), async function (req, res, next) {
    const csrf_token = req.query['csrf_token']
    const newToken = req.csrfToken()

    const view = await modelCsrf.generate({ newToken, oldToken: csrf_token })

    View.json(res, view)
  })

  .put('/renew', async function (req, res, next) {
    const view = await modelCsrf.renew({
      headerToken: req.headers['csrf-token'],
    })

    View.json(res, view)
  })

module.exports = router
