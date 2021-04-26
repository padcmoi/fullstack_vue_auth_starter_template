import { BLink } from 'bootstrap-vue'

/**
 * Vérifie le contenu et l'ordre des liens
 *
 * * Pour Register
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe("Vérifie le contenu et l'ordre des liens:", () => {
    it('Doit contenir 1 lien', () => {
      expect(wrapper.findAllComponents(BLink)).toHaveLength(1)
    })
    it('1er vers login', async () => {
      const links = await wrapper.findAllComponents(BLink)
      expect(links.at(0).attributes('to')).toBe('login')
    })
  })
}
