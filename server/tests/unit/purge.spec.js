require('dotenv').config()
require('supertest')('http://127.0.0.1:3000')
const { FixtureManager } = require('./_misc/index')

describe('Purge', () => {
  it('Base de données', async (done) => {
    const fixtureManager = new FixtureManager()
    await fixtureManager.removeAll()
    done()
  })
})
