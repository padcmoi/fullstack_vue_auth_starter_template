const { Csrf, View } = require('../middleware/index')
const modelAccount = require('../model/account')

const express = require('express')
const router = express.Router()

router

  .get('/check', async function (req, res, next) {
    const access_token = req.query['access_token']
    const view = await modelAccount.stateAccount({ access_token })

    View.json(res, view)
  })

  .get('/password/requirement', function (req, res, next) {
    const view = modelAccount.getPasswordCheckRequirement()

    View.json(res, view)
  })

  .get('/status/user/:user', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const username = req.params.user || ''
    const view = await modelAccount.isUserAvailable({ username })

    View.json(res, view)
  })

  .get('/status/mail/:mail', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const mail = req.params.mail || ''
    const view = await modelAccount.isMailAvailable({ mail })

    View.json(res, view)
  })

  .post('/login', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const params = {
      user: req.body.params.user || '',
      password: req.body.params.password || '',
      captcha: req.body.params.captcha || '',
    }
    const view = await modelAccount.toLogin({ params })

    View.json(res, view)
  })

  .post('/register', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const params = {
      user: req.body.params.user || '',
      password1: req.body.params.password1 || '',
      password2: req.body.params.password2 || '',
      email1: req.body.params.email1 || '',
      email2: req.body.params.email2 || '',
      firstname: req.body.params.firstname || '',
      lastname: req.body.params.lastname || '',
      captcha: req.body.params.captcha || '',
    }
    const view = await modelAccount.toRegister({ params })

    View.json(res, view)
  })

  .delete('/logout', async function (req, res, next) {
    // Ca sert à quelque chose de vérifier l'entete pour un logout ?

    const view = await modelAccount.toLogout(req.query['access_token'])

    View.json(res, view)
  })

  .post('/password/recovery', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const params = {
      user: req.body.params.user || '',
      email: req.body.params.email || '',
      captcha: req.body.params.captcha || '',
    }
    const view = await modelAccount.passwordRecovery({ params })

    View.json(res, view)
  })

  .put('/dashboard/personnal', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const params = {
      email1: req.body.params.email1 || '',
      email2: req.body.params.email2 || '',
      firstname: req.body.params.firstname || '',
      lastname: req.body.params.lastname || '',
      captcha: req.body.params.captcha || '',
    }
    const view = await modelAccount.dashboardPersonnal({ params })

    View.json(res, view)
  })

  .put('/dashboard/password', async function (req, res, next) {
    if (!(await Csrf.isValidHeader(req, res))) return

    const params = {
      password1: req.body.params.password1 || '',
      password2: req.body.params.password2 || '',
      captcha: req.body.params.captcha || '',
    }
    const view = await modelAccount.dashboardPassword({ params })

    View.json(res, view)
  })

module.exports = router
