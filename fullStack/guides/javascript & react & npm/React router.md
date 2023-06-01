# Haciendo nustro react Router sin dependencias

Una forma que podemos usar es andiar if para cada ruta De la siguiente manera
```jsx
const Home = () => <h1>Home page</h1>
  
const Notes = () => <h1>Notes</h1> 

const Users = () => <h1>Users</h1>

const App = () => {
  const [page] = useState('Home')
  const getContent = () => {
    if (page === 'Home') {
      return <Home />
    } else if (page === 'User') {
      return <Users />
    } else {
      return <Notes />
    }
  }
  
  return (
    <div>
      {getContent()}
    </div>
  )
}
```

pero asta este momento no tenemos forma de movernos por las rutas osea siempre es Home la ruta

# Imimtando la navegacion con estados

En elejemplo anterior solo nos podiamos quedar en home ya que no habia nada que actualizara el estado de la ruta en el siguiente ejemplo lo que vamos a hacer es actualizar el estado con la el evento onclick

```jsx
  const [page, setPage] = useState('Home')

  const getContent = () => {
    if (page === 'Home') {
      return <Home />
    } else if (page === 'User') {
      return <Users />
    } else {
      return <Notes />
   }
  }

  

  const toPage = page => event => {
    event.preventDefault()
    setPage(page)
  }

  return (
    <div>
      <header>
        <a href='#' onClick={toPage('Home')} style={inlineStyles}>Home</a>
        <a href='#' onClick={toPage('Notes')} style={inlineStyles}>Notes</a>
        <a href='#' onClick={toPage('User')} style={inlineStyles}>Users</a>
      </header>
      {getContent()}
    </div>
  )//aqui ya estoy cambiando de pagina 
```

Que te quede claro que esto no es navegar ya que se podria decir que lo unico que estamos haciendo es un renderizado condicional ya que no estamos cambiando de ruta en el navegador

# Navegando pero no de la mejor forma

Pero como hago para navegar ya? pues una forma de hacer esto es con history y actualizando el stado de la siguiente manera

```jsx
  const toPage = page => event => {
    event.preventDefault()
    window.history.pushState(null, '', `/${page}`)//esto lo que esta haciendo es actualizando la url
    //lo que estamos diciendo es actualiza la url con / y la pagina que pase por props
    setPage(page)
  }
```

<FONT color='red'>Nota: si vas a una ruta diferente que no sea la default y luego recargas la pagina veras que estas en la url de la pagina que fuiste pero la pagina mostrada sera la default porqur? la razon es que estamos manejando la url con el stado que no es mantenivle y al recarar el estado se resetea</FONT>

una forma de solucionar esto es haciendo que el estado sea la location del navegador de la siguiente manera

```jsx
  const [page, setPage] = useState(() => {
    const { pathname } = window.location
    const page = pathname.slice(1)
    return page
  })
```

<FONT color='red'>Nota: Esta forma de hacer ruting sin dependencia esta casi obsoleta por eso es bueno que sepas esta manera de hacer ruting pero no es la mejor forma </FONT>


# Navegando con React-Router-DOM

que es react-router-dom?**_ React Router DOM proporciona componentes y utilidades para el enrutamiento en aplicaciones de una sola página (SPA) basadas en React. Esta biblioteca es una capa adicional construida sobre React Router, que se enfoca en el entorno del navegador y brinda funcionalidades específicas para el enrutamiento en aplicaciones web._**
en pocas palabras es una biblioteca que te ayuda a hacer ruting

para empezar a usar react-router-dom siempre nuestro componente donde vamos a usar cualquier metodo de react-router-dom debe estar embuelto por la etiqueta **<BrowserRouter/>**

De la siuiente manera
```jsx
const App = () => {
	return(
	<BrowserRouter>
		<MyComponent/>
	<BrowserRouter/>
	)
}
```

# Navegando con el componente Link

Una vez nuestra aplicacion o componente esta embuelta entre BrowserRouter podemos usar un componente que viene en la libreria llamado link  que es como un a pero para modificar la ruta de la siguiente manera

```jsx
const App = () =? {
  return (
    <BrowserRouter>
      <header>
        <Link to='/Notes' onClick={toPage('Notes')} style={inlineStyles}>Notes</Link>
        {//lo que estamos haciendo es cuando le des click quiero que cambies la ruta por /notes}
        <Link to='/Home' onClick={toPage('Home')} style={inlineStyles}>Home</Link>
        <Link to='/User' onClick={toPage('User')} style={inlineStyles}>Users</Link>
      </header>
      {getContent()}
    </BrowserRouter>
  )}
```

<FONT color='red'>Nota: Esto no actualiza nuestra aplicacion no es que cuando le piques el solo va a renderizar el componente solo cambia la url</FONT>

# Renderizar un componente segun la ruta

En el ejemplo pasado logramos que cambie la ruta usando react-router-dom pero haora quiero que segun que ruta este en el navegador se renderize el componente ejemplo si la ruta es /home renderiza el componente Home esto lo podemos hacer usando **Router** de la siguente manera

```jsx
const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>Home</Link>
        <Link to='/Notes' style={inlineStyles}>Notes</Link>
        <Link to='/User' style={inlineStyles}>Users</Link>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />{//lo que estamos diciendo es si la ruta es / renderiza home}
        <Route path='/Notes' element={<Notes />} />
        <Route path='/User' element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}
```

<FONT color='red'>Nota: Siempre deves de envolver las route en el componente Routes</FONT>


# Usando Rutas con segmentos dinamicos

Imagina que tenemos una aplicacion de mensajes y queremos que en laruta salga el id del usauario con el que estoy mensajenado como pudeo hacer eso porque no consoco la id del usauario pues la solucion es usando segmentos dinamicos de la siguiente manera

```jsx
 <Route path='/Note/:id' element={<h1>single note</h1>} />
 //lo que le estamos diciendo es que busque la ruta /Note/ y un id dinamico muy parecido a express
```

y para hacer el Link a un id dinamico podemos usar un string concatenado de la sigiente manera 
```jsx
 <Link to={`/Note/${note.id}`}>
 {//lo que le decimos es llevame a la ruta que sea /Note/ + la id de la nota}
```

Entonces como la runta /Note en el rute tiene el :id significa que si tu haces /Note/ y un numero o palabra al asar es una id dinamica

![](dincamicRute.png)

# Recuperar la id dinamica

Pero si no savemos cuando una id dinamica cual es la id como la podemos recuperar pues react-rutes-dom nos da un hook que se llama **useParams** que lo que hace es que nosregresa un objeto con todos los parametros que le pasemos a la id por ejemplo si tenemos un id dinamica que es userId el objeto va a tener el userId de la url dinamica

```jsx
const {id} = useParams()
//lo que le estamos diciendo es recupera el id de los parametros de la ruta
```

# Navegacion programatica con useNavigate

que es la navegacion programatica? **_La navegación programática es una técnica en la que se utiliza código para controlar y manejar la navegación en una aplicación web en lugar de depender de acciones del usuario, como hacer clic en enlaces o botones._**
En pocas palabras es una forma de controlar al usuario en la pagina moverlo nosotros entre pestanas

por ejemplo quiero que cuando el usuario se registre lo mande al inicio de nuevo esto lo podemos hacer con useNavigate

```jsx
  const navigate = useNavigate()

  navigate('/')
```

<FONT color='red'>Nota: podemos hacer otras cosas por ejemplo esperarnos un tiempo para mover al usario con un settimeOut</FONT>

# protegiendo rutas con react-ruter-dom

imagina que queremos que un usario no pueda acceder a una ruta como hacemos esto? Esto lo podemos solucionar con **Redirect** que lo que hace es redirigi a el usaurio a una pagin aque queramos

```jsx
const App = () => {
return{
	{if(user){
		<Redirect to='/'>
	}else{
		<Login />
	}}
}
}
{//lo que le estamos diciendo es si el user es true redirige a / osea no dejes que entre al login}
```


