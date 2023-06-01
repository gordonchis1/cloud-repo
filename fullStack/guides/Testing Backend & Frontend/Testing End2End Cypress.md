# Cypress

Que es cypress? **_Cypress es un framework de pruebas de extremo a extremo (end-to-end) para aplicaciones web modernas. Permite a los desarrolladores y equipos de pruebas automatizar la interacción de los usuarios con una aplicación web y verificar su comportamiento y funcionalidad en diferentes escenarios._**
En pocas palabras es un framework para probar toda tu aplicacion de comienso a fin

# Empesando a usar cypress

Para empesar a usar cypress tenemos que instalar la dependencia de desarollo luego podemos crear un script para correr los test en nuestro package.json 
```json
    "cypress:open": "cypress-open"
```

Una vez corriendo el script nos abrira una ventana donde nos preguntara que tipo de testing queremos tenemos que poner la opcion de end2end nos preguntara el navegador y ponemos el que queramos una vez echo esto nos creara la carpeta cypress

# Levantando nuestro backend en modo test

para levanat nuestra api en modo test tenemos que hacer un nuevo script ya teniamos uno pero lo que hace es ejecutarl los test nosotros lo que queremos es que corra en modo test para que no use la base de datos por defecto de la siguiente manera

```json
"start:test": "NODE_ENV=test node index.js"
```

<FONT color="red">Nota: si estamos usando windows como sistema operativo tenemos que agregar antes de NODE_ENV cross-env por un error de las varables de entorno</FONT>

# Creando el primer test con cypress

Primero tenemos que crear el archivo con la extencion *.cy.js* 

El primer test que le suelen llamar smoke test es para comprobar que nuestra pagina puede ser visitada con exito

primero tenemos que hacer que cypress visite nuestra pagina y verifique si se muestra algun contenido
```js
describe('Note App', () => {
    it('frontpage can be opened', () => {
    //cy es un objeto con muchos metodos
        cy.visit('http://localhost:3000')
        //visitamos la pagina
        cy.contains('Notes')
        //aqui verificamos que la palabra 'Notes' se muestre en el contenido 
    })
})
```

y corremos el test una ves ejecutado se deveria de ver asi: 

![500](cypressFirst.png)

# Haciendo click en el test

Para hacer click en un botton con cypress tenemos que visitar la pagina luego recuperar el elemento con contains y hacer click de la siguiente manera

```js
    it('login form  can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('show login').click()
        //aqui le hacemos click al elemento que incluya este textto
    })
```
una vez echo esto podemos ver en el navegador los pasos que sigio al hacer click y que paso cuando iso click

# Usando beforeEach para visitar la pagina

Te das cuenta que cada que hacemos un test tenemos que visitar la pagina esto lo podemos automatizar usando beforeEach de la siguienete manera

```js
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
```

# Recuperando, llenando y enviando un formuliario

Este test de verdad ya es un test end2end por que vamos a testear el frontend y el backend llenando un formulario y enviandolo de la siguiente manera

```js
    it('user can login', () => {
        cy.get('[placeholder="username"]').type('gordonchis')
        //recuperamos el input por el placeholder y escrivimos el usuario
        cy.get('[placeholder="password"]').type('1234')
        //recuperamos el input por el placeholder y escrivimos la contrasena
        cy.get('#form-login-button').click()
        //recuperamos el botton de login y damos click
        cy.contains('add note')
    })
```

# Anadiendo linter a cypress 

Veras que te pone error en cada **cy** ya que eslint no reconose esto como una variable una forma de hacer esto es descargando la dependecia de desarollo llamada ``npm install eslint-plugin-cypress -D``
Una vez descargado tenemos que activar el plugin en el package.json y indicar que en las variables de entorno esten las de cypress de la siguiente manera

```json
  "eslintConfig": {
    "env": {
      "cypress/globals": true//indicamos que en env estan las variables 
    },
    "extends": "./node_modules/standard/eslintrc.json",//esto es mi configuracion de eslint
    "plugins": [
      "cypress"//aqui activo el plugin
    ]
  }
}
```


# Controlando base de datos para testing

Si quieres testiar algo con base de datos veras que cada que haces test se te agregeran elementos que no  uqieres lo que podemos hacer es una ruta de express para /resetear la base de datos que solo se puedan usar en el entorno de testing 

```js
// en documento testing controllers
const testRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
  
testRouter.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({}) 
  response.status(204).end()
})

module.exports = testRouter

// en el documento raiz del backend
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
}
```
<FONT color='red'>Nota: Tenemos que crear el usuario con un beforeEach en el test porque lo borramos manualmente</FONT>

# Hacer request en cypress

para hacer una riquest a una api o a una ruta podemos usar el metodo request de la siguiente manera
```js
    cy.request('POST', 'http://localhost:3100/api/testing/reset')
```

# Verificando si contiene algun elemento en los test con should

Para hser mas especificos y ver si un elemento contiene algo podemos usar should donde el primer atributo es la accion y el segundo lo que deveria contener la accion puede ser muchas cosas como si contiene un estilo si contiene una clase puedes ver todas las opciones [aqui](https://docs.cypress.io/api/commands/should))

```js
     cy.get('.error').should('contain', 'Wrong Credencials')
```

# Creando comandos para reutilisar cosas

Imagina que quieres reutilizar algun comando como el de vivistar la pagina para hacer esto tenemos que entrar a la carpeta **cypress/support/** y hai existe un archivo ya creado llmado **Commands** hai es donde devemos de definir nuestros comnados para agregar esto tenemos que definir de la siguiente manera:

```js
Cypress.Commands.add('login', ({password, username}) => {//esto es un ejemplo
//primero tenemos que llamar a cypress luego a commands y agregar

////////////////aqui funcion que queremos que realise/////////////////////
//ejemplo 
  cy.request('POST', 'http://localhost:3100/api/login', { username, password })
    .then(response => {
      localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(response.body)
      )
      cy.visit('http://localhost:3000')
    })
})
```

Pero haora como uso este comando en mis test pues podemos usarlo poniendo ```cy.<nombre de el comando>``` 

```js
    cy.login({ username: 'gordonchis', password: '1234' })
	   //name comando //parametros
```

# Reutilizar elementos del DOM en cypress

Imagina que tenemos un boton que cuando pulsamos cambia el texto lo logico seria ver el contenido inicial del boton y luego ver el que tiene despues de hacer el click aunque esto esta bien hay una forma mas rapida para reutilizar elementos del DOM Esto lo podemos hacer usando **as('')** de la siguiente manera:

```js
it('el boton cambio el texto', () => {
 cy.contains('Click Me').as('bottonToClick')
//recuperamos el elemento y luego le asignamos un nombre con as

 cy,get('@bottonToClick').contains('Click Me').click()
 //recuperamos el elemento con el nombre que abimos asignado el @ es obligatorio
 
 cy,get('@bottonToClick').contains('Tanks for clicking')
 //chekeamos que el click se haya realisado
 
})
```

# Ejecutando test desde la linea de comandos

Asta haorita tenemos los test corriendo en el vegador que hayamos elegido ya que esto es muy visual pero tambien hay una manera de correr los test desde la terminal para esto tenemos que agregar en el package.json el siguiente script

```json
    "test:e2e": "cypress run"
```
si haces esto se creara una carpeta llamada video en donde te dejara un video del procedimiento
