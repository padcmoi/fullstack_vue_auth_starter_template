import { isCapitalized, isLowercase, isUppercase } from '../../../common/misc'
import { Lowercase, Uppercase, Capitalize } from '@/tools/index'

/**
 * Doit contenir un champ Username
 *
 * * Pour Login, Register
 *
 * @param {Object} wrapper
 * @void
 */
export default (wrapper) => {
  describe('Doit contenir un champ Username:', () => {
    let input
    beforeEach(() => {
      input = wrapper.find('input[name="username"]')
      input.setValue(Lowercase('fakeData'))
    })
    it('Existe', () => {
      expect(input.exists()).toBeTruthy()
    })
    it('Typage', () => {
      expect(input.attributes('type')).toBe('text')
    })
    it('Limité à 20 caractères', () => {
      expect(parseInt(input.attributes('maxlength'))).toBe(20)
    })
    it('Doit être en minuscule', () => {
      expect(isLowercase(input.element.value)).toBeTruthy()
    })
  })
}
