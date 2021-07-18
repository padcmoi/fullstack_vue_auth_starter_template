const { Misc, Db } = require('../../../../middleware/index')
const getCategorie = require('./getCategorie')
const getCsrfToken = require('../getCsrfToken')
const randomArray = require('../randomArray')
const randomStr = require('../randomStr')

module.exports = class Recipe {
  constructor(request, access_token) {
    this.request = request
    this.access_token = access_token

    this.params = null
    this.response = null
  }

  /**
   * Génére les données aléatoires
   *
   * @void
   */
  async makeData() {
    this.params = {
      title: '___Tests' + randomStr(15),
      description: randomStr(60),
      seasons: randomArray(['Winter', 'Autumn', 'Summer', 'Spring']),
      difficulty: randomArray(['EaSy', 'MeDIuM', 'hArD'], 1).join(),
      nutriscore: randomArray(['a', 'B', 'C', 'd', 'e'], 1).join(),
      preparation_time: Misc.getRandomInt(180, 600),
      cooking_time: Misc.getRandomInt(300, 600),
      category: randomArray(await getCategorie(), 1).join(),
    }
  }

  /**
   * Retourne les données générées
   *
   * @returns {Object}
   */
  getData() {
    if (!this.params || !this.params.title) return null
    return this.params
  }

  /**
   * Retourne la dernière réponse de l'Api
   *
   * @returns {Object}
   */
  getResponse() {
    if (!this.response || !this.params) return null
    return this.response
  }

  /**
   * Effectue une requete vers l'Api
   * Pour créer une recette
   *
   * @void
   */
  async add() {
    if (!this.request) return
    if (!this.params) await this.makeData()

    const csrf_header = await getCsrfToken(this.request)

    this.response = await this.request
      .post('/recipe?access_token=' + this.access_token)
      .set('csrf-token', csrf_header)
      .send({
        params: this.params,
      })
      .then((response) => response.body)
  }

  /**
   * Efface en base de données la dernière recette crée
   * Attention cette methode n'effacera pas
   * l'espace de stockage pour les uploads
   *
   * @void
   */
  async remove() {
    if (!this.params || !this.params.title) return

    await Db.delete({
      query: 'DELETE FROM `recipes` WHERE `title` = ? LIMIT 1',
      preparedStatement: [this.params.title],
    })
  }
}
