import { BButton } from 'bootstrap-vue'
import { input_maxlength_mustbeundefined } from './common'

/**
 * Doit contenir un champ Password
 *
 * * Pour Login
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe('Doit contenir un champ Password:', () => {
    let input
    beforeEach(() => {
      input = wrapper.find('input[name="password"]')
    })

    it('Existe', () => {
      expect(input.exists()).toBeTruthy()
    })

    it('Typage par défaut en password', () => {
      expect(input.attributes('type')).toBe('password')
    })

    it('Test du bouton afficher/cacher mot de passe', async () => {
      const buttons = await wrapper.findAllComponents(BButton)

      await buttons.at(0).trigger('click')
      expect(input.attributes('type')).toBe('text')

      await buttons.at(0).trigger('click')
      expect(input.attributes('type')).toBe('password')
    })

    it('Pas de limite de caractères', () => {
      input_maxlength_mustbeundefined(input)
    })
  })
}
