# JavaScript

es un lenguaje basado en ecmascript multi paradigma

tambien es un lenguaje debil y dinamico

- **debil** : que podemos cambiar de tipo de dato en una variable sin un error.
  por ejemplo cuando tenemos una bariable que lleve un string lo podemos cambiar a un number sin afectar

- **dinamico**: quiere decir que se ejecuta y mientras se ejecuta el ya sabe que tipo de dato tenemos en nuestra variable

## cargar archivos js a HTML

La forma mas comun de cargar un script a HTML es con la etiqueta `<script>` mas un src con la ubicacion del archivo

```HTML
    <script src="script.js"></script>
```

tambien tenemos en mdoulo que es importar como modulo con el atributo `type="module"`

```HTML
 <script
 type="module"
 src="index.js" ></script>
```

la diferencia es que ese script va usar los emascript moduls que va poder importar modulos

## crear variables

una variable es una caja que incluye datos

hay tres tipos de formas de declarar una valriable que son las siguientes

- **let**: con let podemos reasignar valor mas adelante

```javascript
let nombre = `gordonchis`;
//cambio de nobre
let nombre = `eduardo`;
```

osea el usuario cambio su nombre ya que con let si podemos reasignar una variable y solo se crea dentro de un scop

- **const**: mientras que con const no podemos hacer esto ya que no se puede reasignar una variable ya que esto dara un erro

```javascript
const pasword = `1234`;
```

el usuario declaro su pasword con const ya que no se puede reasignar

- <FONT color="red">**var**</FONT>: var es la que menos debes de usar, ya que es una manera antigua ya que con let se puede acceder desde fuera de un scop

```javascript
var nombre = `gordonchis`;
```

<FONT color="orange">scop: El scope puede definirse como el alcance que una variable tendrá en tu código. En otras palabras, el scope decide a qué variables tienes acceso en cada parte del código. Existen dos tipos de scope, el scope global y el scope local. </FONT>

### que se puede guardar en una variable

- **_string_**: es cualquier cadena de texto se declara con dos comillas ""

- **_number_**: es cualquier tipo de numero ya sea decimal o entero

- **_booleano_**: solo es 0 y 1 el 0 se refiere a false y el 1 a true

- **_undefined_**: que no esta definido pero que se podra definir mas adelante

- **_null_**: que no hay valor

todos estos son tipos primitivos ya que son inmutables

## Funciones

una funcion sirve para almacenar bloques de codigo para poder reutilisarlo mas adelante podemos poner parametros que en este caso seria operando1 y operando2

```javascript
const sumar = (operando1, operando2) => {
  return operando1 + operando2;
};
```

### diccionario

aqui solo pondre las cosas que no me quedan tan claras

- spread operator: el spread operator lo que hace es esparcir el objeto en otro objeto para no tener que rescribir todo un objeto
