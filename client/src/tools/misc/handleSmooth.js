/**
 * Applique un effet lisse sur une ancre HTML
 *
 * @param {Number} id
 */
export default function handleSmooth(id) {
  const smoothSlide = document.querySelector(id)
  if (smoothSlide) {
    smoothSlide.scrollIntoView({
      behavior: 'smooth',
    })
    clearTimeout(timer1)
    timer1 = setTimeout(() => {
      smoothSlide.scrollIntoView({
        behavior: 'auto',
      })
    }, 1000)
    clearTimeout(timer2)
    timer2 = setTimeout(() => {
      smoothSlide.scrollIntoView({
        behavior: 'auto',
      })
    }, 2000)
  }
}
