const { Misc, Db, Password } = require('../../../middleware/index')

module.exports = class FixtureManager {
  constructor() {
    this.deadLoopCount = 0 // Pour eviter boucle de la mort
    this.fixtures = null
  }

  /**
   * Création des fixtures
   * Insertion des fixtures en base de données
   *
   * @returns {Object}
   */
  async get() {
    await this.save()

    return this.fixtures
  }

  /**
   * Suppréssion des fixtures
   * Suppréssion des fixtures en base de données
   * Restaure l'auto-incrémentation
   *
   * @void
   */
  async remove() {
    if (!this.fixtures) return

    await Db.delete({
      query: 'DELETE FROM `account` WHERE ? LIMIT 1',
      preparedStatement: { username: this.fixtures.username },
    })

    await Db.merge({
      query: 'ALTER TABLE `account` auto_increment = 1;',
    })

    this.fixtures = null
  }

  /**
   * Suppréssion toutes les fixtures en base de données
   * Restaure l'auto-incrémentation
   *
   * @void
   */
  async removeAll() {
    await Db.delete({
      query: 'DELETE FROM `account` WHERE ? AND ?',
      preparedStatement: [
        { firstname: 'Test___@units_tests.na' },
        { lastname: 'TEST___@UNITS_TESTS.NA' },
      ],
    })

    await Db.merge({
      query: 'ALTER TABLE `account` auto_increment = 1;',
    })
  }

  /**
   * Création des fixtures
   *
   * @void
   */
  async generate() {
    this.fixtures = {
      username: '_' + Misc.getRandomStr(15),
      mail: '_' + Misc.getRandomStr(20) + '@units_tests.na',
      password: await Password.hash('&_tests_units'),
      firstname: 'Test___@units_tests.na',
      lastname: 'TEST___@UNITS_TESTS.NA',
      is_lock: 0,
      is_admin: 0,
      jwt_hash: '__tests_units',
    }

    return this.fixtures
  }

  /**
   * Création des fixtures
   * Insertion des fixtures en base de données
   *
   * @void
   */
  async save() {
    if (this.fixtures) return

    await this.generate()

    const sql_request = await Db.get({
      query:
        'SELECT `id`,`username`,`mail`,`jwt_hash` FROM `account` WHERE `username` = ? OR `mail` = ? OR `jwt_hash` = ? LIMIT 1',
      preparedStatement: [
        this.fixtures.username,
        this.fixtures.mail,
        this.fixtures.jwt_hash,
      ],
    })

    if (sql_request[0]) {
      await Db.delete({
        query:
          'DELETE FROM `account` WHERE `username` = ? OR `mail` = ? OR `jwt_hash` = ? LIMIT 1',
        preparedStatement: [
          this.fixtures.username,
          this.fixtures.mail,
          this.fixtures.jwt_hash,
        ],
      })

      this.fixtures = null

      if (this.deadLoopCount > 3) {
        console.error('Impossible de créer la fixture')
      } else {
        this.deadLoopCount += 1
        await this.save()
      }
    } else {
      this.deadLoopCount = 0
      await Db.commit({
        query: 'INSERT INTO `account` SET ?',
        preparedStatement: [this.fixtures],
      })
    }
  }
}
