const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const { Misc, Db } = require('../../../../middleware/index')

describe('GET /account/status/mail/:mail', () => {
  let csrf_header, urn1, urn2

  const fixtures = {
    username: '_' + Misc.getRandomStr(20),
    mail: '_' + Misc.getRandomStr(20) + '@units_tests.na',
    password: '',
    firstname: '',
    lastname: '',
    is_lock: 0,
  }
  const non_existent_data = '_' + Misc.getRandomStr(25) + '@units_tests.na'

  beforeEach(async () => {
    if (!csrf_header) {
      csrf_header = await request
        .get('/csrf/generate')
        .then((response) => response.body.csrf_token)
      if (!csrf_header) csrf_header = ''
    }
  })

  it('Create fixtures', async (done) => {
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

    urn1 = request.get('/account/status/mail/' + non_existent_data)
    urn2 = request.get('/account/status/mail/' + fixtures.mail)

    expect(inserted_row).toBeGreaterThanOrEqual(1)
    done()
  })
  it('Réponse HTTP', async (done) => {
    await urn1
      .set('csrf-token', csrf_header)
      .then((response) => expect(response.statusCode).toBe(200))

    await urn2
      .set('csrf-token', csrf_header)
      .then((response) => expect(response.statusCode).toBe(200))

    done()
  })
  it('Ask a csrf token', async (done) => {
    expect(csrf_header).toBeDefined()
    expect(csrf_header).not.toBe('')
    done()
  })
  describe('if isAvailable is true', () => {
    let body

    beforeEach(async () => {
      body = await urn1
        .set('csrf-token', csrf_header)
        .then((response) => response.body)
    })

    it('isAvailable must be true', (done) => {
      expect(body.isAvailable).toBeTruthy()
      done()
    })
  })
  describe('if isAvailable is false', () => {
    let body

    beforeEach(async () => {
      body = await urn2
        .set('csrf-token', csrf_header)
        .then((response) => response.body)
    })

    it('isAvailable must be false', (done) => {
      expect(body.isAvailable).toBeFalsy()
      done()
    })
  })
  it('Delete fixtures', async (done) => {
    const row_deleted = await Db.delete({
      query: 'DELETE FROM account WHERE ? LIMIT 1',
      preparedStatement: { username: fixtures.username },
    })
    expect(row_deleted).toBeGreaterThanOrEqual(1)
    done()
  })

  afterAll(async () => {
    // Restaure l'auto incrémentation
    await Db.merge({
      query: 'ALTER TABLE `account` auto_increment = 1;',
    })
    // Restaure l'auto incrémentation
  })
})
