import { BLink } from 'bootstrap-vue'

/**
 * Vérifie le contenu et l'ordre des liens
 *
 * * Pour Login
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe("Vérifie le contenu et l'ordre des liens:", () => {
    it('Doit contenir 2 liens', () => {
      expect(wrapper.findAllComponents(BLink)).toHaveLength(2)
    })
    it('1er vers forgot-password', async () => {
      const links = await wrapper.findAllComponents(BLink)
      expect(links.at(0).attributes('to')).toBe('forgot-password')
    })
    it('2eme vers register', async () => {
      const links = await wrapper.findAllComponents(BLink)
      expect(links.at(1).attributes('to')).toBe('register')
    })
  })
}
