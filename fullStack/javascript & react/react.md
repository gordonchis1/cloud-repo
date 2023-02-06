# React

react es una biblioteca de javascript
desarollado por meta y de codigo abierto

## Crear un proyecto con react

ay muchas formas de crear un proyecto con react pero una de las mas comunes es con el comando `npx create-react-app`
el cual nos levantara un proyecto de react al instante

## Componentes

un componente es algo que luego se va a renderizar en el DOM

en este caso el componente seria App y se esta renderizando en root

![](./img/componente.png)

dentor de un componentes puede ver variavles y funciones

react no puede renderizar objetos pero puedes renderizar un monton mas de cosas como listas, strings y numeros ...

<FONT color=red>Nota: los componentes se deben declarar siempre en mayuscula ya que de otra forma el navagador no tomara en cuenta estos componentes</FONT>

## Props

los props son paresidos a un parametro de una funcion de js pero con la diferencia de que estos son de react

los props de reatc se pasan como si fuera un atributo HTML por ejemplo

```jsx
const Mensaje = (props) => {
  return <h1>{props.msj}</h1>;
};

function App() {
  return (
    <div className="App">
      <Mensaje msj="hola" />
    </div>
  );
}
```

en este caso el param seria msj lo que hace react por detras es **combertir cada uno de estas propiedades en un objeto** entonces para acceder a cada uno de estos seria como acceder a una propiedad de un objeto en este caso seria: `props.msj`
