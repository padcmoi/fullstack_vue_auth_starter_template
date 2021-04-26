/**
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
const expectedResponsefromApi = (data = null) => {
  expect(data).not.toBeNull()

  const build = {
    data: data || {},
    status: data ? 200 : 404,
    header: data
      ? {
          'content-length': '150',
          'content-type': 'application/json; charset=utf-8',
        }
      : {},
  }
  return build
}

export default expectedResponsefromApi
