Que es styled components?**_Styled Components es una biblioteca de estilización en JavaScript para aplicaciones web. Permite escribir estilos utilizando una sintaxis similar a la de CSS, pero en lugar de utilizar archivos CSS externos, los estilos se definen directamente en el componente JavaScript._**
en pocas palabras es una forma de dar estilo a los componentes de react desde un archivo javascript
lo que nos permite es estilar los componentes y reutilizarlos en nuestra apllcacion todo vasado en css una ventaja es que nos crea las clases automaticamente

# Empezando a usar styled components
para empezar a usar styled componentd tenemos que descargar la dependecia de styled components luego tenemos que importr a un nuevo documento
```js 
//Nuevo documento 
import style from 'styled-components'
```

lo que hace estyled components es que le indicamos que etiqueta HTML queremos estilar por ejemplo un boton o un span lugo tenemos que poner los estilos y lo que hace es crearnos un componente que tiene la misma funcion que antes pero con estilos por en el siguiente ejemplo vamos a estilar los botones
```jsx
//Nuevo documento
export const Button = style.button`
    background: white;
    border: none
`

//Componente donde vamos ausar el boton 
const App = () => {
	return{
		<div>
			<Button/>
		</div>
	}
}
```

<FONT color='red'>Nota: cada que queramos usar nuestro componente estilado tenemos que importarlo </FONT>

# como estilar hover y pseudo clases

imagina que queremos agregarle un hover a nuestro boton esto lo podemos hacer usando el simbolo de and (&)
y segido de la pseudo clase o del hover como en el siguiente ejemplo


```jsx
export const Button = style.button`
    background: white;
    border: none
    
   &:hover{${//aqui es donde usamos el hover y el simbolo}
	   background: red;
   }
`
```

# Estilando componentes 

En los ejmeplos anteriores lo que estilmos son elementos de HTML pero imagina que queremos estilar un componente imagina que  queremos estilar el Link de react router dom en el siguiente ejemplo vamos a estilar el Link de react router dom
```jsx
import {Link} from 'react-router-dom'

export const styleLink = style(Link)`
	font-size: 2rem;
`
```

<FONT color='red '>Nota: con styles components podemos estilar todos los componentes que reciban como parametro un className</FONT>

# usando porps para crear variantes de estilos

imaina que quieres que el boton del login sea diferente pues lo que podemos hacer es usar las props que le podemos mandar a los componentes por ejemplo 

```jsx
//styled component

const Button = style.button`
	${props.variant === 'black' ? 'color: black' :  'color: red '}
	//lo que le estamos diciendo es si lapropiedad variant es igual a blak quiero que el color sea black si no red
`

//componente donde usamos el botton 
const App = () => {
	<div>
		<Button variant='black'/>{
		//en este caso el color va a hacer black ya que variant es iagual a blak
		}
	</div>
}

```
