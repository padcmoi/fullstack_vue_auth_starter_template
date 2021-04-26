import { isCapitalized, isLowercase, isUppercase } from '../../../common/misc'
import { Lowercase, Uppercase, Capitalize } from '@/tools/index'

/**
 * Doit contenir un champ Email
 *
 * * Pour Login, Register
 *
 * @param {Object} wrapper
 * @param {String} email1
 * @param {Boolean/String} email2
 * @void
 */
export default (wrapper, email1, email2 = false) => {
  describe('Doit contenir un champ Email:', () => {
    let input1, input2
    beforeEach(() => {
      input1 = wrapper.find(`input[name="${email1}"]`)
      input1.setValue(Lowercase('fakeData@LocalHost.fr'))

      if (typeof email2 === 'string') {
        input2 = wrapper.find(`input[name="${email2}"]`)
        input2.setValue(Lowercase('fakeData@LocalHost.fr'))
      }
    })

    describe('Champ n°1:', () => {
      it('Existe', () => {
        expect(input1.exists()).toBeTruthy()
      })
      it('Typage', () => {
        expect(input1.attributes('type')).toBe('email')
      })
      it('Limité à 50 caractères', () => {
        expect(parseInt(input1.attributes('maxlength'))).toBe(50)
      })
      it('Doit être en minuscule', () => {
        expect(isLowercase(input1.element.value)).toBeTruthy()
      })
    })

    if (typeof email2 === 'string') {
      describe('Champ n°2:', () => {
        it('Existe', () => {
          expect(input2.exists()).toBeTruthy()
        })
        it('Typage', () => {
          expect(input2.attributes('type')).toBe('email')
        })
        it('Limité à 50 caractères', () => {
          expect(parseInt(input2.attributes('maxlength'))).toBe(50)
        })
        it('Doit être en minuscule', () => {
          expect(isLowercase(input2.element.value)).toBeTruthy()
        })
      })

      it('Les champs doivent être identique', () => {
        expect(input1.element.value).toBe(input2.element.value)
      })
    }
  })
}
