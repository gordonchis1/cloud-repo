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
