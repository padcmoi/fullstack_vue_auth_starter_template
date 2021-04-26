import { BButton, BForm } from 'bootstrap-vue'
import { randomStr } from '../../../common/misc'
import { Lowercase, Uppercase, Capitalize } from '@/tools/index'

/**
 * Soumet un formulaire complet
 *
 * @param {Object} wrapper
 * @param {Object} modules
 * @param {String} access_token
 * @void
 */
export default (wrapper, modules, access_token) => {
  describe('Soumet un formulaire:', () => {
    let form
    beforeEach(() => {
      form = {
        username: randomStr(8),
        password: randomStr(14),
      }

      // Formattage des champs
      form['username'] = Lowercase(form['username'])

      // Soumet des données correctes
      wrapper.find('input[name="username"]').setValue(form.username)
      wrapper.find('input[name="password"]').setValue(form.password)
    })

    it('par validation Bouton', async () => {
      const buttons = await wrapper.findAllComponents(BButton)

      await buttons.at(1).trigger('submit')
      expect(wrapper.vm.form).toEqual(form)
    })
    it('par validation Clavier', async () => {
      await wrapper.findComponent(BForm).trigger('submit')

      expect(wrapper.vm.form).toEqual(form)
    })

    describe('est connecté:', () => {
      beforeEach(async () => {
        await wrapper.findComponent(BForm).trigger('submit')
      })
      it("a un jeton d'accès", async () => {
        const jwt_token = await localStorage.getItem('access_token')

        expect(jwt_token).not.toBeUndefined()
        expect(jwt_token).not.toBeNull()
        expect(jwt_token).toEqual(access_token)
      })
      it('state du store "isLogged" doit être vrai', () => {
        expect(modules.store_auth.state.isLogged).toBeTruthy()
      })
      it('state du store "isAdmin" doit être faux', () => {
        expect(modules.store_auth.state.isAdmin).toBeFalsy()
      })
      // it('Nouvelle route vers Dashboard', () => {
      //   expect(wrapper.vm.$route.path).toBe('/dashboard')
      // })
    })
  })
}
