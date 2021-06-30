const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const { Misc, Db, Form, Password } = require('../../../middleware/index')
const { passwordGenerator } = require('../_misc/index')

describe('POST /account/register', () => {
  let csrf_header, fixtures
  const urn = '/account/register'

  beforeAll(async () => {
    csrf_header = await request
      .get('/csrf/generate')
      .set({ 'csrf-token': '' })
      .then((response) => response.body.csrf_token)
    if (!csrf_header) csrf_header = ''

    const password_generated = '&' + passwordGenerator()
    const mail_generated = Misc.getRandomStr(20) + '@units_tests.na'

    fixtures = {
      user: '&_' + Misc.getRandomStr(15),
      password1: password_generated,
      password2: password_generated,
      email1: '&_' + mail_generated,
      email2: '&_' + mail_generated,
      firstname: '&_Tests',
      lastname: '&_UNITS',
      captcha: '',
    }
  })

  afterAll(async () => {
    await Db.delete({
      query: 'DELETE FROM account WHERE ? LIMIT 1',
      preparedStatement: { username: Form.sanitizeString(fixtures.user) },
    })

    // Restaure l'auto incrémentation
    await Db.merge({
      query: 'ALTER TABLE `account` auto_increment = 1;',
    })
    // Restaure l'auto incrémentation
  })

  describe('Account created with successfull', () => {
    let response, select
    const expected_values = {
      isRegistered: true,
      toastMessage: [],
    }

    beforeAll(async () => {
      response = await request
        .post(urn)
        .set('csrf-token', csrf_header)
        .send({
          params: fixtures,
        })
        .then((response) => response.body)

      let req = await Db.get({
        query: 'SELECT * FROM account WHERE username = ? LIMIT 1',
        preparedStatement: [Form.sanitizeString(fixtures.user)],
      })

      select = req && req[0]
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }

    describe('Comparaison avec la base de données', () => {
      it('username', async (done) => {
        expect(
          Misc.lowerCase(Form.sanitizeString(fixtures['user']))
        ).toStrictEqual(select['username'])
        done()
      })
      it('password bcrypt / comparaison hash', async (done) => {
        const isValidPassword = await Password.check(
          fixtures['password1'],
          select['password']
        )
        if (!isValidPassword) {
          console.log('LOGN>> ' + fixtures['user'])
          console.log('PASS>> ' + fixtures['password1'])
        }
        expect(isValidPassword).toBeTruthy()
        expect(fixtures['password1']).toStrictEqual(fixtures['password2'])
        done()
      })
      it('mail', async (done) => {
        expect(
          Misc.lowerCase(Form.sanitizeString(fixtures['email1']))
        ).toStrictEqual(select['mail'])
        expect(
          Misc.lowerCase(Form.sanitizeString(fixtures['email2']))
        ).toStrictEqual(select['mail'])
        done()
      })
      it('firstname', async (done) => {
        expect(
          Misc.capitalize(Form.sanitizeString(fixtures['firstname']))
        ).toStrictEqual(select['firstname'])
        done()
      })
      it('lastname', async (done) => {
        expect(
          Misc.upperCase(Form.sanitizeString(fixtures['lastname']))
        ).toStrictEqual(select['lastname'])
        done()
      })
      it('compte vérrouillé par défaut', async (done) => {
        expect(select['is_lock']).toBe(1)
        done()
      })
    })
  })

  describe('Account failed with username and mail', () => {
    let response
    const expected_values = {
      isRegistered: false,
      toastMessage: [
        { msg: "Le nom d'utilisateur est déja pris" },
        { msg: "L'adresse de courriel est déja prise" },
      ],
    }

    beforeAll(async () => {
      const params = fixtures

      response = await request
        .post(urn)
        .set('csrf-token', csrf_header)
        .send({ params })
        .then((response) => response.body)
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }
  })

  describe('Account failed with username', () => {
    let response
    const expected_values = {
      isRegistered: false,
      toastMessage: [{ msg: "Le nom d'utilisateur est déja pris" }],
    }

    beforeAll(async () => {
      const password_generated = '&' + passwordGenerator()
      const mail_generated = Misc.getRandomStr(20) + '@units_tests.na'

      const params = {
        user: fixtures.user,
        password1: password_generated,
        password2: password_generated,
        email1: '&_' + mail_generated,
        email2: '&_' + mail_generated,
        firstname: '&_Tests',
        lastname: '&_UNITS',
        captcha: '',
      }

      response = await request
        .post(urn)
        .set('csrf-token', csrf_header)
        .send({ params })
        .then((response) => response.body)
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }
  })
  describe('Account failed with mail', () => {
    let response
    const expected_values = {
      isRegistered: false,
      toastMessage: [{ msg: "L'adresse de courriel est déja prise" }],
    }

    beforeAll(async () => {
      const password_generated = '&' + passwordGenerator()

      const params = {
        user: '&_' + Misc.getRandomStr(15),
        password1: password_generated,
        password2: password_generated,
        email1: fixtures.email1,
        email2: fixtures.email2,
        firstname: '&_Tests',
        lastname: '&_UNITS',
        captcha: '',
      }

      response = await request
        .post(urn)
        .set('csrf-token', csrf_header)
        .send({ params })
        .then((response) => response.body)
    })

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        expect(response[key]).toStrictEqual(value)
        done()
      })
    }
  })
})
