
Que es bootstrap? **_Bootstrap es un framework de desarrollo web de código abierto que proporciona un conjunto de herramientas y componentes predefinidos para la creación rápida y sencilla de sitios web y aplicaciones responsivas. Fue desarrollado por Twitter y se ha convertido en una de las herramientas más populares para el diseño y la implementación de interfaces de usuario en la web._**
En pocas palabras es una libreria que te ayuda a estilar/maquetar tu aplicacion
> bootstrap page > [Bootstrap · The most popular HTML, CSS, and JS library in the world. (getbootstrap.com)](https://getbootstrap.com/)
# React Bootstrap
Que es reactstrap?  **_React Bootstrap es una biblioteca de componentes de interfaz de usuario que combina las capacidades de React, una biblioteca de JavaScript para crear interfaces de usuario interactivas, y Bootstrap, el popular framework de desarrollo web._**
En pocas palabras es como un bootstrap adaptado para react

> Una alternativa similar es[Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)
> pagina de react bootstrap [React-Bootstrap · React-Bootstrap Documentation](https://react-bootstrap.github.io/)

# Empezando a usar react bootstrap

Para empezar a usar react bootstrap tenemos que importar los estilos de bootstrap para esto ay dos maneras una es importarla directamente en HTML y importarlo en el componente raiz de la aplicacion lo cual es la mejor forma de hacerlo ya que va alineada a la version de tu app

En componente raiz:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

En el HTML :
```HTML
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>
```
Una vez echo esto ya puedes comenzar a usar bootstrap en tu app

# Estilando con react-bootsrap

Para empezar a estilar con react bootstrap solo tenemos que nombrar clases por ejemplo te daras cuenta que si envuelbes tu aplicacion con un div con una classe llamada container tu aplicacion se centrara haciendo ver mas limpia 

```jsx
const App = () => {
return(
	<div className='container'>{//esto sentrara la aplicacion}
		<Button onClick={handleClick}>Holy guacamole!</Button>
	</div>
)
}
```

# Haciendo una tabla con react bootstrap

Para hacer una tabla primero tenemos que importar el componente de tabla que biene en react-bootrsp pero tenemos dos opciones:
```jsx
import { Table } from 'react-bootstrap'
import TableFromComponent from 'react-bootstrap/Table'
```

En este ejemplo los dos hacen lo misimo solo que por detras la primera opcion se esta importando desde react-bootstrap que es un archivo que tiene todos los componentes y la segunda solo esta importando el componente Table Lo mejor y mas recomendable es la segunda opcion ya que esta solo importa lo que vas a nesesitar

una vez importado los componentes es ya podemos usarlos en nuestro codigo como en el siguiente ejemplo

```jsx
      <Table striped>{//qui usamos el componente lo que hace el attributo striped es estilar uno linea con color y otra no}
        <tbody>
          {notesToShow.map((note, i) =>
            <tr key={i}>
              <td>
                <Note
                  note={note}
                  toggleImportance={() => lcocalToggleImportance(note.id)}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
     </Table>
```

![1000](table.png)

# Componentes con sub componentes 
Hay algunos componentes sobretodo los que son boxes o cajas que tienen sub componentes para delimitar los espacios de las boxes o estilar los elementos uno de ellos es el FORM ejemplo:

```jsx
function BasicExample() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">{//este form.rup es un subcomponente que lo que hace es delimitar los inputs }
        <Form.Label>Email address</Form.Label>{//este edita el texto}
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
```
