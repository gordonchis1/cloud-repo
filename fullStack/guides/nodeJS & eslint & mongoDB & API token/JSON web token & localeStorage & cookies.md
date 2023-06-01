> Esta es una continuacion de la guia [[MongoDB]] 

Que es un JSON web token(JWT)? **_Un JSON Web Token (JWT) es un estándar de la industria para la creación de tokens de seguridad que se utilizan para autenticar y autorizar el acceso a recursos en una aplicación web o móvil.**_

El siguiente diagrama es el flujo una vez teniendo el JWT implementado 
![300](flujo%20wb%20token.png)

# Creando la ruta para el login

Para hacer un JWT es nesesario tener un lugar donde el usuario ponga su contrasena y usuario de la siguiente manera:

1. Primero tenemos que recuperar el body para consegir el username y el password 

```js
loginRuter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  
})
```
2. Luego tenemos que verificar si el nombre de usuario existe en la base de datos

```js
loginRuter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  
  const user = User.findOne({username})//aqui vemos si existe
})
```
3. Tenemos que verificar que los el hash de el password de la base de datos sea igual que el que el usuario introduce si esta es incorrecta regresamos un 401 (Unauthorized) si es correcta regresar lo que queramos

```js
loginRuter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  
  const user = User.findOne({username})//aqui vemos si existe
  
  const passwordCorrect = user === null
    ? false
    : await bycrypt.compare(password, user.passwordHash)
    //passwordCorrect nos regresa false si el user no existe
    //si existe nos compara la contrasena que ingreso el usuario con la de la base de datos

if(!passwordCorrect){
	response.status(401).json({error: 'password or username invalid'})
}else{
response.send({
	name: user.name,
	username: user.username
 })
}
})
```

<FONT color='red'>Nota: nunca debes de indicar en que se equivoco si en la contrasena o en el usario ya que esta es una pista para un posible atacante</FONT>
# usando JSON web tokens para seder un token al usuario

ya tenemos nuestra ruta para login que lo que hace es verificar si la contrasena que el usuiario nos da coincide con la de la base de datos ahora tenemos que conservar la secion del usuario osea desir este usuario esta registrado esto lo vamos a hacer con [jwt](https://jwt.io/)

que es JWT?JSON Web Token (abreviado **JWT**) es un [estándar abierto](https://es.wikipedia.org/wiki/Est%C3%A1ndar_abierto "Estándar abierto") basado en [JSON](https://es.wikipedia.org/wiki/JSON "JSON")propuesto por [IETF](https://es.wikipedia.org/wiki/IETF "IETF") ([RFC 7519](https://tools.ietf.org/html/rfc7519)) para la creación de [tokens de acceso](https://es.wikipedia.org/w/index.php?title=Tokens_de_acceso&action=edit&redlink=1 "Tokens de acceso (aún no redactado)") que permiten la propagación de identidad y privilegios o _claims_ en inglés-Wikipedia
osea que es una herramineta que nos ayuda a crear un token para identificar si el usuario esta registrado

Esto es un ejemplo de un JWT:``eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c``

Este codigo se divide en los siiguientes partes:
<FONT color ='red'>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</FONT>.<FONT color ='purple'>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</FONT>.<FONT color='blue'>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</FONT>

-  <FONT color='red'>Header: </FONT>El header tiene la informacion del algoritmo y el tipo de token en este caso el algoritmo es HS256 y el token es del tipo JWT
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

-  <FONT color='purple'>Data:</FONT> la data es el la informacion que queremos guardar en el token por ejemplo el username el id etc... podemos poner lo que queramos siempre y cuando podamos guardar en formato json
```JSON
 {
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```
- <FONT color='blue'>Verify signature:</FONT>Es lo que nos ayuda a comprovar la firma osea que no nos accedan a los datos sin que tengan permisos esto es muy dificil de falcificar
```JSON
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  perro//este es nuestro secreto si alguien lo descubre nustra informacion esta comprometida
)
```

# implementando JWT en el backend

Primero tenemos que instalar el paquete de jsonwebtoken con npm y importar la dependencia en el controllador de nuestro endpoint de login donde ya tenemos la verificacion de que el passwor es correcto y que el usuario existe

1. primero tenemos que almacenar los datos que queremos que esten en el token por lo que podemos hacer es verificar que la contrasena este correcta y almacenar losdatos en una variable de la siguiente manera:
```js
  const user = await User.findOne({ username })

  if (!(passwordCorrect && user)) {
    response.status(401).json({
      error: 'error invalid user o password'
    })
  } else {
    const userForToken = {
      id: user.id,
      username: user.username
    }
  }
```

2. tenemos que crear el token pasandole el userForToken y la palabra secreta de la siguiente manera
```js
  const user = await User.findOne({ username })

  if (!(passwordCorrect && user)) {
    response.status(401).json({
      error: 'error invalid user o password'
    })
  } else {
    const userForToken = {
      id: user.id,
      username: user.username
    }
    
    const token = jwt.sign(userForToken, '123')//aqui es donde creamos el token 
    
    response.send({
      name: user.name,
      username: user.username
      token //qui devolbemos el token en la response
    })
  }
```
ya tenemos creado el token por lo que ya nos deveria de regresar el token al momento de hacer la peticion con un username valido y una contrasena valida de la siguiente manera

![](token.png)


<FONT color='red'>Nota: nunca se debe de poner la palabra secreta en el mismo archivo que el codigo esto es solo un ejemplo lo mas seguro es declararlo como variable de entorno</FONT>


# enviando token con header HTTP Bearer
ya tenemos una manera de hacer el token pero hasta el momento cualquier usauario puede hacer un post a la api sin estar authenticado por lo que tenemos que indicaer que solo los que cuenten con un token que sea veredigno puedan hacer acciones en nuestra api

Como recuperamos el token? hay muchas formas de obtener el token con http authentication pero primero vamos a ver que es http authentication?
**_HTTP authentication es un mecanismo para controlar el acceso a recursos en un servidor web. Cuando un cliente intenta acceder a un recurso protegido en un servidor web, el servidor puede solicitar al cliente que proporcione credenciales de autenticación, como un nombre de usuario y una contraseña._**
existen varios tipos de authentication HTTP puedes cer todos [aqui](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

1. primero tenemos que recuperar el token que se encuentra en el header del request de http express nos proporciona una manera facil de recuperarlo de la siguiente manera
```js
  const authorization = request.get('authorization')
  //esto nos va a debolver el metodo de authentication que estamos usando en este caso bearer por lo que nos va a devolver lo siguiente
  //Bearer .fihdqw98r983y295y2 <metodo> <token>
```
2. una vez tengamos el token y el metodo tenemos que verificar si el usuario nos esta mando el token con el metodo correcto de la siguiente manera
```js
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
  //lo pasamos a minusculas y checamos que enpiese con el metodo de authentication correcto
  }
```

3. una vez verificado tenemos que recuperar el token esto lo podemos hacer de muchas maneras ya sea con un split o un substring hay muchas maneras:
```js
  const authorization = request.get('authorization')

  let token = null
  
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)//aqui nos quedamos solo con el token
  }
```

4. ya tenemos el token pero aun no podemos acceder a la informacion ya que tenemos que decodificarla de la siguiente manera tambien tenemos que comprovar que el token exista y que sea valido
```js
  const authorization = request.get('authorization')

  let token = null
  
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)//aqui nos quedamos solo con el token
  }
  let decoddedToken = {}
  //como no podemos pasar algo vasio a decodded token tenemos que definirlo antes
  try{
  decoddedToken = jwt.verify(token, process.env.JWT_SECRET_STRING)
    //aqui decodificamos el token con la palabra secreta el primer arumento es el token y el segundo la palabra secreta que definimos en una variable de entorno
  }catch{}

   if (!token || !decoddedToken.id) {
    return response.status(401).json({error: 'token missing or is invalid '})
  }
  //aqui comprovamos que sea valido el token

```

Echo esto ya podemos hacer post solo si tenemos un token esto lo podemos hacer en insomnida de la siguiente manera
![300](insomnia%20token.png)

<FONT color='red'>Nota: podemos recuperar el userId del token para ya no tener que enviar de parametro el userId en el request</FONT>

# controlando el error de JWT

cuando algien intente entrar con un token falso o son token nos va a dar un error 500 porque no lo estamos manejando lo podemos manejar de la siguiente manera

```js
if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token is invalid ' })
 }
 //esto debe de estar dentro de un middleware que controle los errores
```

# haciendo que el token expire

una mediada de seguridad que podemos tomar es ponerle fecha de cacducidad al token osea que pasado un tiempo deje de funcionar de la siguiente manera

Esto se configura donde creamos el token 
```js
    const token = jwt.sign(userForToken,
      process.env.JWT_SECRET_STRING,
      {
       expiresIn: 60 * 60 * 24 * 7//estos serian 7 dias
      })
```

# Refactorizando como tener el token
para refactorizar el obtener el token podemos usar un middleware que lo que aga es hacer toda la logica que isimos en el post anterior mente de la sigueinte manera: 

```js
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')  
  let token = ''
  
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  } 
  const decoddedToken = jwt.verify(token, process.env.JWT_SECRET_STRING)
  
  if (!token || !decoddedToken.id) {
    return response.status(401).json({ error: 'token missing or is invalid ' })
  }
  const { id: userId } = decoddedToken
  request.userId = userId//aqui mutas la request para guardar el user id en la request
  next()
}
```
como funciona esto lo que hace es que si el token esta mal interrumpe la ejecucion y te manda un error 401 

Tenemos que agregar el middleware al endpoint de la siguiente manera
```js
notesRuter.get('/', userStractor, async (request, response, next) => {}
					//aqui
```
**Todos los endpoints que tengamos de la siguiente manera estan protegidos por token**

# Mandando el token con axios desde el front par a que el usuario pueda interactuar con el backend

una vez tengas un login en el frontend donde este haga el post al backen de login haora el usuario genera un token al login pere este token es inutil porque si quiero crear una nota en la aplicacion sige sin estar autorisado esto es porque el token solo se genera pero no se usa 

1. tenemos que recuperar el token y hacer un objeto llamado config y tenemos que definir que queremos mandar headers y luego autorizacion y el tipo  en este caso bearer y el token: 
```js
const confi = {
	headers: { Authorization: `Bearer ${token}`}
}
```
2. Tenemos que mandar la peticion con la ruta y los datos a enviar porejemplo el contenido de la nota y tambien la config de la siguiente manera: 
```js
const confi = {
	headers: { Authorization: `Bearer ${token}`}
}

axios.post('ruta', noteContent, config)//aqui mandamos los parametros
```

# usando localStorage para guardar el token
notaras que ya puedes crear notas con el token pero el problema es que cada que recargas la pagina te pide hacer login de nuevo o generar un nuevo token como podemos solucionar eso? 

Primero que es el localStorage? **_El `localStorage` permite a las aplicaciones web almacenar datos en el navegador web incluso después de que se cierre la sesión del usuario o se cierre el navegador. Los datos almacenados en el `localStorage` se almacenan en pares clave-valor y se pueden acceder y modificar fácilmente utilizando métodos de JavaScript._**
en pocas palabras en un objeto que se almacena en el navegador que no desaparese cuando lo cierras ni cuando recargas

una vez guardes tu token en una variable puedes hacer lo siguiente: 
```js
window.localStorage.setItem(//aqui creamos un item en el localStorage
	'loggedNoteAppUser', JSON.stringify(user)//creamos la key y el valor que es el usuario en string
)
```

asi se deveria de ver el localStorage desde el navegador
![400](localStorage.png)

una ves en el localStorage el usuario devemos de leerlo desde la aplicacion
```js
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')//aqui leemos el localStorage
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)//aqui lo convertimos de string a json
      setUser(user)
      setToken(user.token)
    }
  }, [])
```

<FONT color='red'>Nota: en el localStorage solo puedes almacenar strings osea la primera posicion es la key y la seguna el string</FONT>

<FONT color='red'>Nota: Si queremos hacer un logOut solo tenemos que eliminar el user del localStorage con el metodo .removeItem('nombre de item')</FONT>






