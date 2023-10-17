# Teoria

- Que es el binary search?
	**La búsqueda binaria es un algoritmo eficaz para encontrar un elemento de una <b><font color="red">lista ordenada de elementos</font></b>.**
	Funciona dividiendo repetidamente por la mitad la parte de la lista que podría contener el elemento, hasta que hayas reducido las posibles ubicaciones a una sola

>En pocas palabras partimos teniendo una lista ordenada y un elemento que seria el target o el elemento a encontrar en el array este algoritmo conciste en encontrar el left, right, y middle de un array una vez que tengamos el medio de el array tenemos comprar si el target es menor o mayor si es menor entonces recorremos left a la posicion de le medio mas uno y si el target es mayor que middle recorremos el right a la pocicion de middle menos 1 una vez echo esto tenemos que volver a hacer los mismos pasos asta llegar a target 

1. Por lo que en el primer paso tenemos que definir el middle el left y el right de el array por lo que de forma ilustrada luciria asi:
	![500](./img/1iteracion_binarySearch.png)
2. Despues de verificar si middle es mayor o menor o igual que target tenemos que reubicar las constantes que son middle, left y right en el ejemplo anterior 22 es mayor que 15 por lo que tenemos que reubicar es Right en el lugar de middle menos 1 y middle usando la misma formula por lo que quedaria de la siguiente manera:
	![500](./img/2iteracion_binarySearch.png)
3. Despues de verificar si middle es menor mayor o igual que target en el ejemplo nos damos cuanta que middle ya es igual que el target asi que en este momento es cuando el indice de Middle es la respuesta a nuestra incognita 
	![500](./img/3iteracion_binarySearch.png)

---
# Practica (Codigo)

Una vez ya sabemos la teoria de la busqueda binarea haora tenemos que entender las diferentes formas de usar este algoritmo en codigo 


## Busceda Binaria Recursiva

Lo que hace la busqueda binaria recursiva es ejecutar la misma funcion pero con parametros diferentes multiple veces por lo que no es necesario usar un bucle for o while pero en rialidad lo que hace le bucle es la misma funcion:
```js
const binarySearch = (arr, left, right, target) => {
  if(left > right){
    return -1 //El elemento no se encuantra en el array
  }
  
  const middle = Math.floor((left + right) / 2)// Calculamos el middle
  
  if(arr[middle] === target) return middle
  if(arr[middle] < target){// Si middle es menor que target entonces recorremos left
    return binarySearch(arr, middle + 1, right, target)
  }else{
    return binarySearch(arr, left, middle - 1, target)
  }
}

const arr = [12, 15, 19, 22, 27, 30, 31]

binarySearch(arr, 0, arr.length - 1, 15)//output: 1	
```

## Búsqueda Binaria Iterativa

Lo que hace la busqueda binaria iterativa es que a diferencia de la recursiva esta si hace uso de bucles tambien una diferencia es que solo tenemos que pasarle el target y el array

```js
function binarySearchIterative(arr, target) {
  let left = 0;
  let right = arr.length - 1;// Calculamos Right

  while (left <= right) {// Si left es menor o igual que right el bucle se ejecuta
    const mid = Math.floor((left + right) / 2);//Calculamos el middle

    if (arr[mid] === target) {
      return mid; // Se encontró el elemento
    } else if (arr[mid] < target) {
      left = mid + 1; //Si middle es menor que target cambiamos left por middle + 1
    } else {
      right = mid - 1; // Si middle es mayor que target cambiamos Right por middle - 1
    }
  }

  return -1; // El elemento no se encuentra en el arreglo
}

const arr = [12, 15, 19, 22, 27, 30, 31];
const target = 15;
const result = binarySearchIterative(arr, target);
console.log(result)//Output: 1
```
