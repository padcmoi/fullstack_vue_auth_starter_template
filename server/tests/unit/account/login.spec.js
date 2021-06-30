const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const { Misc, Db, Password } = require('../../../middleware/index')

describe('POST /account/login', () => {
  let csrf_header, fixtures
  const urn = '/account/login'

  beforeEach(async () => {
    if (!csrf_header) {
      csrf_header = await request
        .get('/csrf/generate')
        .set({ 'csrf-token': '' })
        .then((response) => response.body.csrf_token)
      if (!csrf_header) csrf_header = ''
    }
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

  describe('Login successfull', () => {
    let response
    const expected_values = {
      isLock: false,
      isLoggedIn: true,
      isAdmin: false,
      firstName: 'Tests',
      lastName: 'UNITS',
      toastMessage: [],
      // access_token: response.access_token,
    }

    beforeEach(async () => {
      if (!response) {
        response = await request
          .post(urn)
          .set('csrf-token', csrf_header)
          .send({
            params: { user: fixtures.username, password: '&_tests_units' },
          })
          .then((response) => response.body)
      }
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }
    it(`access_token`, (done) => {
      expect(response.access_token.length).toBeGreaterThanOrEqual(1)
      done()
    })
  })

  describe('Login fail with fake username or password', () => {
    let response
    const expected_values = {
      isLock: false,
      isLoggedIn: false,
      isAdmin: false,
      toastMessage: [{ msg: 'Identification incorrecte' }],
      access_token: '',
    }

    beforeEach(async () => {
      if (!response) {
        response = await request
          .post(urn)
          .set('csrf-token', csrf_header)
          .send({
            params: {
              user: '__' + Misc.getRandomStr(20),
              password: 'false_login',
            },
          })
          .then((response) => response.body)
      }
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }
  })

  describe('Login fail with locked account', () => {
    let response,
      affected_rows = 0
    const expected_values = {
      isLock: true,
      isLoggedIn: false,
      isAdmin: false,
      toastMessage: [{ msg: 'Compte verrouillé' }],
      access_token: '',
    }

    beforeEach(async () => {
      if (!response) {
        affected_rows = await Db.merge({
          query: 'UPDATE account SET `is_lock` = 1 WHERE ? LIMIT 1',
          preparedStatement: [{ username: fixtures.username }],
        })

        response = await request
          .post(urn)
          .set('csrf-token', csrf_header)
          .send({
            params: { user: fixtures.username, password: '&_tests_units' },
          })
          .then((response) => response.body)
      }
    })

    it(`Update fixtures`, (done) => {
      expect(affected_rows).toBeGreaterThanOrEqual(1)
      done()
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }
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

  afterAll(async () => {
    // Restaure l'auto incrémentation
    await Db.merge({
      query: 'ALTER TABLE `account` auto_increment = 1;',
    })
    // Restaure l'auto incrémentation
  })
})
