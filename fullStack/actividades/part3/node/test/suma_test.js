const suma = (a, b) => {
  return a - b
}

const checks = [
  { a: 1, b: 1, result: 2 },
  { a: 1, b: 2, result: 3 },
  { a: 2, b: 2, result: 4 }

]

checks.forEach((element) => {
  const { a, b, result } = element
  console.assert(suma(a, b) === result, `${a} mas ${b} deberia dar ${result}`)
})
