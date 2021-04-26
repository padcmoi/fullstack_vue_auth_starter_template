import { Uppercase } from '@/tools/index'

module.exports = test(`Uppercase TeSt converti à TEST`, () => {
  expect(Uppercase('TeSt')).toBe('TEST')
})
