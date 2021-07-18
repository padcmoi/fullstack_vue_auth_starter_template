const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const { Db } = require('../../../middleware/index')
const { getCsrfToken, FixtureManager, goLogin } = require('../_misc/index')

describe('POST /account/login', () => {
  let fixtureManager, csrf_header, fixtures

  beforeAll(async () => {
    fixtureManager = new FixtureManager()

    csrf_header = await getCsrfToken(request)
  })

  it('Login successfull', async (done) => {
    fixtures = await fixtureManager.get()

    const response = await goLogin(request, fixtures.username, '&_tests_units')

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

    for (const key in check) expect(typeof response[key]).toBe(check[key])
    expect(response.isLock).toBeFalsy()
    expect(response.isLoggedIn).toBeTruthy()
    done()
  })
  it('Login fail with locked account', async (done) => {
    fixtureManager.fixtures = null
    fixtures = await fixtureManager.get()

    await Db.merge({
      query: 'UPDATE `account` SET `is_lock` = 1 WHERE ? LIMIT 1',
      preparedStatement: [{ username: fixtures.username }],
    })

    const response = await goLogin(request, fixtures.username, '&_tests_units')

    expect(response.isLock).toBeTruthy()
    expect(response.isLoggedIn).toBeFalsy()
    expect(response.toastMessage.length).toBe(1)
    expect(response.access_token).toBe('')
    done()
  })

  afterAll(async () => {})
})
