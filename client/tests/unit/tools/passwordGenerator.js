import { checkPasswords, passwordGenerator } from '@/tools/index'

module.exports = test(`passwordGenerator génére un mot de passe et vérifie automatiquement qu'il respecte les exigences`, () => {
  const array = [
    passwordGenerator(),
    passwordGenerator(4),
    passwordGenerator(32, '!'),
  ]

  array.forEach((element) => {
    // console.log(element)
    expect(checkPasswords(element, element)).toBeTruthy()
    expect(element).not.toMatch(/undefined/)
  })
})
