const { average } = require('../utils/for_testings')

describe('average', () => {
  test('of one value is the value itself', () => {
    const result = average([2])

    expect(result).toBe(2)
  })
})
