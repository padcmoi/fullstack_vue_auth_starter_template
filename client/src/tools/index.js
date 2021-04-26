import canWebpUse from './misc/canWebpUse'
import { Lowercase } from './misc/charsFormatter'
import { Uppercase } from './misc/charsFormatter'
import { Capitalize } from './misc/charsFormatter'
import { getCsrfToken, setCsrfToken } from './misc/csrfToken'
import getRandomInt from './misc/getRandomInt'
import getRandomStr from './misc/getRandomStr'
import handleSmooth from './misc/handleSmooth'
import truncateStr from './misc/truncateStr'

import checkEmail from './form/checkEmail'
import checkPasswords from './form/checkPasswords'
import passwordGenerator from './form/passwordGenerator'

import { makeToast, catchResponseToast } from './notify/toast'

import { routerRightsCheck } from './router/router'
import { routerRightsCheckNext } from './router/router'
import { routerSetTitle } from './router/router'
import { routerSetMeta } from './router/router'
import { routerSetLink } from './router/router'

export {
  // Misc
  canWebpUse,
  Lowercase,
  Uppercase,
  Capitalize,
  getCsrfToken,
  setCsrfToken,
  getRandomInt,
  getRandomStr,
  handleSmooth,
  truncateStr,
  // Form
  checkEmail,
  checkPasswords,
  passwordGenerator,
  // Notify
  makeToast,
  catchResponseToast,
  // Router
  routerRightsCheck,
  routerRightsCheckNext,
  routerSetTitle,
  routerSetMeta,
  routerSetLink,
}
