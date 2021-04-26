import { isCapitalized, isLowercase, isUppercase } from '../../../common/misc'
import { Lowercase, Uppercase, Capitalize } from '@/tools/index'

/**
 * Doit contenir un champ lastname
 *
 * * Pour Register
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe('Doit contenir un champ lastname:', () => {
    let input
    beforeEach(() => {
      input = wrapper.find(`input[name="lastname"]`)
      input.setValue(Uppercase('fakeData'))
    })
    it('Existe', () => {
      expect(input.exists()).toBeTruthy()
    })
    it('Typage', () => {
      expect(input.attributes('type')).toBe('text')
    })
    it('Limité à 30 caractères', () => {
      expect(parseInt(input.attributes('maxlength'))).toBe(30)
    })
    it('Doit être en lettre Majuscule', () => {
      expect(isUppercase(input.element.value)).toBeTruthy()
    })
  })
}
