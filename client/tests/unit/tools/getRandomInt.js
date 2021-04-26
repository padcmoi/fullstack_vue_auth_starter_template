import { getRandomInt } from '@/tools/index'

module.exports = test(`getRandomInt Lance un dés aléatoire et obtient un chiffre de 0 à 6`, () => {
  const Obj = {
    test1: getRandomInt(6),
    test2: getRandomInt(4),
    test3: getRandomInt(2),
  }
  expect(Obj.test1).toBeLessThanOrEqual(6)
  expect(Obj.test1).toBeGreaterThanOrEqual(0)

  expect(Obj.test2).toBeLessThanOrEqual(4)
  expect(Obj.test2).toBeGreaterThanOrEqual(0)

  expect(Obj.test3).toBeLessThanOrEqual(2)
  expect(Obj.test3).toBeGreaterThanOrEqual(0)
})
