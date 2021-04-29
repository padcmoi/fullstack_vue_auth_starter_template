const { Misc } = require('../middleware/index')
const createFile = require('create-file')
const dotenv = require('dotenv')
dotenv.config()

if (typeof process.env.PORT !== 'undefined') return

const key = Misc.getRandomStr(
  64,
  '_azertyuiopqsdfghjklmwxcvbn_AZERTYUIOPMLKJHGFDSQWXCVBN_123456789_@'
)

const data = `NODE_ENV=development
PORT=3000
MULTI_THREAD_LIMIT=0

PASSWORD_CHECK_REQUIRE_LENGTH=8
PASSWORD_CHECK_REQUIRE_UPPER=1
PASSWORD_CHECK_REQUIRE_LOWER=2
PASSWORD_CHECK_REQUIRE_NUMBER=3

JWT_PRIVATE_KEY=${key}
JWT_EXPIRES_IN=3600
JWT_NOT_BEFORE=3300

MYSQL_HOST=localhost
MYSQL_USER=user
MYSQL_PASS=password
MYSQL_DB=db
`

createFile('.env', data, function (err) {})
