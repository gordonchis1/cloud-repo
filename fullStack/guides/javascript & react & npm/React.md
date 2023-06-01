# React
#React

react es una biblioteca de javascript
desarollado por meta y de codigo abierto

## Crear un proyecto con react

ay muchas formas de crear un proyecto con react pero una de las mas comunes es con el comando `npx create-react-app`
el cual nos levantara un proyecto de react al instante

## Componentes

un componente es algo que luego se va a renderizar en el DOM

en este caso el componente seria App y se esta renderizando en root

![](componente.png)

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

## como volver a renderizar un componente

para que queremos volver a renderizar un componente? pues la respuesta es para darle dinamismo a nuestros componentes y que no sean siempre estaticos

### que es el estado en react?

El estado en React nos ayuda a crear datos mutables o datos que pueden ser modificados. Para manejar el estado depende de si nuestro componente es generado con una clase o si es un componente funcional.

una forma de entender el estado en react seria como un switch cuando sabes que esta prendido o apagado
si el switch esta prendido **el estado del switch es on** y este estado se refleja con la luz si esta esta en on la luz esta prendida pues lo mismo con react el **estado se refleja en el UI**

## useState()

el useState es una forma de dar dinamismo a los componentes pero como funciona **lo que hace useState es regresar un array de dos pociciones donde la primera pocicion es el valor del estado y la segunda nos debuelve un metodo para actualizar el estado**

primera pocicion del array esta lo que queremos renderizar

segunda pocicion del array tenemos que mandar su nuevo valor

```javascript
const App = () => {
  const contador = useState(0);

  const contadorValue = contador[0]; //este es el valor del estado
  const updateContador = contador[1]; //este es el valor que vamos a actualizar

  setInterval(() => {
    updateContador(contadorValue + 1); //este es el metodo que vamos a usar osea lo que estamos diciendo es:
    //cada 1000 milisegundos vas a actualizar el estado actual sumandole 1
  }, 1000);

  return (
    <div>
      <h1>{contadorValue}</h1>
    </div>
  );
};
```

tambien podemos realizar esto con desestructuracion aorrandonos las dos linias donde sacamos en una variable los dos elementos del arr

```javascript
const App = () => {
  const [contadorValue, updateContador] = useState(0); //aqui esta la desestructuracion

  setInterval(() => {
    updateContador(contadorValue + 1);
  }, 1000);

  return (
    <div>
      <h1>{contadorValue}</h1>
    </div>
  );
};
```

ejemplo con bottom:

```javascript
const App = () => {
  const [contadorValue, updateContador] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          updateContador(contadorValue + 1);
        }}
      >
        incrementar
      </button>
      <h1>{contadorValue}</h1>
    </div>
  );
};
```

updatecontador o al segundo elemento del array tambien le podemos pasar una funcion que al ejecutarse cambie el valor ejemplo:

```javascript
const App = () => {
  const [contadorValue, updateContador] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          updateContador((contadorValue) => {
            return contadorValue + 2;
          });
        }}
      >
        incrementar
      </button>
      <h1>{contadorValue}</h1>
    </div>
  );
};
```

<FONT color="red">Nota: nunca se debe de utilizar un setInterval dentro de un componente este solo es un ejemplo</FONT>

si quieres entender mas aqui esta el url a [React Docs](https://reactjs.org/docs/hooks-intro.html)

## funciones helper

piensa que un componente dentro de su cuerpo(body) puede almacenar funciones lo que nos permite hacer funciones helper

<FONT color="red">Nota en un onclick o en casi todos los eventos NO ay que pasar la ejecucion de una funcion sino que tenemos que pasar la funcion</FONT>

## renderizado condicional

que es un renderizado condicional?un renderizado condicional es un renderizado que solo se lleva acabo si una condicion es sierta de lo contrario pasaria otra cosa

```javascript
const App = () => {
  const [contadorValue, updateContador] = useState(0);

  const handleClick = () => {
    updateContador(contadorValue + 1);
  };

  const reset = () => {
    updateContador(0);
  };

  const filtro = contadorValue % 2 === 0; //aqui evaluamos si es par o impar

  return (
    <div>
      <button onClick={handleClick}>incrementar</button>
      <button onClick={reset}>resetiar</button>
      <p>{filtro ? "es par" : "es impar"}</p>
      {/*aqui vemos por medio de una ternaria si es verdad en el caso de que
          sea verdad vas a renderizar Es par si esto es falso renderizas Es
          impar*/}
      <h1>{contadorValue}</h1>
    </div>
  );
};
```

## Ejemplos con un solo estado(objetos en estados)

podemos juntar dos estados en uno aunque no es una buena practica ya que el codigo pierde legibilidad

- ejemplo con dos estados:

```javascript
const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {left}
      <button
        onClick={() => {
          setLeft(left + 1);
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          setRight(right + 1);
        }}
      >
        right
      </button>
      {right}
    </div>
  );
};
```

este componente lo que hace es darnos dos botones uno para actualizar el estado de la derecha y otro de la izquierda aora vamos a aprender hacerlo con solo un estado

- ejemplos con un solo estado:

```javascript
const App = () => {
  const [counters, setCounters] = useState({ left: 0, right: 0 }); //aqui definimos el estado de left como 0 y el de right como0

  const sumaLeft = () => {
    setCounters({
      left: counters.left + 1,
      right: counters.right,
    });
  }; //aqui lo que estamos haciendo es decir que sume uno a left pero a right lo deje como esta

  const sumaRight = () => {
    setCounters({
      left: counters.left,
      right: counters.right + 1,
    });
  }; //aqui lo que estamos haciendo es decir que sume uno a right pero a left lo deje como esta

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {counters.left}
      <button onClick={sumaLeft}>left</button>
      {/* aqui imvocamos a las funcion */}

      <button onClick={sumaRight}>right</button>
      {/* aqui imvocamos a las funcion */}

      {counters.right}
    </div>
  );
};
```

### pero si esto es una mala practica para que nos serviria

pues la respuesta es para manejar objetos en un estado por si queremos manejar mas de dos contadores

como en el ejemplo que se nos muesta acontinuacion donde tenemos dos counters con dos botones uno incrementa el derecho y otro el izquierdo pero queremos tener uno que diga el total de clicks

```javascript
const App = () => {
  const [counters, setCounters] = useState({
    left: 0,
    right: 0,
    totalClicks: 0, //aqui definimos un tercer contador
  });

  const sumaLeft = () => {
    setCounters({
      left: counters.left + 1,
      totalClicks: counters.totalClicks + 1, //aqui lo que hacemos es sumar uno al total de clicks
      right: counters.right,
    });
  };

  const sumaRight = () => {
    setCounters({
      left: counters.left,
      right: counters.right + 1,
      totalClicks: counters.totalClicks + 1, //aqui lo que hacemos es sumar uno al total de clicks
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {counters.left}
      <button onClick={sumaLeft}>left</button>

      <h1>{counters.totalClicks}</h1>
      <button onClick={sumaRight}>right</button>
      {counters.right}
    </div>
  );
};
```

pero imagina que tenemos un objeto muy grande en un estado y queremos cambiar uno de los elementos de este objeto tenemos que actualizar de nuevo todos los elementos de el objeto como se ve a continuazion

```javascript
const [counters, setCounters] = useState({
  left: 0,
  right: 0,
  numeroMantener: 100,
});

const sumaLeft = () => {
  setCounters({
    left: counters.left + 1,
    right: counters.right,
    numeroMantener: counter.numeroMantener,
    //solo quiero cambar uno y tengo que escribir los tres
  });
};

const sumaRight = () => {
  setCounters({
    left: counters.left,
    right: counters.right + 1,
    numeroMantener: counter.numeroMantener,
    //solo quiero cambar uno y tengo que escribir los tres
  });
};
```

pues esto tiene una solucion que se hace con el spread operator (...) entonces lo que hariamos con el operador es clonar el objeto y sobrescrivir solo los que tenemos que escribir

```javascript
const [counters, setCounters] = useState({
  left: 0,
  right: 0,
  numeroMantener: 100,
});

const sumaLeft = () => {
  setCounters({
    ...counters//aqui solo clonamos el obj haciendo que solo sobrescriba el valor que queremos cambiar
    left: counters.left + 1,
    //solo quiero cambar uno y tengo que escribir los tres
  });
};

const sumaRight = () => {
  setCounters({
    ...counters//aqui solo clonamos el obj haciendo que solo sobrescriba el valor que queremos cambiar
    right: counters.right + 1,
    //solo quiero cambar uno y tengo que escribir los tres
  });
};
```

## Arrays en estados

para usar los arrays en un estado tenemos que declarar en useState que vamos a uasr un array de la sig manera useState(**[]**) a difernencia de los objetos aqui tenemos que si o si **regresar un nuevo array** de la sigiente manera:

```javascript
const [Arr, setArr] = useState([]);

const addNumberInArr = () => {
  setArr((prevArr) => {
    return [...prevArr, Math.random()];
  });
};
```

lo que hacemos en el ejemplo es una funcion que al ejecutarse agrege un numero random al arr recuerda que el spray operator debuelbe un nuevo arr asi que este es el arr que regresa para actualizar el estado

<FONT color="red">Nota: evita tener estados que no nececitas usa los justos y necesarios</FONT>

## renderizar lista de elementos

para que queremos saber esto? pues la respuesta es facil ya que en react **los objetos no pueden ser hijos de una etqueta**.
entonses la solucion a este problema es usar javaScript nativo haciendo un map del objeto y regresando las propiedades como se ve acontinuacion

```javascript
const notes = [
  {
    id: 22,
    title: "hola mundo",
    date: "21/02/22",
    describe: "un articulo aburrido",
  },
  {
    id: 13,
    title: "medio mundo",
    date: "90/02/22",
    describe: "un articulo interesante",
  },
  {
    id: 17,
    title: "adios mundo",
    date: "11/02/22",
    describe: "cun articulo medio aburrido",
  },
];
export default function App() {
  return (
    <div className="App">
      {notes.map((note) => {
        return <p>{note.title}</p>;
      })}
      /* aqui mapiamos el objeto para regresar un arr */
    </div>
  );
}
```

### key en react

cuando renderizamos una lisat en react siempre nos va a dar un error de que no tiene key por lo que debemos de poner una etiqueta llamada key

![](errKey.png)

```javascript
import "./styles.css";

const notes = [
  {
    id: 22,
    title: "hola mundo",
    date: "21/02/22",
    describe: "un articulo aburrido",
  },
  {
    id: 13,
    title: "medio mundo",
    date: "90/02/22",
    describe: "un articulo interesante",
  },
  {
    id: 17,
    title: "adios mundo",
    date: "11/02/22",
    describe: "cun articulo medio aburrido",
  },
];
export default function App() {
  return (
    <div className="App">
      {notes.map((note) => {
        return (
          <strong key={note.id}>
            <p>{note.title}</p>
          </strong>
        ); //aqui definimos el key con el id de cada nota
      })}
    </div>
  );
}
```

<FONT color="red">Nota: la key debe de estar en el lugar donde estamos iterando los datos</FONT>

[**CodeSandBox to examples**](https://codesandbox.io/s/musing-waterfall-2fvcqm?file=/src/App.js)

## Formularios en react

para trabajar con formularios en react una forma muy facil de hacerlo es con los estados ya que es la forma mas facil pero no siempre es la forma mas optima

```javascript
export default function App({ notesObj }) {
  const [note, setNote] = useState(notesObj); //este estado es para almacenar el objeto inicial
  const [newNote, setNewNote] = useState(""); //este estado es para recolectar el imput

  const handleChange = (e) => {
    setNewNote(e.target.value); //aqui recolectamos el imput(lo que se escribe)
  };

  const handleClick = () => {
    const noteToAddToState = {
      id: note.length + 1,
      title: newNote, //aqui le pasamos el newNote que biene del estado donde recolectamos el input
      date: new Date().toISOString(), //agregamos una fecha
      important: Math.random() < 0.5,
    }; //esta es la estructura de una nota
    setNote(note.concat(noteToAddToState));
  };

  return (
    <div>
      <h1>Notas</h1>
      {note.map((note) => (
        <Note {...note} key={note.id} />
      ))}
      <div>
        <input type="text" onChange={handleChange} value={newNote} />
        {/* este es el imput donde escribimos la nota */}
        <button onClick={handleClick}>
          {/* este es el boton con el que agregamos la nota */}
          crear nota
        </button>
      </div>
    </div>
  );
}
```

**pero una forma mucho mas correcta de hacer lo pasado es la siguiente y pon atencion de la etiquta form para abajo**

```javascript
export default function App({ notesObj }) {
  const [note, setNote] = useState(notesObj); //este estado es para almacenar el objeto inicial
  const [newNote, setNewNote] = useState(""); //este estado es para recolectar el imput

  const handleChange = (e) => {
    setNewNote(e.target.value); //aqui recolectamos el imput(lo que se escribe)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteToAddToState = {
      id: note.length + 1,
      title: newNote, //aqui le pasamos el newNote que biene del estado donde recolectamos el input
      date: new Date().toISOString(), //agregamos una fecha
      important: Math.random() < 0.5,
    }; //esta es la estructura de una nota
    setNote(note.concat(noteToAddToState));
  };

  return (
    <div>
      <h1>Notas</h1>
      {note.map((note) => (
        <Note {...note} key={note.id} />
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        {/* este es el imput donde escribimos la nota */}
        <button>
          {/* este es el boton con el que agregamos la nota */}
          crear nota
        </button>
        {/* siempre el ultimo botton de un formulario sirbe como submit */}
      </form>
    </div>
  );
}
```

<FONT color="red">Nota: es muy importante que todos los input y los botones que envian el input esten dentro de la etiquta (</form/>)</FONT>

[**fullProyect**](https://codesandbox.io/s/musing-waterfall-2fvcqm?file=/src/App.js:85-1024)

## API`s en React

tu pordrias pensar que solo vasta con hacer un fetch y si en efecto tenemos que usar un fetch el problema es donde tenemos que pues no lo podemos usar dentro de un componente asi nomas porque estariamos haciendo un render infinito porque cada vez que se inicia el componente se va a hacer el fetch y cada vez que el fetch se hace ban a cambiar las propiedades y se va a renderizar de nuevo haci en bucle la respuesta es...

## useEffect()

useEffect es un hook que se ejecuta cada que se renderiza un componente pero este puede ser controlado perfectamente

```javascript
useEfect(
  {
    //funcion que se ejecutara cada que queramos
  } /*dependecias*/
);
```

<FONT color="red">Nota: si useEffct no se controla este se volvera a ejecutar cada que el componente se renderiza</FONT>

- como controlo useEffect?:para decidir cada cuando se ejecuta el useEffect tenemos que indicar una dependencia la cual dira cunado ejecutarse

- que es una dependencia?: una dependencia es una _"Las dependencias son variables o valores que están presentes en el useEffect y que se monitorean por React. Cada vez que se actualiza el componente, React compara las dependencias previas con las nuevas y si alguna ha cambiado, el efecto secundario se vuelve a ejecutar._"-chatGPT.
  **Entonces en pocas palabras una dependencia es una variable o un valor que cuando cambia tenemos que ejecutar useEffect** se pasa en forma de array por ejemplo: [variable1, variable2] si el valor de la variable1 o de la variable2 cambia el useEffect se volvera a ejecutar

```javascript
useEffect(() => {
  console.log("use effect");
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((data) => data.json())
    .then((data) => console.log(data));
}, []); //esto se estaria ejecutando solo una ves ya que no hay dependencias
```

<FONT color="red">Nota: si en un useEffect haces una peticion a una api react no esperara esta respuesta sino que renderizara lo que pueda como cosas externas a la api lo que hara react sera lo sigiente

> 1- renderizar <br/>
> 2- ejecutar useEffect <br/>
> 3- esperar la respuesta <br/>
> 4- volver a renderizar pero con la respuesta de la API </FONT>

# Diferencia del renderizado condicional y los estilos condicionales
que es un estilo condicional? un estilo condicional es darle un estilo a un elmento si se cumple una condicion ose si tal variable es true quiero que agreges este estilo en linea 

cual es la diferencia? la diferencia es que cuando usamos el renderizado condicional el elemento no se renderiza osea no existe ni en el dom mientras que cuando usamos un stilo condicional el elemneto sige hai pero no se muestra o se muestra de una manera diferente 

Ejemplo: 
```js
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }// si login visible es true display es none pero si es false es ''
    const showWhenVisible = { display: loginVisible ? '' : 'none' }// si login es false el display es none pero si es true es ''
```

<FONT color='red'>Nota: esto yambien puede hacer una clase que es una mejor practica</FONT>

# Usando la propiedad especial CHILDREN

que es la propiedad children en react?**_En React, la propiedad `children` se utiliza para pasar componentes hijos a otros componentes como propiedades.
En React, los componentes se componen entre sí, lo que significa que un componente puede tener uno o varios componentes hijos dentro de sí. La propiedad `children` permite pasar componentes hijos desde un componente padre a un componente hijo._**
En pocas palabras la propiedad no va hacer la que pongamos en un componente como atributo sino que va a hacer aquel que pongamos como hijo

una forma de ver esto es como funciona un h1 ```<h1>children</h1>``` osea que el texto chidren es el que se va a renderizar osea que el chidren es el hijo de nuestro componente
Ejemplo:
```jsx
//documento app
const App = () => {
	return(
	   <Togglable>hola desde</Togglable>
				 //esto es el children lo que esta adentro de los componentes
	)
}

//documento h1
export default function Togglable({ children }) {
    return <h1>{children}</h1>
    //aqui usamos la propiedad children
}

//en este caso se renderiza un h1 con el texto hola desde
```

<FONT color='red'>Nota: en el children podemos poner lo que queramos ya sea otros componentes otros elementos de html como un spam etc...</FONT>

un Ejemplo de caso de uso de la propiedad children es un elemento togable osea que desaparesca y aparesca cuando lo nesesitemos de la siguiente manera

```jsx
export default function Togglable({ children, btnText }) {
    const [visible, setVisible] = useState(false)
    const handleLoginVisible = () => {
        setVisible(true)
    } 
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }  
    
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={handleLoginVisible}>{btnText}</button>
            </div>
            <div style={showWhenVisible} >
                {children}
                <div style={showWhenVisible}>
                    <button onClick={() => setVisible(false)}>cancel</button>
                </div>
            </div>
        </>
    )
}
```

# usando el hook de useRef 

Que es useRef? **_`useRef` es un hook en React que permite mantener una referencia mutable a un elemento del DOM u otro valor mutable en un componente funcional.
El hook `useRef` devuelve un objeto de referencia mutable que puede mantener un valor mutable en la memoria y persistir a través de la vida útil del componente. Este objeto se puede utilizar para hacer referencia a elementos DOM específicos y para mantener valores mutables que no necesitan desencadenar una actualización de renderizado cuando cambian._**

Ejemplo: 
```jsx
const App = () => {
const elementRef = useRef()


return(
	<h3 ref={elementRef}>hola Mundo!!!</h3>//hacemos referencia de el elemento en el use ref
)
// si hacemos console.log de elementRef nos regresara el h3 del dom como si uvieramos echo console.log(document.getElementById('h3'))en js normal
}
```

# usando forwardRef 
pero que pasa si queremos agregar una referencia a un componente pues para eso existe forwardRef que es una forma de pasar referencias en un componente hacia al padre

explicacion de chatGPT: 
**_¡Por supuesto! `forwardRef` es una función en React que permite pasar una referencia de un componente padre a un componente hijo para que el padre pueda acceder a algún elemento o método del hijo.
Es como si el padre le dijera al hijo: "Hey, necesito que me des acceso a un elemento tuyo para poder trabajar con él desde mi código". Y el hijo responde: "¡Claro! Aquí está mi referencia para que puedas acceder a ese elemento y trabajar con él".
En otras palabras, `forwardRef` permite a los componentes hijos exponer ciertos elementos o métodos a sus componentes padres para que puedan trabajar juntos de manera más eficiente._**


## unsando useImperativeHandle
que es useImperativeHandle?
**_`useImperativeHandle` es un hook en React que permite a un componente hijo exponer algunos métodos públicos para que su componente padre pueda acceder a ellos y llamarlos directamente.
Es como si el hijo dijera: "Hey papá, aquí hay algunos métodos que te permitirán hacer cosas interesantes conmigo. Puedes usarlos directamente desde tu código, no tienes que preocuparte por acceder a mi interior". Y el padre responde: "¡Excelente! Eso hará que trabajar contigo sea mucho más fácil"._**

Ejemplo combinando useImperativeHandle y forwardRef:

```jsx
//tenemeos un elemento reutilisable que lo que hace es serrar o mostrar algo de la siguiente manera
const Togglable = forwardRef(({ children, btnText }, ref) => {
// usamos un componente que tenga forwardRef donde primero recive las props y luego la referencia que nosotros indicamos
    const [visible, setVisible] = useState(false) 
    const handleLoginVisible = () => {
        setVisible(true)
    }
    const changeVisibiliti = () => setVisible(!visible)  
    useImperativeHandle(ref, () => { return { changeVisibiliti } })
    //guardamos la funcion changeVisibiliti en la ref asi la podemos usar en el otro componente
    
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    
    return (
        <>
           <div style={hideWhenVisible}>
               <button onClick={handleLoginVisible}>{btnText}</button>
           </div>
           <div style={showWhenVisible} >
                {children}
                <div style={showWhenVisible}>
                    <button onClick={() => setVisible(false)}>cancel</button>
                </div>
            </div >
        </>
    )
})

//tengo un componente que hace una nota haciendo un post
//quiero que cuando se agrege una nota se esconada el input con el componente que esta arriva
//pero como hacemos esto si el estado esta arriva y el estado lo quiere manejar el hijo 
const NoteForm = ({ addNote, handleLogOut }) => {
    const [newNote, setNewNote] = useState('')
    const togglableRef = useRef()
    // declaramos la referencia a el componenete Togglable
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5
        }  
        addNote(noteObject)
        setNewNote('')
        togglableRef.current.changeVisibiliti()
        //aqui lo usamos current es la forma de acceder a la referncia
    }
    return (
        <Togglable btnText={'add note'} ref={togglableRef}>
            <button onClick={handleLogOut}>cerrar secion</button>
            <form onSubmit={handleSubmit}>
                <input
                    value={newNote}
                    onChange={(event) => setNewNote(event.target.value)}
                    placeholder='add note'
                />
                <button type="submit">save</button>
            </form>
        </Togglable>
    )

}

```
<FONT color='red'>Nota: de ser posible nunca trabajes de esta forma ya que se le puede conciderar una mala practica pero si tienes que hacerlo es muy complicado de entender</FONT>

# usando propTypes en react
que son las propTypes? 
**_Las `prop-types` son una herramienta de validación de tipo para las propiedades que se pasan a los componentes de React. En otras palabras, es una biblioteca que se utiliza para asegurarse de que las propiedades que se le pasan a un componente tienen el tipo correcto y cumplen con ciertas reglas. Esto es especialmente importante para detectar errores en el código y evitar que se propaguen por la aplicación._**

Ejemplo:
```jsx
const App = () => {

return(
	<Text content={'hola'}/>
)
}

const Text = ({content}) => {
return(
	<span>{content}</span>
)
}

text.propTypes = {
	content: proptypes.string.isRequired
}//aqui indicamos que el content deve ser de tipo string y tiene que ser requerido 

```

en caso de que tu componente tenga que estar envuelto por una funcion como porejemplo forwarref propType te pondra el nombre de la funcion por lo que podemos usar un metodo de typeProp para cambiar el nombre del componente 
```jsx
Text.displayName = 'hola'
//podemos poner cualquier nombre
```

<FONT color='red'>Nota: Esto es solo informativo esto no tiene ni un tipo de efecto es una forma de documentar tus componentes en produccion no funciona </FONT>

- Tipos de proptypes
| Tipo | Descripción |
|------|-------------|
| array | Un array de valores. |
| bool | Un valor booleano (verdadero o falso). |
| func | Una función. |
| number | Un valor numérico. |
| object | Un objeto. |
| string | Un valor de texto. |
| symbol | Un valor único e inmutable que puede ser utilizado como clave de objeto. |
| node | Cualquier nodo que pueda ser renderizado por React (por ejemplo, un elemento o una cadena de texto). |
| element | Un elemento React. |
| elementType | Un tipo de elemento React. |
| instanceOf | Una instancia de una clase en particular. |
| oneOf | Uno de los valores en una lista. |
| oneOfType | Uno de los tipos en una lista. |
| arrayOf | Un array de un tipo en particular. |
| objectOf | Un objeto con valores de un tipo en particular. |
| shape | Un objeto con propiedades especificadas. |
| exact | Un objeto con propiedades exactas especificadas. |
| any | Cualquier tipo de dato. |


# Utilizando valores por defecto en las props
imagina que tenemos un btn que el contenido que esta adentro se pasa por una propiedad pues si nosotros no pasamos esta propiedad va a quedar basia asi que podemos usar un valo por defecto de la siguiente manera

```jsx
const App = () => {

return(
	<Text/>
)
}

const Text = ({content = 'botton'}) => {
return(
	<button>{content}</button>//el resultado es botton ya que no esta definido en el componente 
)
}

text.propTypes = {
	content: proptypes.string
}
```

<FONT color='red'>Nota: si tenemos una propueadad por defecto nunca deverias de poner que la propiedad es requerida ya que esto es una mala practica</FONT>

# Custom Hooks 
Que es un custom Hook?  **_Un custom hook (gancho personalizado) es una función en React que permite encapsular la lógica reutilizable de componentes. Los custom hooks son una forma de compartir lógica entre componentes sin necesidad de utilizar herencia o complicadas estructuras de componentes de orden superior (HOC, por sus siglas en inglés)_*** 
En pocas palabras es una forma de separar y reutilizar la logica de los componentes.

En el siguiente ejemplo se muestra un contador con las funciones incrementar y decrementar el custom hook regresa dichas funciones y el valor del contador: 
```jsx
import { useState } from 'react';

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };//aqui regresamos las funciones
}

function Counter() {
  const { count, increment, decrement } = useCounter(0);//aqui usamos el hook y indicamos el initialValue

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

<FONT color='red'>Nota: Todos los custom hooks deben de empezar por use ejemplo useCounter</FONT>

<FONT color='red'>Nota: Nota si en el custom hook regresamos el metodo del estado y lo actualizamos en otro componente no se actualiza el estado del custom hook si no que se crea uno independiente</FONT>


# Haciendo un custom hook para no repetir formularios

En una aplicacion en react la mayoria de las veses los formularios son muy repetitivos pero para eso sirven los custom hooks para evitar el codigo repetitivo una forma de hacer un custom hook para formularios es la siguiente





----

> quieres aprender a servir la pagina desde el servidor [[NodeJS#Sirviendo la app desde el servidor]]

> quieres aprender a mandar solcitudes con token en el Front [[JSON web token & localeStorage & cookies#Mandando el token con axios desde el front]]

> Quieres aprender a testear tu UI o frontend [[Testing_frontend]]
