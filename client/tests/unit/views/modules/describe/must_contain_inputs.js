/**
 * Doit contenir un nombre de balise <INPUT>
 *
 * @param {Object} wrapper
 * @param {Number} toHaveLength
 * @void
 */
export default (wrapper, toHaveLength) => {
  it('Doit contenir ' + parseInt(toHaveLength) + ' champ(s)', () => {
    expect(wrapper.findAll('input')).toHaveLength(parseInt(toHaveLength))
  })
}
