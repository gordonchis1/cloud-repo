# Haciendo testing de react con react-testing-library y Jest
- Cual es la diferencia de react-testing-library y Jest?
	**_Jest es un marco de pruebas que proporciona un conjunto completo de herramientas para escribir y ejecutar pruebas unitarias y de integración en JavaScript. Jest viene con una variedad de características útiles, como la capacidad de emular funciones y objetos, pruebas en paralelo y la integración con herramientas de cobertura de código._**
	
	**_React Testing Library, por otro lado, es una biblioteca de pruebas específica de React que se utiliza para probar la funcionalidad de los componentes de React. En lugar de enfocarse en probar los detalles de implementación del componente, como lo haría Jest, React Testing Library se enfoca en probar el comportamiento del componente desde la perspectiva del usuario. Esto significa que se prueba cómo interactúa un usuario con el componente y cómo el componente responde a esas interacciones._**

# Empezamos a usar react-testing-library
Para empezar a usar ``@react-testing-library`` tenemos que instalar la dependencia que lo que hace es darnos apis para hacer mas sencillo el testing de react tambien podemos instalar ``@testing-library/jest-dom`` que lo que hace es que nos da una lista mas amplia de expect para el frontend estas dos las instalamos como dependencia de desarollo

Donde devemos de crear los test de los componentes? Los podemos crear  a un lado del componente o en una carpeta separada llamada Test un ejemplo de nombre es el siguiente``NombreDelComponente.test.js```

# Primer test

1. Primero tenemos que importar las dependecias nesesarias y el componente a testear
```jsx
import React from "react";
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react'
//Render lo que nos va a permitir es renderizar el componente y luego inspeccionar
import { Render } from '@testing-library/react'
//Este es el componente
import Note from './Note'
```

2. Hacer el primer test el primer test que deveriamos de realisar es el de ver si el componente se esta renderizando esto lo podemos realizar de la siguiente manera
	En el siguiente ejemplo tengo una nota que quiero ver si se renderiza donde el contenido es Hola Mundo:
```jsx
test('Render content', () => {
    const note = {
        content: 'Hola Mundo!!!!',
        important: false
    }
    //creamos la nota con el txt de Hola Mundo!!!!
    
    const componente = render(<Note note={note} />)
    //aqui renderizamos el coponente
    componente.getByText('Hola Mundo!!!!')//checamos que el txt de Hola Mundo!!!! exista
    componente.getByText('make important')
})	
```
de esta forma ya serviria nuestro test pero hay una forma mas larga pero mas facil de entender que seria la siguiente 
```jsx
test('Render content', () => {
    const note = {
        content: 'Hola Mundo!!!!',
        important: false
    }
    //creamos la nota con el txt de Hola Mundo!!!!
    
    const componente = render(<Note note={note} />)
    //aqui renderizamos el coponente

	expect(componente.container).toHaveTextContent('Hola Mundo!!!!')
	//esperamos que en el componetnte se encuentre el texto Hola Mundo!!!!
})	
```

La siguiente tabla muestra lo que debuelve cada selectot: 
|            | No Match | 1 Match | 1+Match | Await ? |
| ---------- | -------- | ------- | ------- | ------- |
| getBy      | throw    | return  | throw   | No      |
| findBy     | throw    | return  | throw   | Yes     |
| queryBy    | null     | return  | throw   | No      |
| getAllBy   | throw    | array   | array   | No      |
| findAllBy  | throw    | array   | array   | Yes     |
| queryAllBy | []       | array   | array   | No      |
Ejemplo si cuando hacemos un getByText y no lo encuentra regresa un throw que lo que significa que nuetro test no va a pasar si encuntra mas de uno es el mismo caso pero si encuentra uno nos regresara el texto y nuestro test pasa

En la siguiente lista se muestra todos lo metdos en orden de jerarquia del que seria mejor utilizar que menos deveriamos utilizar que seria el Id

-   **ByLabelText** find by label or aria-label text content
    -   getByLabelText
    -   queryByLabelText
    -   getAllByLabelText
    -   queryAllByLabelText
    -   findByLabelText
    -   findAllByLabelText
-   **ByPlaceholderText** find by input placeholder value
    -   getByPlaceholderText
    -   queryByPlaceholderText
    -   getAllByPlaceholderText
    -   queryAllByPlaceholderText
    -   findByPlaceholderText
    -   findAllByPlaceholderText
-   **ByText** find by element text content
    -   getByText
    -   queryByText
    -   getAllByText
    -   queryAllByText
    -   findByText
    -   findAllByText
-   **ByDisplayValue** find by form element current value
    -   getByDisplayValue
    -   queryByDisplayValue
    -   getAllByDisplayValue
    -   queryAllByDisplayValue
    -   findByDisplayValue
    -   findAllByDisplayValue
-   **ByAltText** find by img alt attribute
    -   getByAltText
    -   queryByAltText
    -   getAllByAltText
    -   queryAllByAltText
    -   findByAltText
    -   findAllByAltText
-   **ByTitle** find by title attribute or svg title tag
    -   getByTitle
    -   queryByTitle
    -   getAllByTitle
    -   queryAllByTitle
    -   findByTitle
    -   findAllByTitle
-   **ByRole** find by aria role
    -   getByRole
    -   queryByRole
    -   getAllByRole
    -   queryAllByRole
    -   findByRole
    -   findAllByRole
-   **ByTestId** find by data-testid attribute
    -   getByTestId
    -   queryByTestId
    -   getAllByTestId
    -   queryAllByTestId
    -   findByTestId
    -   findAllByTestId

# Component Debug
que es el component debug? cuando tenemos muchos errores en nuestro renderizado y no lo podemos solucionar podemos usar component debug que lo que hace es regresar lo que se esta renderizando de la siguiente maera 

```jsx
test('Render content', () => {
    const note = {
        content: 'Hola Mundo!!!!',
        important: false
    }
    //creamos la nota con el txt de Hola Mundo!!!!
    
    const componente = render(<Note note={note} />)
    //aqui renderizamos el coponente
	componente.debug()
})
```

El resultado seria el siguiente: 
![499](componentDebug.png)

# Simulando Cicks desde el test
Pero que pasa si tenemos un botton en el componente y queremos ver que pasa si le damos click? 
Pues para esto podemos usar una funcion que nos da testing-library/react que se llama *fireEvent*
que lo que hace es simular un click

Primero tenemos que recuperar el boton para luego disparar el evento con el fireEvent de la siguiente manera

```jsx
test('Clicking the button calls the event handler once', () => {
    const note = {
        content: 'Hola Mundo!!!!',
        important: false
    }
    const componente = render(<Note note={note} toggleImportance={() => { }} />)
    const button = componente.getByText('make important')
    //seleccionamos el btn por el txt
    fireEvent.click(button)
    //aqui disparamos el evento de tipo click al btn
})
```

# Usando mocks para testear 
Haora ya esta aciendo el click pero no estoy porobando nada como se que el click funciona como yo quiero para esto vamos a usar un mock 

Que es un mock? es como una funcion que vamos a poder espiar para ver cuantas veses se a llamado en este caso al boton de la siguiente manera 

```jsx
test('Clicking the button calls the event handler once', () => {
    const note = {
        content: 'Hola Mundo!!!!',
        important: false
    }
    
	const mockHandler = jest.fn()//aqui declaramos el mock
   
    const componente = render(<Note note={note} toggleImportance={mockHandler} />)
    //aqui pasamos como parametro el mockhandler ya que es la funcion que se va a ejecutar
    const button = componente.getByText('make important')
    fireEvent.click(button)
    
    expect(mockHandler.mock.calls).toHaveLength(1)
    //aqui checamos que las veses que se llamo al evento sea solo 1
})

```

# Revisar los estilos con los test
podemos ver si un estilo cumple con una regla que queramos de la siguiente manera

```js
    test('render its children', () => {
        const element = component.getByText('divTest')
  
        expect(element.parentNode).toHaveStyle('display: none')
	    //vemos que el padre del componente tenga un display: none
    })
```

# Probando que los clicks aan lo que tienen que hacer

En el siguiente caso tenemos un btn que lo que hace es poner un display block y un display none cuando se pulsa para ocultar lo que vamos a hacer es disparar el evento y luego verificar que el displa y sea none

Ejemplo:
```jsx
    test('after clicking its children must be show', () => {
        const button = component.getByText(btnText)
        fireEvent.click(button)//lanzamos el evento
        const element = component.getByText('divTest')//requperamos el elemento
        
        expect(element.parentNode).not.toHaveStyle('display: none')
        //verificamos que display no sea none

    })
```

# Coverage de los test

Si ejecutamos el comando de test mas -- -coverage podemos ver el porsentaje de coverae osea de que tanto de nuestro frontend tenemos cubierto con test esto es util para ver que tanto emos testeado

>Si quieres como hacer testing a toda tu aplicacion [[Testing End2End Cypress]]