import { BButton, BForm } from 'bootstrap-vue'
import { isCapitalized, isLowercase, isUppercase } from '../../../common/misc'
import { Lowercase, Uppercase, Capitalize } from '@/tools/index'

/**
 * Soumet un formulaire complet
 *
 * @param {Object} wrapper
 * @param {Object} submitForm
 * @void
 */
export default (wrapper, submitForm) => {
  describe('Soumet un formulaire:', () => {
    beforeEach(async () => {
      localStorage.removeItem('accountCreated')

      // Formattage des champs
      submitForm['username_reg'] = Lowercase(submitForm['username_reg'])
      submitForm['email1'] = Lowercase(submitForm['email1'])
      submitForm['email2'] = Lowercase(submitForm['email2'])
      submitForm['firstname'] = Capitalize(submitForm['username_reg'])
      submitForm['lastname'] = Uppercase(submitForm['username_reg'])

      // Soumet des données correctes
      wrapper.find('input[name="username"]').setValue(submitForm.username_reg)
      wrapper.find('input[name="password1"]').setValue(submitForm.password1)
      wrapper.find('input[name="password2"]').setValue(submitForm.password2)
      wrapper.find('input[name="email1"]').setValue(submitForm.email1)
      wrapper.find('input[name="email2"]').setValue(submitForm.email2)
      wrapper.find('input[name="firstname"]').setValue(submitForm.firstname)
      wrapper.find('input[name="lastname"]').setValue(submitForm.lastname)
    })

    it('par validation Bouton', async () => {
      const buttons = await wrapper.findAllComponents(BButton)
      await buttons.at(1).trigger('submit')

      const accountCreated = localStorage.getItem('accountCreated')
      expect(accountCreated).toEqual(JSON.stringify(submitForm))
    })
    it('par validation Clavier', async () => {
      // wrapper.find('input[name="username"]').setValue('account_alreadyuse')

      await wrapper.findComponent(BForm).trigger('submit')

      const accountCreated = localStorage.getItem('accountCreated')
      expect(accountCreated).toEqual(JSON.stringify(submitForm))
    })
  })
}
