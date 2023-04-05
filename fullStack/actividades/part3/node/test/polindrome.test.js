const { palindrome } = require('../utils/for_testings')

test.skip('palindrome of hola', () => {
  const result = palindrome('hola')

  expect(result).toBe('aloh')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})
