Que es GraphQL? 
**_GraphQL es un lenguaje de consulta y una especificación de API desarrollada por Facebook en 2012 y posteriormente lanzada al público en 2015. Es una alternativa a las API REST tradicionales y permite a los clientes especificar de manera precisa los datos que necesitan de un servidor._**

Cual es el objetivo de GraphQL?
Primero tenemos que tomar en cuenta sus principales caracterizticas

![](caracterizticasGraphQL.png)

- **Describe your data**: Siginifica que tienes que especificar cuales son los datos que quieres ya sea manipular o recuperar 

- **Ask for you want**: Que puedes preguntar lo que quieres recuperar lo que quieras

- **Get predictable results**: Que sabes como va a hacer el objeto que te va a regresar osea de que tipo que sige el mismo contrato esto se debe a que enterior mente ya describimos los datos

# Creando nuestro primer servidor de GraphQL con Apollo

Ay muchas formas de iniciar un servidor de graphql pero la que vamos a utilizar nosotros es la de Apollo 

Que es Apollo? 
![](ApolloDiagram.svg)
Apollo es el que nos va a conectar para que la web aga las peticiones 

Para empezar tenemos que instalar apollo-server graphql

# Describiendo los datos en graphql

Com dijimos en el inicio en graphql una de sus caracterizticas es que tenemos que describir los datos por para hacer esto nesesitamos: 

1. tener nuestros datos:
```js
const persons = [
    {
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "phone": "1-770-736-8031 x56442",
    },
    {
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "phone": "010-692-6593 x09125",
    },
    {
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "phone": "010-692-5555 x09125",
    }
]
```

2. una vez ya tengamos nustros datos podemos describir los datos primero tenemos que importar gql (graphql query lenguage) de apollo server luego tenemos que usar el metodo gql y templates string para describir 
```js
import { gql } from "apollo-server"

const typeDefs = gql`
    type Person{
        name: String!
        username: String!
        phone: String
        email: String!
    }
`
//El signo de exclamacion indica que es requerido
```

3. una vez ayamos describido los datos tenemos que describir los querys que son las peticiones que se pueden hacer porejemplo una peticion para todas las personas
```js
import { gql } from "apollo-server"

const typeDefs = gql`
    type Person{
        name: String!
        username: String!
        phone: String
        email: String!
    }

	type Query{
        personsCount: Int!          /*aqui significa que nos va a regresar un entero*/
        allPersons: [person]!       
        /*significa que al hacer esta peticion nos va a regresar un array con el type persons*/                                
    }
`
```

# resolviendo los datos con RESOLVERS

en el ejmeplo anterior vimos como describir las querys pero haroa tenemos que decirle de donde saca esos datos de donde saca ese array que nesesita devolver

en el siguiente ejemplo se resuelven los datos de el ejemplo anterior:
```js
const typeDefs = gql`
    type Person{
        name: String!
        username: String!
        phone: String
        email: String!
    }

    type Query{
        personsCount: Int!
        allPersons: [person]!
    }
`

const resolvers = {
    Query: {// la propiedad del objeto se tiene que llamar igual que donde describimos las querys ^
        personsCount: () => persons.length,//aqui le estamos diciendo si te preguntan por personsCount quiero que regreses el persons.lenght
        allPersons: ()  => persons
    }
}
```

# Creando el servidor 

ya tenemos los datos los datos descritos y los datos resueltos aora lo que tenemos que hacer es crear el servidor con apollo y pasarle los typeDefs y el resolvers de la siguiente manera

```js
//esta variable siempre se tiene que llamar asi
const typeDefs = gql`
    type Person{
        name: String!
        username: String!
        phone: String
        email: String!
    }

    type Query{
        personsCount: Int!
        allPersons: [person]!
    }
`

const resolvers = {//esta variable siempre se tiene que llamar asi
    Query: {
        personsCount: () => persons.length,
        allPersons: ()  => persons   
    }
}

const server = new ApolloServer(
    typeDefs,
    resolvers
)// le tenemos que pasar el typeDefs y los resolvers con exactamente este nombre

//aora tenemos que iniciar el servidor
server.listen().then(({url}) => console.log(`server redy at ${url}`))
```

Una vez echo esto ya podemos levantar nuestro servidor con node al entrar al url nos abrira lo siguiente
![](openUrl.png)
Esto se llama graphql-playground aqui podemos escribir nuestras querys y ver el resultado

# Haciendo una query con parametros

Imagina que queremos poder buscar un usario por su nombre una forma de hacer esto es con los parametros pasandole el nombre por parametros de la sigiente manera 

1. Primero tenemos que describir la query indicando el parametro y el tipo de elemento que se espera
```js
const typeDefs = gql`
    type Query{
        findPerson(name: String!): Person
    }
`
```

2. luego tenemos que resolever con y usar los parametros
```js
const resolvers = {
    Query: {
        findPerson: (roots, args) => persons.find(item => item.name === args.name)
    }
}// en la funcion nos llegan muchos parametros pero tenemos que usar el root, y los args que en los args es donde nos va alelgar los argumentos en este caso args.name
```

en el playgrond se veria asi:
![](findPerson.png)

<FONT color='red'>Nota: si no encuentra a la persona o lo que busquemos regresera null</FONT>

# Usando la propiedad root o prev en los resolvers 

que es el la propiedad root o prev? Es el objeto o lo que se resolvio antes en la cadena resolucion por ejmeplo si un usario quiero concatenar dos propiedades puedo usar la propiedad root para acceder a el siempre y cuando se alla resualto antes

Ejemplo en  el siguiente ejemplo vamos a concatenar las direcciones de la ultima persona que se resolbio de la siguiente manera

```js
const resolvers = {
    Query: {
        personsCount: () => persons.length,
        allPersons: ()  => persons,
        findPerson: (root, args) => persons.find(item => item.name === args.name)
    },
    Person:{
        personAdres: (prev, args) => `${prev.email}-${prev.phone}`//esto dice quiero que me juntes el email y el nuemero de la ultima persona que resolvite
    }
}
```

esto tambien es util cuando quieres hacer un campo que no existe en el objeto de donde lo sacamos por ejemplo si quiero devolver la direccion y en mi objeto no existe tengo que hacer lo siguiente root.city root.street

# Que son las mutations en garphQL

Que son las mutations en GraphQL?
**_En GraphQL, las mutaciones son operaciones que se utilizan para modificar los datos en el servidor. Mientras que las consultas se utilizan para recuperar datos, las mutaciones se utilizan para crear, actualizar o eliminar datos._**
Serian como lo equivalente a un put o un post en una peticion convencional

1. Primero tenemos que describir las mutaciones de la siguiente manera 
```js
const typeDefs = gql`
    type Mutation {
        addPerson(
            name: String!
            phone: String
            email: String!
            username: String!
        ): Person
    }
`
//esto significa que tanto el username y el phone el email el name los va a resivir por parametros
```

2. Despues tenemos que resolver las mutaciones de la siguiente manera
```js
const resolvers = {
    Mutation:{
        addPerson: (prev, args) => {
            const person = {
                ...args
            }
            persons.push(person)
            return person//aqui decimos que a el array de persons voy a agregar a la persona y voy a regresar la nueva persona
        }
    }
}
```

3. Una vez ayamos echo esto podemos hacer la mutacion 
![](mutationQuery.png)

# Validaciones en las mutaciones 

Imagina que quieres que los username sean únicos ósea que solo un usuario pueda tener su username y que sea único esto lo podemos hacer con las validaciones de las mutaciones

para esto tenemos que ver los error codes que nos proporciona Apollo [Error handling - Apollo GraphQL Docs](https://www.apollographql.com/docs/apollo-server/data/errors/)


una forma de hacer esto es con un if buscando en nuestros datos si existe
```js
Mutation:{
        addPerson: (prev, args) => {
        if(persons.find(item => item.name === args.name)){//s encuentras un name que sea igual al name de los parametros regresa un nuevo error
            throw new Error('name must be unique')
        }
            const person = {
                ...args
            }

            persons.push(person)
            return person
        }
    }
```
Esto pareciera que funciona pero si te fijas en el error te dirá lo siguiente un error de servidor y esto esta mal ya que si miramos los errores de Apollo esto se debe a un error de nosotros pero esto es un error de el usuario 
![](handleError.png)

lo que podemos hacer para solucionar es cambiar el error cada error de Apollo tiene un metodo esto lo puedes mirar en la docuemntacion de apollo que esta arriba pero lo podemos hacer de la siguiente manera:

```js
 Mutation:{
        addPerson: (prev, args) => {
        if(persons.find(item => item.name === args.name)){
            throw new UserInputError('name must be unique', {invalidArgs: args.name})
            //lo que icimos fue cambiar el error convencional por uno que indique que el error se deve a que el usauario metio inputs invalidos 
        }
            const person = {
                ...args
            }

            persons.push(person)
            return person
        }
    }
```

![](handleRefactorError.png)

# Enum para filtrar datos

Que son los enum? los enums son una forma de aplicar filtros por ejemplo solo quiero mostrar los usaurios que tengan telefono 

en el siguiente ejemplo vamos a filtrar a los usuarios que tengan numero de telefono o cualquier campo

1. Primero tenemos que describir los enum donde vamos a poner YES NO si nos pasan no por parametros significa  que quieren ver los usarios que no tengan telefono
```js
    enum YesNo{
        YES
        NO
    }
   //definimos el enum YesNo
  

    type Query{
        personsCount: Int!
        allPersons(phone: YesNo): [Person]!
        //ponemos que vamos a recibir de parametro phone que va a usar el enum de YesNo
        //esto sirve para poder recibir como parametro yes o no y que realice alguna accion
        findPerson(name: String!): Person
    }
```

2. Hacer la logica para filtrar los usuarios en los resolvers
```js
        allPersons: (root, args)  => {
            if(!args.phone) return persons
            //lo que estamos diciendo es si el usuario no nos pasa la prop de phone regresa todas las personas 
            else{
            const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone
            //si si filtra las personas qu etengan phone
            return persons.filter(byPhone)}
        },
```

2. ya podemos realizar la peticion de la siguiente forma 
 ```js
 query {
  allPersons(phone: YES){
    name
  }
}
```

# Mutation para editar datos en servidor de GraphQL

en una de las anteriores ejemplos vimos como usar una mutation para agreagar una persona aora vamos a ver como modificar el numero de telefono con una mutation 

1. primero tenemos que describir nuestra query donde devemos deecir que el usuario  nos tiene que pasar un name y el nuevo phone
```js
        editNumber(
            phone: String!
            name: String!
        ): Person
        //aqui indicamos que nos va a pasar el name y el phone y que le vamos a regresar un person
```

2. hacemos la logica para remplazar el elemento del array con el nuevo actualizado
```js
     editNumber: (root, args) =>  {
        const personIndex = persons.findIndex(person => args.name === person.name)
        //buscamos el indice de la persona
        if(!person) return null
        // si no encuentra regresa null

        const person = persons[personIndex]
        //recuperamos la persona con el indice

        const updatePerson = {...person, phone: args.phone}
        //actualizamos la persona

        persons[personIndex] = updatePerson
        //remplazamos la antigua persona con la nueva
        return updatePerson
    }
```

la query seria la siguiente
```js
mutation {
  editNumber(phone:"010-692-6593" , name: "Ervin") {
    username
    phone
  }
}
```

# conectando una rest api a graphQL

la forma de hacer esto es muy simple solo tenemos que modificar la funcion de el resolver y convertirla en una funcion asyncrona para hacer la llamada a la api de la siguiente manera

```js
        allPersons: async (root, args)  => {
            const {data: personsFromApi} = await axios.get("http://localhost:3000/persons")
            if(!args.phone) return personsFromApi
            else{
            const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone
            
            return personsFromApi.filter(byPhone)}
        },
```