import { checkEmail } from '@/tools/index'

module.exports = test(`checkEmail test plusieurs au bon format et au mauvais format`, () => {
  const array = [
    !checkEmail('hello'),
    !checkEmail('hello@coco?'),
    !checkEmail('aze@192.168.1.168'),
    !checkEmail('aze@192.168.1.168.fr'),
    !checkEmail('^^@aa.fr'),
    checkEmail('aze@aa.f'),
    checkEmail('test@naskot.fr'),
  ]

  array.forEach((element) => {
    expect(element).toBeTruthy()
  })
})
