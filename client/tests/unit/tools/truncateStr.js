import { truncateStr } from '@/tools/index'

module.exports = test(`truncateStr tronque à 5 caractères une longue phrase, ajoute 3 petits points si trop long, si trop court ne pourra ajouter 3 petits points`, () => {
  const Obj = {
    longStr: truncateStr('abCdEfghijklmnop', 5, '...'),
    shortStr: truncateStr('aBc', 5, '...'),
  }

  expect(Obj.longStr).toMatch('abCdE...')
  expect(Obj.shortStr).toMatch('aBc')
})
