const dotenv = require('dotenv')
dotenv.config()
const { Misc, Db, Password } = require('../../../middleware/index')
const request = require('supertest')('http://127.0.0.1:3000')

describe('GET /account/check', () => {
  let fixtures
  const expected_values = {
    access_token: null,
    userId: -1,
    isLoggedIn: false,
    isAdmin: false,
    username: null,
    firstname: null,
    lastname: null,
  }

  describe('Send fake or empty token', () => {
    describe('Check Default Values', () => {
      let response
      const urn = request.get('/account/check?access_token=token')

      beforeAll(async () => {
        response = await urn.then((response) => response.body)
      })

      it('Réponse HTTP', (done) => {
        urn.then((response) => {
          expect(response.statusCode).toBe(200)
          done()
        })
      })

      for ([key, value] of Object.entries(expected_values)) {
        it(`${key}`, () => {
          expect(expected_values[key]).toStrictEqual(response[key])
        })
      }

      it(`Same Object`, (done) => {
        urn.then((response) => {
          delete response.body.execution_time
          expect(response.body).toStrictEqual(expected_values)
          done()
        })
      })
    })
  })

  describe('Fixtures', () => {
    it('Create fixtures', async (done) => {
      fixtures = {
        username: '_' + Misc.getRandomStr(15),
        mail: '_' + Misc.getRandomStr(20) + '@units_tests.na',
        password: await Password.hash('&_tests_units'),
        firstname: 'Tests',
        lastname: 'UNITS',
        is_lock: 0,
        jwt_hash: '__tests_units',
      }

      let inserted_row = 0

      const select = await Db.get({
        query: 'SELECT id FROM account WHERE username = ? OR mail = ? LIMIT 1',
        preparedStatement: [fixtures.username, fixtures.mail],
      })

      if (!select[0]) {
        inserted_row = await Db.commit({
          query: 'INSERT INTO account SET ?',
          preparedStatement: [fixtures],
        })
      }

      expect(inserted_row).toBeGreaterThanOrEqual(1)
      done()
    })
  })

  describe('Use fixtures for login then check return values with true login', () => {
    let response, csrf_header

    beforeAll(() => {
      expected_values.isLoggedIn = true
      expected_values.isAdmin = false
      expected_values.username = fixtures.username
      expected_values.firstname = fixtures.firstname
      expected_values.lastname = fixtures.lastname
    })

    it('fixtures exists', async (done) => {
      const select = await Db.get({
        query: 'SELECT id FROM account WHERE username = ? AND mail = ? LIMIT 1',
        preparedStatement: [fixtures.username, fixtures.mail],
      })

      expected_values.userId = parseInt(select[0].id || -1)

      expect(select[0]).toBeDefined()
      done()
    })

    it(`Login and get a Json Web Token`, async (done) => {
      csrf_header = await request
        .get('/csrf/generate')
        .then((response) => response.body.csrf_token)

      if (!response) {
        response = await request
          .post('/account/login')
          .set('csrf-token', csrf_header || '')
          .send({
            params: { user: fixtures.username, password: '&_tests_units' },
          })
          .then((response) => response.body)
      }

      expected_values.access_token = response.access_token
      expect(response.access_token.length).toBeGreaterThanOrEqual(1)
      done()
    })

    describe('Check Values updated', () => {
      let response

      beforeAll(async () => {
        response = await request
          .get('/account/check?access_token=' + expected_values.access_token)
          .then((response) => response.body)
      })

      it('Réponse HTTP', (done) => {
        request
          .get('/account/check?access_token=' + expected_values.access_token)
          .then((response) => {
            expect(response.statusCode).toBe(200)
            done()
          })
      })

      for ([key, value] of Object.entries(expected_values)) {
        it(`${key}`, () => {
          expect(expected_values[key]).toStrictEqual(response[key])
        })
      }
    })
  })

  describe('Fixtures', () => {
    it('Delete fixtures', async (done) => {
      const row_deleted = await Db.delete({
        query: 'DELETE FROM account WHERE ? LIMIT 1',
        preparedStatement: { username: fixtures.username },
      })
      expect(row_deleted).toBeGreaterThanOrEqual(1)
      done()
    })
  })
})
