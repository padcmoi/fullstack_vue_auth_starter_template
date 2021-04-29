const { View } = require('../middleware/index')

const express = require('express')
const router = express.Router()

router.get('/', async function (req, res, next) {
  const msg = 'its HelloWorld'
  console.log(msg)
  View.json(res, { msg })
})

module.exports = router
