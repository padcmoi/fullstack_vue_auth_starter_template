const { View } = require('../middleware/index')
const modelCsrf = require('../model/csrf')

const express = require('express')
const router = express.Router()
const csurf = require('csurf')

router
  .get('/generate', csurf({ cookie: true }), async function (req, res, next) {
    const newToken = req.csrfToken()

    const view = await modelCsrf.generate(req, newToken)

    View.json(res, view)
  })

  .put('/renew', async function (req, res, next) {
    console.log('/renew ' + req.headers['csrf-token'])

    const view = await modelCsrf.renew(req)

    View.json(res, view)
  })

module.exports = router
