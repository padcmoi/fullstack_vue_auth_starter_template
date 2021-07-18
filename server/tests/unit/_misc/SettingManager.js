const Db = require('../../../middleware/js/db')

module.exports = class SettingManager {
  constructor() {
    this.isInit = false
    this.origin_settings = null
  }

  /**
   * Données d'origine avant execution
   *
   * @returns {Object}
   */
  async getOriginData() {
    await this.saveOriginData()

    return this.origin_settings
  }

  /**
   * Tous les parametres settings
   *
   * @void
   */
  async saveOriginData() {
    if (this.origin_settings) return

    const sql_request = await Db.get({
      query: 'SELECT * FROM `settings` LIMIT 1',
    })

    const settings = sql_request && sql_request[0]
    delete settings.updated_at

    this.origin_settings = settings
  }

  /**
   * Configure la table settings
   * afin de pouvoir effectuer des tests sans restrictions
   *
   * @void
   */
  async setDefault() {
    await Db.merge({
      query: 'UPDATE `settings` SET ? LIMIT 1',
      preparedStatement: [
        {
          maintenance: 0,
          can_create_account: 1,
          user_can_create_recipe: 1,
          user_can_comment: 1,
          user_can_add_ingredient: 1,
        },
      ],
    })
  }

  /**
   * Restaure la table settings aux paramètres par défaut
   *
   * @void
   */
  async restoreDefault() {
    await Db.merge({
      query: 'UPDATE `settings` SET ? LIMIT 1',
      preparedStatement: [this.origin_settings],
    })

    this.isInit = false
    this.origin_settings = null
  }
}
