import { Lowercase, Capitalize } from '@/tools/index'

module.exports = test(`Capitalize 1ere lettre TeSt converti à TeSt`, () => {
  expect(Capitalize('TeSt')).toBe('TeSt')
})

test(`Lowercase + Capitalize TeSt converti à Test`, () => {
  expect(Capitalize(Lowercase('TeSt'))).toBe('Test')
})
