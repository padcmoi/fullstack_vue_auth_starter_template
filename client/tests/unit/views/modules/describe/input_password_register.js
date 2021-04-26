import { BButton } from 'bootstrap-vue'
import { input_maxlength_mustbeundefined } from './common'

/**
 * Doit contenir 2 champs Password
 *
 * * Pour Register
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe('Doit contenir 2 champs Password:', () => {
    let input1, input2
    beforeEach(() => {
      input1 = wrapper.find(`input[name="password1"]`)
      input2 = wrapper.find(`input[name="password2"]`)
    })

    describe('Champ n°1:', () => {
      it('Existe', () => {
        expect(input1.exists()).toBeTruthy()
      })
      it('Typage par défaut en text', () => {
        expect(input1.attributes('type')).toBe('text')
      })
      it('Pas de limite de caractères', () => {
        input_maxlength_mustbeundefined(input1)
      })
    })

    describe('Champ n°2:', () => {
      it('Existe', () => {
        expect(input2.exists()).toBeTruthy()
      })
      it('Typage par défaut en text', () => {
        expect(input2.attributes('type')).toBe('text')
      })
      it('Pas de limite de caractères', () => {
        input_maxlength_mustbeundefined(input2)
      })
    })

    describe('Générateur de mot de passe:', () => {
      it('Test du bouton générer un mot de passe', async () => {
        const buttons = await wrapper.findAllComponents(BButton)
        await buttons.at(0).trigger('click')

        const gen_password = wrapper.vm.generated_password

        expect(gen_password).toBe(wrapper.vm.form.password1)
      })
    })

    it('Les champs doivent être identique', () => {
      expect(input1.element.value).toBe(input2.element.value)
    })
  })
}
