import { getRandomStr } from '@/tools/index'

module.exports = test(`getRandomStr génére 1 caractère aléatoire sur la base de abcdefghijk, puis 12 caractères aléatoires`, () => {
  const Obj = {
    oneRandomLetter: getRandomStr(1, 'abcdefghijk'),
    twelveLetterSize: getRandomStr(12, 'abcdefghijk'),
  }

  expect(Obj.oneRandomLetter).toMatch(/[a-k]/)
  expect(Obj.twelveLetterSize).toHaveLength(12)
})
