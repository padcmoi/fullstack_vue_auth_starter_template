const bcrypt = require('bcrypt')
const Db = require('./db')
const dotenv = require('dotenv')
dotenv.config()

// rounds=8 : ~40 hashes/sec
// rounds=9 : ~20 hashes/sec
// rounds=10: ~10 hashes/sec
// rounds=11: ~5  hashes/sec
// rounds=12: 2-3 hashes/sec
// rounds=13: ~1 sec/hash
// rounds=14: ~1.5 sec/hash
// rounds=15: ~3 sec/hash
// rounds=25: ~1 hour/hash
// rounds=31: 2-3 days/hash
const saltRounds = 8

const password = {
  /**
   * Vérifie si le mot de passe en clair correspond à un Hash
   *
   * @param {String} password
   * @param {String} passwordHash
   *
   * @returns {Boolean}
   */
  async check(password, passwordHash) {
    const match = await bcrypt.compare(password, passwordHash)
    return match ? true : false
  },

  /**
   * Hash un mot de passe en clair
   *
   * @param {String} password
   *
   * @returns {String}
   */
  async hash(password) {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  },

  /**
   * Vérifie si un mot de passe réspecte les exigences
   *
   * @param {String} plaintextPassword
   *
   * @return {Boolean}
   */
  isStrong(plaintextPassword) {
    if (typeof plaintextPassword === 'string' && plaintextPassword.length === 0)
      return null
    const check = {
      size: plaintextPassword.length,
      uppercase: 0,
      lowercase: 0,
      number: 0,
    }

    for (let i = 0; i < check['size']; i++) {
      if (plaintextPassword[i] >= 'a' && plaintextPassword[i] <= 'z') {
        check['lowercase']++
      } else if (plaintextPassword[i] >= 'A' && plaintextPassword[i] <= 'Z') {
        check['uppercase']++
      } else if (plaintextPassword[i] >= '0' && plaintextPassword[i] <= '9') {
        check['number']++
      }
    }

    if (
      check['size'] < parseInt(process.env.PASSWORD_CHECK_REQUIRE_LENGTH) ||
      check['uppercase'] < parseInt(process.env.PASSWORD_CHECK_REQUIRE_UPPER) ||
      check['lowercase'] < parseInt(process.env.PASSWORD_CHECK_REQUIRE_LOWER) ||
      check['number'] < parseInt(process.env.PASSWORD_CHECK_REQUIRE_NUMBER)
    ) {
      return false
    }

    return true
  },

  configuration() {
    const Obj = {
      password_check_requirement: {
        length: parseInt(process.env.PASSWORD_CHECK_REQUIRE_LENGTH),
        upper: parseInt(process.env.PASSWORD_CHECK_REQUIRE_UPPER),
        lower: parseInt(process.env.PASSWORD_CHECK_REQUIRE_LOWER),
        number: parseInt(process.env.PASSWORD_CHECK_REQUIRE_NUMBER),
      },
    }

    return Obj
  },
}

module.exports = password
