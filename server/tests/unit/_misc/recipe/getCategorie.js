const { Db } = require('../../../../middleware/index')

/**
 * Recupère toutes les categories
 *
 * @returns {Array}
 */
module.exports = async () => {
  const categories = []

  const select = await Db.get({
    query: 'SELECT category FROM categories',
  })

  for (const obj of select) {
    if (!obj.category) continue
    categories.push(obj.category)
  }

  return categories
}
