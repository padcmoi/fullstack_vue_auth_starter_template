/**
 * Pas de limite de caractères maximales à un INPUT
 *
 * @param {object} input
 * @void
 */
export default function input_maxlength_mustbeundefined(input) {
  expect(input.attributes('maxlength')).toBeUndefined()
}
