const { palindrome } = require('../utils/for_testings')

test('palindrome of hola', () => {
  const result = palindrome('hola')

  expect(result).toBe('aloh')
})

test('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})
