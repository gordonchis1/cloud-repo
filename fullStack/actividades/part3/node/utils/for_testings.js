const palindrome = (str) => {
  return str.split('').reverse().join('')
}

const average = (array) => {
  let sum = 0
  array.forEach(num => { sum += num })
  return sum / array.length
}

module.exports = { average, palindrome }
