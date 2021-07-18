const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const { Misc, Db, Password } = require('../../middleware/index')
const { getCsrfToken, FixtureManager, goLogin } = require('./_misc/index')

describe('GET /test', () => {
  let fixtureManager, csrf_header, fixtures, login_response, access_token

  beforeAll(async () => {
    fixtureManager = new FixtureManager()

    csrf_header = await getCsrfToken(request)

    fixtures = await fixtureManager.get()

    login_response = await goLogin(request, fixtures.username, '&_tests_units')

    access_token = login_response.access_token || ''
  })

  it('Check login', (done) => {
    const check = {
      isLock: 'boolean',
      isLoggedIn: 'boolean',
      isAdmin: 'boolean',
      firstName: 'string',
      lastName: 'string',
      toastMessage: 'object',
      access_token: 'string',
      execution_time: 'object',
    }

    for (const key in check) expect(typeof login_response[key]).toBe(check[key])

    done()
  })

  afterAll(async () => {})
})
