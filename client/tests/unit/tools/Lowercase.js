import { Lowercase } from '@/tools/index'

module.exports = test(`Lowercase TeSt converti à test`, () => {
  expect(Lowercase('TeSt')).toBe('test')
})
