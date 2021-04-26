import { BButton } from 'bootstrap-vue'

/**
 * Vérifie le contenu et l'ordre des boutons
 *
 * * Pour Login
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe("Vérifie le contenu et l'ordre des boutons:", () => {
    it('Doit contenir 2 boutons', () => {
      expect(wrapper.findAllComponents(BButton)).toHaveLength(2)
    })
    it('1er show/hide password', async () => {
      const buttons = await wrapper.findAllComponents(BButton)
      expect(buttons.at(0).attributes('name')).toBe('show-password')
    })
    it('2eme submit', async () => {
      const buttons = await wrapper.findAllComponents(BButton)
      expect(buttons.at(1).attributes('name')).toBe('submit')
    })
  })
}
