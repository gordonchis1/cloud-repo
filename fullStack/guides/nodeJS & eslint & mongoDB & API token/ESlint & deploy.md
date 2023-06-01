# ESlint	
#ESlint

que es Eslint? _"ESLint es una herramienta de análisis de código estático de código abierto para JavaScript. Se utiliza para identificar y reportar patrones en el código JavaScript, lo que ayuda a mejorar la calidad y consistencia del código en un proyecto."_-chatGPT
en pocas palabras ESlint es como un autocorrector para codigo te ayuda a dare un estylo a tu codigo

## instalar ESlint

para instalar ESlint se hace como se instala cualquier dependencia de desarollo de npm con el comando `npm install eslint -D`

## configuarar ESlint

para configurar eslint con un perfil por defecto podemos usar el comando `eslint --init`

1. la primera preguna que nos hara es ¿Cómo le gustaría usar ESLint? la que mejor va acorde a nuestros requerimientos es **To check syntax, find problems, and enforce code style** que lo que haria seria checar la sintaxis solucionar problemas y obligarnos a usar un solo estilo de codigo

2. luego nos hara unas preguntas acorde a nuestro proyecto

3. ¿Cómo te gustaría definir un estilo para tu proyecto? esto significa si queremos un stilo popular de codigo o uno que nosotros creemos

4. Al final depende de lo que elejimos nos creara un archivo con el nombre **.eslintrc**


## identificar los errores 

para identificar los errores que se generan con ESlinter podemos usar la extension o el comando ```eslint .```

![](eslint%20package.png)

## usar configuraciones ya creadas 

tambien podemos usar configuraciones que ya existen como un ejemplo pude ser standard 

para instalarlo utilizamos el comando ```npm install standard -D ``` con esto ya no nececitamos un eslintrc y solo agregamos lo siguiente en el package.json

![](standard_eslint.png)
> si quieres saber como agregar eslint a cypress [[Testing End2End Cypress#Anadiendo linter a cypress]]
# Deployar con Heroku

1. El primer paso para deployar nuestra API es hacer un repositorio de gitHub con todos los archivos de la api

2. Segundo paso es crear un archivo llamado procfile donde tenemos que indicar que tipo de servicio queremos deployar y el comando que tiene que ejecutar para ejecutar la api o aplicacion en este caso seria 

```Procfile 
  web: npm start
```

3. Tercer paso tenemos que cambiar en nuestro archivo el port ya que heroku nos va a asignar uno podemos hacer un or porsi no exitste 

```JS
 const PORT = process.env.PORT || 3001 
```

3. luego tenos que crear la aplicaion en la terminal con el seigiente comando

```powershell
  heroku create
```

esto nos ba a regresar una URL que vamos a utilizar pero en este momento aun no contiene nuestra app

4. para el paso sigiente heroku nos regresara un nuevo repositorio remto en git llamado heroku lo que tendriamos que hacer es usar el tipico comando de puish pero enves de pushearlo en el origen lo pushariamos en heroku

```git
  git push -u heroku master
```
cuando agamos esto se instalara en el remoto de heroku todos los archivos

<FONT color="red">Nota: para realizar el tercer paso tenemos que tener instalado [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)</FONT>

# Especificando la vercion de Node
para especificar la version de node que vamos a usar en heroku podemos hacer lo siguienet en el package.json

```json
  "engines": {
    "npm": "9.5.0"
  },
```

# Configurando las variables de entrno en heroku

Como al momento de hacer el deploy el archivo .env no se va a subir lo que tenemos que hacer es especificar las variables de entorno de otra forma una de ellas es dirigirte a la pgina de heroku y en proyectos escoges tu proyecto y buscas donde dice Revel config vars



