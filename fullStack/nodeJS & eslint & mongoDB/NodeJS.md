# Node.js

que es nodejs?Es un entorno de ejecucion de codigo de lado del para ejecutar codigo de javaScript _"Node.js se basa en el motor de JavaScript V8 de Google, que se utiliza en el navegador web Google Chrome. Sin embargo, en lugar de ejecutar JavaScript en el navegador, Node.js permite a los desarrolladores ejecutar JavaScript en el servidor, lo que les brinda una gran flexibilidad y eficiencia en la creación de aplicaciones en tiempo real y de alta escalabilidad"._-chatGPT

podemos empezar a ejecutar codigo de nodeJS desde la consola solo ejecutando el comando node

## Iniciar proyecto con npm

para iniciar un proyecto de node necesitamos usar npm para esto podemos ejecutar `npm init` lo que nos desplegara una serie de preguntas para omitirla podemos usar `npm init -y `

## Ejecutar archivo con nodeJS

para ejecutar un archivo desde la terminal podemos usar el comando node seguido de la direccion del archivo `node -file phat`

### Ejecutar con scripts

podemos usar el comando que mencionamos en la seccion pasada pero esto a largo plazo no es muy recomendable lo que tenemos que usar son los scripts que estan incluidos en nuestro archivo package.json

![](./img/scripts.png)

para ejecutar estos ecripts tenemos que usar el comando `npm run -nombre de escript` porejemplo `nom run start`

## Primer servidor con nodeJS

para crear un sevidor LOCAL en node js los pasos son los siguienetes

1. importar el modulo http
2. crear un server
3. pasar los parametros de request y response
4. escuchar en el puerto

```js
const http = require("http"); //importamos http

const app = http.createServer((request, response) => {
  //creamos el server
  response.writeHead(200, { "Content-Type": "text/plain" }); //le estamos pasando un status code de 200 y el texto va a ser plano
  response.end("hola mundo"); //texto que vamos a pasar
});

const port = 3000; //puerto

app.listen(port); //empezamos a escuchar el puerto esto significa que vamos a estar pendientes de una peticion en el puerto 3000
```

que es request y response? request y response son los dos parametros que se le pasa a un servidor uno es la peticion que nos indica que nos esta pidiendo el usuario y el response es lo que le vamos a entregar osea que cada que le llege una peticion se va a ejecutar el response

<FONT color="red">Nota: es importante que el puerto que eligamos este libre</FONT>

## Pasar objetos en un response

para pasar un objeto como response no lo podemos pasar asi como si nada tenemos que usar ya que esto causaria un erro lo que tenemos que hacer es combertir cada uno de estos datos a un string de la siguiente manera

```js
const notes = [
  {
    id: 1,
    content:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    date: "22/02/23",
    important: true,
  },
  {
    id: 2,
    content: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    date: "22/02/23",
    important: false,
  },
  {
    id: 3,
    content: "dolorem eum magni eos aperiam quia",
    date: "22/02/23",
    important: true,
  },
];

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "aplication/json" });
  response.end(JSON.stringify(notes)); //lo que esta haciendo es que stringify itera cada uno de los elementos y los combierte a str
});
```

## content type

depende de el tipo de dato que queramos debolver este tiene que tener un conten-type distinto

[**lista completa de content-type**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)

## Nodemon

que es nodemone? asta haora lo que estamos haciendo cada que queremos ver los cambios de nuestra apllicacion es cerrar el servidor luego volverlo a abrir esto lo podemos solucionar con una dependencia llamada nodemon la cual podemos instalar con el comando `node install nodemon -D`

pata ejecutar tenemos que agregar un script como `"dev":nodemon index.js` o desde la consola `nodemon index.js`

<FONT color="red">Nota: es importante que uses el -D en este tipo de dependencia ya que se refiere a que solo lo vamos a usar en el servidor de desarollo</FONT>

## que es express? y porque express?

_Express es un framework de Node.js que proporciona una capa de abstracción sobre el manejo de solicitudes HTTP y la creación de aplicaciones web y APIs. En términos sencillos, Express facilita la construcción de aplicaciones web utilizando Node.js._-chatGPT

## Express

para empezar a usar express primero tenemos que exportarlo como cualquier otra dependencia

luego tenemos que crear la aplicacion con el siguiente linea de codigo `const app = express()`

luego lo que temos que hacer es indicar que queremos mandar cuando se nos hace un get en el pad / (pagina principal)

```javascript
const express = require("express");
const app = express();

app.get("/", (requets, response) => {
  response.send("<h1>hello</h1>"); //cuando entren al pad regresamos un h1
});
```

podemos poner mas get por ejemplo cuando nuestra aplicacion resive una peticion en /home

```javascript
const express = require("express");
const app = express();

app.get("/home", (requets, response) => {
  response.send("<h1>home</h1>"); //cuando entren al pad regresamos un h1
});
```

para regresar un json podemos usar el `response.json(/_elemento o obj_/)`

en express ay una pequena diferencia cuando arrancamos el proyecto y es que es asincrono por lo que tenemos que poner una funcion con que se leeria como cuando termines de levantar el servidor ejecuta esto

```javascript
const port = 3000;
app.listen(port, () => [console.log("ejecutando")]);
```

## semantica en las versiones de package

las versiones en elm package.json tienen una semantica eso significa que cada numero tiene un significado por ejemplo en la siguiente version

**^2.0.7**

- el 7 es el parche en el que van osea que no cambia nada solo se arreglo algun bug o otra cosa

- el 0 es el minor que el el del medio eso lo que hace es indicar que tenemos una nueva feature o caracteriztica

- el 2 es la mayor estas son las versiones que cambian por completo el contrato de la dependencia

- el ^ o caret como se llama es que esta dependecia se actualiza automaticamente osea que mas adelante te puede instalar la version 2.0.8 pero nunca te instalaria la 3.0.0

<FONT color ="red">Note: si quieres tener controladas las versiones de las dependencias es nesesario que elimines el caret(^)</FONT>

## api res

una api res es un tipo de arquitectura de una api _API REST (o RESTful API) es un conjunto de convenciones y prácticas para construir y exponer servicios web que utilizan el protocolo HTTP para permitir la comunicación y el intercambio de datos entre aplicaciones. REST significa Representational State Transfer y se basa en el concepto de recursos, que son identificadores únicos para información o datos que se pueden acceder y manipular a través de una interfaz uniforme._-chatGPT

ose que ay un solo lick para todo un tema por ejemplo si estamos hablando de noas nuestro unica direccion para todo tanto como get o para post seria /api/notes

# Creando api res

## Devolver todas los elementos

```js
const http = require("http");
const express = require("express");
const app = express();

const notes = [
  {
    id: 1,
    content:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    date: "22/02/23",
    important: true,
  },
  {
    id: 2,
    content: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    date: "22/02/23",
    important: false,
  },
  {
    id: 3,
    content: "dolorem eum magni eos aperiam quia holas",
    date: "22/02/23",
    important: true,
  },
];

app.get("/api/notes", (requets, response) => {
  response.json(notes);
});

const port = 3000;
app.listen(port, () => [console.log(`live server in port ${port}`)]);
```

con este codigo ya estariamos debolbiendo todas las notas pero y si queremos debolver solo una

## Debolviendo elementos por id dinamica

primero tenemos que poner en la direciion algo que sea dincamico osea que sea como un identificador unico lugo tenemos que recuperarlo en el request de la siguiente manera para luego poner un filtro o una busqueda aver si existe esa id en una nota

```js
app.get("/api/notes/:id", (requets, response) => {
  const id = Number(requets.params.id); //recuperamos el id
  const filtro = notes.find((note) => note.id === id); //esto es un filtro para ver si existe

  response.json(note); //regresamos solo la nota que coincide
});
```

como id es dinamico si yo escrivo /api/notes/7193278173 el id seria el ultimo numero

tambien podemos hacer un filtro por si no encuentra el elemento como el diguiente

```javascript
if (note) {
  response.json(note);
} else {
  resposne.status(404).end;
}
```

## haciendo delete a elemetos

hasta aqui ya podemos llamar a solo uno pero que tal si queremos borrar un elemento en este caso una nota

para esto tenemso que cambiar la accion que es **_.get_** por **delete** luego tenemos que hacer un filtro que seria el siguiente `notes = notes.filter(note => note.id !=== id)` **lo que esta diciendo es recuperame todas las notas en un nuevo obj menos la que quiero borrar**

```javascript
const notes = [
  {
    id: 1,
    content:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    date: "22/02/23",
    important: true,
  },
  {
    id: 2,
    content: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    date: "22/02/23",
    important: false,
  },
  {
    id: 3,
    content: "dolorem eum magni eos aperiam quia holas",
    date: "22/02/23",
    important: true,
  },
];
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(requets.params.id); //recuperar id dinamica

  notes = notes.filter((note) => note.id !== id); //recupera todas las notas en un nuevo obj menos el que quiero borrar
  response.status(204).end(); //mandamos un estado 204 a la respuesta
});
```

pero como hacemos un delet si cuando ponemos la direccion se va aborrar pues para esto hay dos erramientas...

una puede ser [**postman**](https://www.postman.com/)

pero vamos a usar

## [**Imnsomnia**](https://insomnia.rest/)

Esta aplicacion es muy sencilla ya que la podemos aprender a usar con intuicion

pero lo importante esta aqui lo de verde es la accion y el boton es para mandar a la direccion que indicamos

![](./img/insomnia.png)

para eleminar una solo vasta con indicar la url y el id y esta se eliminara

![](./img/delate.png)<small>ya no existe la nota 1</small>

## Rest client in visual studio code

esta es una extencion de visual estudio code y es muy util por que en esta si alguien mas quiere hacer una peticion para probar puedes hacerla desde un documento aparte con la extencion .rest

para hecer esto tenemos que agregar un archivo que termine con la extencion **.rest** en el tenemos que indicar el metodo que queremos y en la esquina superior izquierda no aparecera para mandar la peticion

```rest
  //recuperar todas las notas
  GET http://localhost:3000/api/notes/
```

para hacer un post tenemos que pasar el objeto

![](./img/post.png)
<i>esto es lo que deveria contener un post</i>

![](./img/vs%20code%20request.png)

## agregar nota con POST

para hacer esto tenemos que usar el metodo **post**

1. primero tenemos que recuperar la nota que nos manda la cual se entuentra en el body de la request

2. tenmos que hacer el post pasando el obj

3. tenemos que recuperar las notas generar lo que tengamos que generar y concatenar con nuestro obj y regresamos la nueva nota

```javascript
app.post("/api/notes", (request, response) => {
  const note = request.body; //recuperamos el body

  const ids = notes.map((note) => note.id); //creamos una id
  const maxIds = Math.max(...ids);

  const newNote = {
    id: maxIds + 1, //sumamos al id mas alto mas uno
    content: note.content, //creamos el contenido
    imporant: typeof note.imporant !== "undefined" ? note.imporant : false,
    date: new Date().toISOString(), //creamos una fecha
  };

  notes = [...notes, newNote]; // esto es lo equivalente al concat

  response.json(newNote); //regresamos la nueva nota(o el objeto final)
});
```

![](./img/post.png)
<i>esto es lo que deveria contener un post</i>

<FONT color="red">Nota: antes teniamos que instalar a mano un parse de json pero en las verciones actuales de express esto ya no es nesesario</FONT>

![](./img/json%20parse.png)<i>esto temos que usar para el parse por defecto de express</i>

<FONT color="red">Nota: la id como si tenemos un date(fecha) no se tiene que pasar por una post ya que estas se deverian de generar la misma api _**entre menos contenido le pasemos a una api mejor**_ </FONT>


## middlewares en express

que es un middleware? un middleware es una funcion que intersepta la peticion que esta pasando por tu api 

para usar esto tenemos que usar la palabra clave **use** que significa que cualquier accion ya sea un get un post o un delete va a pasar por esta funcion osea que siempre se va a ejecutar

pdemso hacer lo que sea para recuperar datos de la request pero siempre al ultimo tenemos que indicar que siga con la funcion **next()** si no ponemos esto se quedara atascado en la funcion

```js
  app.use(request, response, next) => {
    console.log(request.method)// aqui pedimos el metodo que quiere usar ej. GET POST DELETE
    console.log(request.path)//aqui a que direccion ej. /api/notes/1
    console.log(request.body)//aqui el cuerpo si no tiene nos devolvera un obj vasio
    next()// aqui indicamos que siga a otro checkpoint
  }

  app.use((request, response,next)){
    console.log("segundo checkpoint")//despues pasa por aqui
    next()
  }
```

esto es muy util para crear un 404 ya que si no entra en ninguno se va a ir por la ultima opccion

## Problemas de CORS(Cross-Origin Resource Sharing)

Que es el cors? "El problema CORS se refiere a una situación en la que una aplicación web basada en navegador intenta acceder a recursos que están en otro dominio y el servidor no permite esa comunicación"-Bing Chat.
**En pocas palabras el problma es que la api esta en otro dominio y el backend de ella no espicifico quienes pueden hacceder a esta osea que otro dominio pueda acceder a ella** para solucionar:

- existe un middelwer para esto el cual se instala usando ```npm install cors``` es una dependencia de produccion no de desarollo


- para usar lo tenemos que requerir en el documento como cualquier otra dependencia ```const cors = require('cors')```

- **para usar este middleware tenemos que simplemente usarlo ```app.use(cors())``` esto por defecto dejara pasar todos los origenes pero tiene infinitas configuraciones**

<FONT color="red">Nota: Este middleware no lo uses como metodo de seguridad para tu API ya que es muy facil de hackear</FONT>