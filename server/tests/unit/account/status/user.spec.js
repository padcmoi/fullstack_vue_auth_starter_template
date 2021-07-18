const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const { Misc } = require('../../../../middleware/index')
const { getCsrfToken, FixtureManager, goLogin } = require('../../_misc/index')

describe('GET /account/status/user/:user', () => {
  let fixtureManager, csrf_header, fixtures, login_response, access_token

  beforeAll(async () => {
    fixtureManager = new FixtureManager()

    csrf_header = await getCsrfToken(request)

    fixtures = await fixtureManager.get()

    login_response = await goLogin(request, fixtures.username, '&_tests_units')

    access_token = login_response.access_token || ''
  })

  it('Username busy on fixtures', async (done) => {
    const response = await request
      .get('/account/status/user/' + fixtures.username)
      .set('csrf-token', csrf_header)
      .then((response) => response.body)

    expect(response.isAvailable).toBeFalsy()
    expect(response.isLocked).toBeDefined()
    expect(response.isLocked).toBeFalsy()
    done()
  })
  it('Username free', async (done) => {
    const username_free = '_' + Misc.getRandomStr(25) + '@units_tests.na'

    const response = await request
      .get('/account/status/user/' + username_free)
      .set('csrf-token', csrf_header)
      .then((response) => response.body)

    expect(response.isAvailable).toBeTruthy()
    expect(response.isLocked).toBeUndefined()
    done()
  })

  afterAll(async () => {})
})
