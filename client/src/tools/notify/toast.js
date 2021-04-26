// requis npm i egalink-toasty.js
// plus d'infos http://jakim.me/Toasty.js/

// import 'egalink-toasty.js/dist/toasty.min.css'
import '@/assets/vendor/egalink-toasty/toasty.less'
import 'egalink-toasty.js/dist/toasty.min.js'

const options = {
  classname: 'toast',
  transition: 'slideLeftRightFade',
  duration: 4000,
  enableSounds: false,
  autoClose: true,
  progressBar: true,
}

const EgalinkToasty = new Toasty(options)

// Usage:
// EgalinkToasty.configure({ transition: 'fade', autoClose: false })
// EgalinkToasty.info('Here is some information!', 9999)
// EgalinkToasty.success('You did something good!', 9999)
// EgalinkToasty.warning('Warning! Do not proceed any further!', 9999)
// EgalinkToasty.error('Something terrible happened!', 9999)

/**
 * Execute un toast
 *
 * @param {Object} msg
 * @param {Object} type
 * @param {Object} duration
 * @param {Object} mustClick
 *
 * @void
 */
const makeToast = function(obj = { msg, type, duration, mustClick }) {
  // on pré-remplit la fonction en cas d'arguments vide
  if (!obj.msg) {
    obj = {
      msg: 'Toast msg key not define !',
      type: 'error',
      mustClick: true,
    }
  }

  const toast = EgalinkToasty
  const msg = `<strong>${obj.msg || null}</strong>`
  const duration = parseInt(obj.duration || toast.settings.duration)

  // on ajoute des options
  toast.configure({ autoClose: obj.mustClick ? false : true })

  // on choisit le type de toast
  switch (obj.type) {
    case 'success':
      toast.success(msg, duration)
      break
    case 'warning':
      toast.warning(msg, duration)
      break
    case 'error':
      toast.error(msg, duration)
      break
    default:
      toast.info(msg, duration)
  }
}

/**
 * Execute tous les demandes de Toast dans un tableau
 *
 * @param {Array} pool
 *
 * @void
 */
const catchResponseToast = function(pool) {
  for (const obj of pool) {
    makeToast({
      msg: obj.msg || '',
      type: obj.type || 'error',
      mustClick: obj.mustClick || false,
      duration: obj.duration || 10000,
    })
  }
}

export { makeToast, catchResponseToast }
