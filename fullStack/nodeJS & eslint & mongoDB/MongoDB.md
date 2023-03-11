# MongoDB

que es MongoDB? Es una base de datos no SQL por lo que esta basada en documentos que es la eleccion mas pocpular cuando se trabaja con javaScript

## Como crear tu primera DB en ModgoDB

primero tenemos que crear un cluster en la pagina web de MongoDB lo cual nos proporcionara una base de datos de prueba gratis luego tenemos que conectar 

![](./img/MongoDB_cloudster.png)

luego nos dara opciones para conectarnos pero bamos usar la opcion de conect to your app

hay diferentes programas/aplicaione para conectarnos a MongoDB pero vamos a usar Studio 3T que es facil y buena para esto nomas tenemos que copiar el link

luego nos bamos al shell y tenemos que indicar que queremos usar ni la local ni la main tenemos que usar la nuestra con el comando 

``` use "nombre de nuestra dbs"  ```

para terminar de crearla tenemos que crear una coleccion con el comando 

``` db.createCollection(name,options) ```

<FONT color="red">Nota: por regla las colecciones llevn nombres en plural por ejemplo post = posts</FONT>



## Creando una dbs

el primer paso es crear una coleccion en este caso 

```MongoDB
    use eduardovaldse

    db.createCollection("posts")
```

![](./img/mongoDB_posts.png)

### incertar datos en la base de datos
para insertar datos usamos el metodo **insert({})**

```
    db.posts.insert({
        id:2,
        name:"pedaso de post"
    })
```

<FONT color="red">Nota: es incesario crear una id ya que MongoDB te crea una por default</FONT>

<FONT color="red">Nota: como MongoDB no infiere nuestros esquema pueden ser diferentes en cada documento por ejemplo uno tener 5 elementos enbes de 2</FONT>

###  Hacer una consulta

podemos hacer una consulta con el metodo **find()**

``` db.posts.find() ```

## Acutalizar 

si queremos actualisar un valor podemos usar el comando **update()** de la siguiente maner 

```
db.phtos.update({user:"@grodonchis"},{
    $set: {
        name: "@gordonchisDEV"
    }
})
```

# Mongoose

Que es mongoose?_"Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono. Mongoose es compatible con Node.js y Deno (alfa). Es una biblioteca ODM (Object Data Modeling) para MongoDB."_-chatgpt
en pocas palabras esta aplicaion nos va a permitir definir un esquema en MongoDB y entre mas cosas

para instalar mongoose se hace como cualquier otro paquete de npm 

```npm install mongoose ``` 

## Conectar aplicacion a base de datos

para conectar aplicaion a nuestra base de datos tenemos que recuperar de la pagina web de MongoDB el conexionString

![](./img/conectionString.png)

y en en nuestro codigo tenemos que agragar lo siguiente

![](./img/conexionmongo.png)

para conectar tenemos que agregar la siguiente linea

```javascript
    mongoose.connect(connectionString, {useNewUrlParser: true}).then(() => console.log("DB conected"))
```
esto regresa una promesa por lo que tenemos que resolverla con then


## Definir esquema
que es un esquema?_"Un esquema en Mongoose es una estructura JSON que contiene información acerca de las propiedades de un documento. Puede también contener información acerca de la validación y de los valores por default, y si una propiedad en particular es requerida"_-bingCHAT 
osea es predefinr un estilo de nuestra vase de datos


para crear un esquema tenemos que usar el siguiente codigo
```javascript 
const noteSchema = new mongoose.Schema(
{ 
    content: String,//esto significa que content siempre va a a hser un string
    date: Date,
    important: Boolean 
})
```
en este ejemplo es un esquema para una nota 

<FONT color="red">Nota: estos esquemas son a nivel de applicacion por lo que si queremos ir a la base de datos y definir insertar un dato con diferente esquema lo podemos hacer</FONT>

## Crear modelo

una ves ya creamos un esquema tenemos que crear un modelo osea que vamos a crear el modelo final que se va a subir a la base de datos

para crear un modelo tenemos que usar la funcion model donde vamos a pasar el nombre del modelo y el esquema que es el que isimos en el paso anterior

```javascript 
const Note = mongoose.model('Note', noteSchema)//aqui definimos el modelo

const note = new Note({
  content: 'mongodb es imprecionante',
  date: new Date(),
  important: true
})//creamos la primera nota

note.save().then(result => {
    mongoose.connecton.close()//esto es una buena practica cerrar la conexion
    console.log(result)
}).cath(err => console.error(err))//aqui guardamos la nota en la db
```

![](./img/output.png)
este deveria de ser el output

<FONT color="red">Nota: los nombres de los modelos **siempre va en singular y en mayuscula la primer letra**</FONT>

## Buscar datos
para buscar datos desde nuestro documento podemos usar el comando ```find```

```javascript
    Note.find({}).then(
        (res)=> console.log(res);
        mongoose.connection.close()
    )
```
y esto nos devolvera los objetos que buscamos

## Conectando backend(applicacion) a MongoDB

primero lo fundamental por comodidad es separar de documento la conexion y el modelo para mayor comodidad


el archvio del **modelo** se veria asi
```javascript
import { Schema, model } from 'mongoose'

const noteSchema = new Schema({ content: String, date: Date, important: Boolean })

const Note = model('Note', noteSchema)

module.exports = Note
```


el archivo del la **conexion** de mongo
```javascript
const mongoose = require('mongoose')
const password = 'Elcantis'

const connectionString = `mongodb+srv://eduardovaldse:${password}@cluster0.vyoiqs3.mongodb.net/gordonchisdb?retryWrites=true&w=majority`

// conexion a monogo
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('data base conected')).catch(err => console.error(err))

const noteSchema = new Schema({ content: String, date: Date, important: Boolean })

const Note = model('Note', noteSchema)
```

en nuestra aplicacion tenemos que importar el archivo que hace la conexicon a mongo 

y tambien el modelo en este caso el modelo se llama notas por lo que nuestros import deben de quedar como se muestra en la imagen **primero el documento que hace la conexion y luego los modelos**

![](./img/conexioon%20app.png)


esto hara que se conecte automaticamente mongo pero si lo importas la conexion en funcion tienes que ejecutarla despues

## buscar en la base de datos

una ves conectada nuestra base de datos podemos empezar a hacer busquedas en ella por ejemplo en el sigiente ejemplo vamos a ver como una app hace una app hace una llamada par ahacer una api

```javascript
app.get('/api/notes', (requets, response) => {
  Note.find({}).then((data) => response.json(data))//busca todas las notas en la base de datos
})
```

en este momento si hacemos un request a esta api nos regresara todas las notas que tenemos en la base de datos

## cambiar el valor _id por defecto y quitar _V con (.set)

para hacer esto podemos usar transformar el metodo json en nuestro esquema para asi renobrar al _id como id para esto tenemos que conocer el metodo .set


lo que vamos a hacer es decirle a nuestro esquema que cuando se use el metodo .toJson en el cambie de comportamiento de la siguiente manera 

esto se hace con el metodo **set(metodo que queremos editar)**

```js
//notaSchema = a el esquema echo previa mente
notaSchema.set('toJSON', {
    transform: {document, returnedObject} => {
        returnedObject.id = returnedObject._id //le estamos deiciendo que solo transforme el _id a un id definido
    }
}) 
```

el output de el ejemplo anterior seria el siguiente 

![](./img/transformar%20metodo.png)

pero vemos que todiabia tenemos el valor de _id y __V vamos a eliminarla de la siguiente manera

```javascript
//notaSchema = a el esquema echo previa mente
notaSchema.set('toJSON', {
    transform: {document, returnedObject} => {
        returnedObject.id = returnedObject._id //le estamos deiciendo que solo transforme el _id a un id definido
        delete returnedObject._id,
        delete returnedObject.__v//decimos que queremos eliminar el valor de __v
    }
}) 
```

<FONT color="red">Nota: en muchos casos el elmento delete es una mala practica si lo hacemos mutando la base de datos en este caso no ya que estamos mutando el objeto a devolver y no el objeto de la vase de datos</FONT>

__"El método set en el esquema noteSchema se utiliza para modificar la configuración del esquema. En este caso, se está utilizando para definir una función de transformación personalizada para el método toJSON. Esta función se ejecutará cada vez que un documento de este esquema sea convertido a JSON y su objetivo es agregar un campo id al objeto JSON resultante que tenga el mismo valor que el campo _id del documento. ¿Te gustaría saber algo más sobre esto?"__

[si quiers saber mas sobre el metodo set click](https://www.mongodb.com/docs/v6.0/reference/operator/update/set/)

## Conectando un POST de una api a la db de mongo

para hacer esto tenemos que crear un elemento nuevo el cual ya esta definido su esquema previa mente de la siguiente manera

```javascript 
app.post('/api/notes', (request, response) => {
  const note = request.body

  const newNote = new Note({
    content: note.content,
    important: typeof note.important || false,
    date: new Date().toISOString()
  })
  newNote.save().then((saveNota) => { response.json(saveNota) })//lo que hacemos es crear una nueva nota y regresar la nueva nota en el response 
})
```

## Regresar una nota por id en una API con la vase de datos(findById)

esto lo podriamos hacer con un .find() pero esto es una mala practica ya que tenemos al metodo findById({}) donde solo tenemos que pasar la id

```javascript
app.get('/api/notes/:id', (requets, response) => {
  const { id } = requets.params

  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }
  ).catch(err => {
    console.log(err)
    response.status(503).end()
  })
})
```

## hacer delete en la base datos (findByIdAndRemove)

para borrar un elemento en la base de datos desde nuestra aplicacion podemos usar **findByIdAndRemove**

```javascript
app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params//recuperamos la id
  Note.findByIdAndRemove(id)//buscamos la nota por id y la borramos
    .then(result => { response.status(204).end() }//regresamos el status code
    ).catch(err => next(err))//usamos el middleware de express
})
```

## editar elemento de la base de datos 

para hacer esto podemos usar el metdo llamado **findByIdAndUpdate** aqui tenemos que pasar el body de lo que queremos actualizar 

```javascript
app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params//recuperamos el id
  const note = request.body//requperamos el body

  const updateNote = {
    content: note.content,
    important: note.important
  }//definimos la nota

  Note.findByIdAndUpdate(id, updateNote, {new: true}).then(data => {//tenemos que pasar la nueva nota y el id
    response.json(200, data).end()
  }
  )
})
```

<FONT color="red">Nota: la promesa regresa la nota antes de ser actualizada asi que si quieres regresar la nota vas a regresar la anterior pero podemos usar un 3 parametro donde diga {new: true}</FONT>