const dotenv = require('dotenv')
dotenv.config()
const request = require('supertest')('http://127.0.0.1:3000')
const urn = request.get('/account/password/requirement?access_token=token')

describe('GET /account/password/requirement', () => {
  beforeEach(() => {})

  it('Réponse HTTP', (done) => {
    urn.then((response) => {
      // console.log(response.body)
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  describe('Check Values', () => {
    const expected_values = {
      password_check_requirement: {
        length: parseInt(process.env.PASSWORD_CHECK_REQUIRE_LENGTH),
        upper: parseInt(process.env.PASSWORD_CHECK_REQUIRE_UPPER),
        lower: parseInt(process.env.PASSWORD_CHECK_REQUIRE_LOWER),
        number: parseInt(process.env.PASSWORD_CHECK_REQUIRE_NUMBER),
      },
    }

    for (const [key, value] of Object.entries(expected_values)) {
      it(`${key}`, (done) => {
        urn.then((response) => {
          expect(response.body[key]).toStrictEqual(value)
          done()
        })
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
