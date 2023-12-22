Primero antes de entrar en las github acctions tenemos que ver que es la **integracion continua**?
	La integración continua (CI, por sus siglas en inglés, Continuous Integration) es una práctica en el desarrollo de software que implica la automatización de la construcción, pruebas y despliegue de un proyecto de manera constante y frecuente. El objetivo principal de la integración continua es detectar y resolver problemas en el código de manera temprana, lo que ayuda a garantizar la calidad del software y facilita el proceso de desarrollo.

Pero que es **github acctions**?
	GitHub Actions es un servicio de automatización proporcionado por GitHub que te permite crear flujos de trabajo automatizados para tu repositorio de GitHub. Estos flujos de trabajo pueden ser utilizados para implementar prácticas de integración continua en tu proyecto.

Para empezar a trabajar con github acctions tenemos que tener un repositorio ya creado una vez echo esto podemos ver que en github ya podemos ver las acciones que github nos crea basado en el contenido de nuestro repositorio

![[github-acctions_page.png| 500]]

# Crear el primer workflow

Para crear esto primero tenemos que crear una carpeta llamada .github y un dentro de ella otra llamada workflows y dentro iran nuestros archvos **.yml** por lo que quedaria de la siguiente manera `.github/workflows/hello.yml` para crear nuestro primer workflow de github actions tiene que tener algunas cosas en concreto que son las siguientes

1. La primera cosa importatnte de los workflows es que les tenemos que definir un **nombre**
```js

name: say hello

```
> [!code] Definimos el nombre "say hello"

2. Despues tenemos que definir el **evento** osea que si el evento se dispara se lleve acabo esa accion
```js
on:  
  push:  
    branches:  
      - main
```
> [!code]- Evento de push en la rama main
> lo que le decimos es que cada que se haga un push en la rama main se ejecute la accion o el trabajo(job)

3. Una vez tengamos el evento tenmos que darle la **accion** o el **trabajo** que va realizar al momento de que el evento se dispare para relizar esto tenmos definir lo siguiente
	- **Nombre**: despues de la palabra clabe jobs tenemos que definir el nombre en el siguiente ejemplo el nombre es `hello_world`
	- **Sistema operativo**: luego tenemos que definir donde se va ejecutar el trabajo en este caso vamos a usar `ubuntu-18.04` en la propiedad **runs-on**
	- **Pasos**: luego de definir las anteriores dos tenemos que decirle los pasos con la palabra clabe **steps** los steps tambien tienen un nombre (**name**) la propiedad name es opcional
```yml
jobs:  
  hello_world:  
    runs-on: ubuntu-18.04  
    steps:  
      - name: Echo the message  
        run: echo "Hola mundo"
```
> [!code]- Definiendo nuestro primer job
> lo que estamos haciendo es pasarle la configuracion basica de todo job y luego pasarle los pasos a seguir en este caso un echo de Hola mundo

4. Una vez le definamos el trabajo a nuestra accion podemos **ponerla a prueba** haciendo un push en la rama main para disparar el evento para ver esto podemos ir a nuestro repositrio y en acciones nos mostrara todas las acciones completadas
![[acctions-dashbord__first.png|500]]


# Agregando mas pasos (steps)

Para agregar mas esteps solo vasta con agregar una linea con un *-* y el run de la siguiente manera

```yml
jobs:  
  hello_world:  
    runs-on: ubuntu-latest  
    steps:  
      - name: Echo the message  
        run: echo "Hola mundo"  
      - name: Dime la fecha  
        run: date  
      - run: ls -l
```
> [!code]- Agregando mas steps
> lo que hacemos es decirle una vez que hagas el echo quiero que me digas la fecha luego agas un ls -l


# Rcuperando el codigo con Checkout
En el ejemplo pasado al momento de ejecutar el comando `ls -l` podemos ver que nuestra maquina esta vacia ya que no emos escrito ni creado nada en ella.

Lo que vamos hacer es cada que alguien haga un push guardar ese codigo en un documento esto lo podemos hacer con la herramienta llamada **Checkout** de la github marketplace que es como una tienda donde podemos encontrar extensiones para nuestras acciones

Primero para hacer esto tenemos que añadir el pluggin de checkout a github esto lo podemos hacer desde la marketplace de github 
![[github-marketplace.png|500]]

En este caso el pluggin de **Checkout** se añade con las sigientes lines de codigo
```yml
- name: Checkout
  uses: actions/checkout@v4.1.1
```
> [!code] Añadir checkout

Luego de esto podemos agregar el comando que nos permite recuperar todo el historial de commits en todas las ramas para luego poder guardar en la maquina
```yml
jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v4  
        with:  
          fetch-depth: 0
```
> [!code] Comando para recuperar el historial

Luego para guardar esto que recuperamos podemos usar node ya que es la forma  mas sensilla pero primero tenemos que instalar node para esto podriamos usar la instalacion tipica de node pero esto haria que cada que se ejecute instalemos node por lo que tambien existe un pluggin que nos perimte esto **Setup Node.js environment**

```yml
- uses: actions/setup-node@v3
  with:
    node-version: 18
```
> [!code] Usando este codigo podemos instalar la version 18 de node



# Creando nuestro primer pipeline de despliege 

Que es un pipeline? Un pipeline es una tuberia por donde pasa todos los procesos por los que fluyen nuestra aplicacion

Una vez tengamos node descargado podemos empezar a deployar nustra aplicaion pasandola por nuestras tuberias 

1. Lo primero que podemos hacer es verificar el estilo y los errores del codigo haciendo un **lint** (eslint)
```yml
- name: install dependencies  
  run: npm install  
- name: Lint  
  run: npm run lint
```
> [!code] Instalamos las dependencias y corremos el lint

<FONT color="red">Nota: Para optimizar el proceso de instalacion de los paquetes podemos quitar que audite las dependencias ya que esto le suma tiempo agregando la linea npm install --no-fund --no-optional </FONT>

Una vez ya tenemos el codigo linteado y sin errores lo que podemos hacer es hacer la build de nuestro proyecto de la siguiente manera:

```yml
- name: Test
  run: npm run test
```
> [!code] Ejecutando el script de build

Luego podemos ejecutar los test si es que hay

# Haciendo testing end 2 end con github actions

Al momento de hacer una pipeline de despliege es comun que usemos el testing y un de ellos es el testing end 2 end. Lo que muchos pensarian es que solo vasta con instalar cypress, pero esto no es asi ya que cypress al descargar un navegador entero es muy pesado y seria muy tardio.

Primero lo que tenemos que hacer es agregar al package.json la dependencia de **cypress** pero no de manera comun si no que vamos a crear un para instalar solo cuando sea nesesario cypress de la siguiente manera 
```json
"test:e2e": "npx cypress run"
```
> [!code] Al momento de ejecutar este script lo que va hacer es instal de manera global cypress


2. Luego de agregar el script y tener nuestros test e2e podemos agregarlos a las acciones de git usando el pluggin de **Cypress.io** luego de esto lo que tenemos que hacer es configurar el plugin pasandole el comando que ejecutamos para usar cypress y el servidor que tenemos que arrancar para que los test salgan de manera correcta
```yml
- name: E2E  
  uses: cypress-io/github-action@v6.6.0  
  with:  
    command: npm run test:e2e  
    start: npm run start-test  
    wait-on: http://localhost:5000
```
>[!code]- Ejecutando los test e2e en el pipeline de deploy
> lo que hacemos es indicar que vamos a usar el pluggin de cypress.io despues le indicamos que el commando que ejecuta los test de cypress es npm run test:e2e luego le decimos que corra npm run start-test y cuando localhost:500 este activo corra los test

Algo que devemos de hacer es en el **.gitignore** desactivar los plugins los videos y los supports de cypress ya que esto hara mas lento el proceso y ocupara mas espacio en nuestra maquina virtual


<FONT color="red">Nota: los test end 2 end solo usalos para casos muy ecenciales ya que toman vastante tiempo</FONT>

# Opimizando la instalacion de dependencias 

En los ejemplos anteriores al momento de instalar las dependencias lo hacimos de manera normal con el comnado npm install.
Pero hay una forma mas optima de hacer esto usando el comando **npm ci** que lo que hace es optimizar las dependecias usando el package-lock
 
 ```yml
- name: install dependencies  
  run: npm ci
```
> [!code] Usando npm ci para optimizar la instalacion de dependencias

# Agregando secretos a github

Que son los secretos de github? Los secretos de github es una forma de agregar variavles de entorno que sean secretas y que pueden ser usados en las acciones de github

Para agregar variables de entorno tenemos que ir a la configuracion en github de nuestro repositorio

![[secretos-github_dashbord.png|300]]
luego le damos en agregar un secreto y ya podemos agregar secretos de github para diferentes entornos

<FONT color="red">Nota: Para acceder a los secretos de github desde una accion solo tenemos que poner ${{secrets.NOMBRE_DEL_SECRETO}}</FONT>

# Deployar app en heroku

1. Primero tenemos que crear la app en heroku con el comando `heroku create region us`y el nombre de la aplicacion 
2. luego tenemos que generar el token de heroku con el comando `heroku auhtorizations:create` lo que nos dara un token para hacer el despliege de nuestra aplicacion luego tenemos que agreagar este token a los secretos de github junto con el token de la api y la aplicion:[[#Agregando secretos a github]]
3. Cuando tengamos el token en una varivle de entorno ya podemos deployar con nuestro pipeline agregando un job de deploy en heroku para esto vamos a usar el pluggin de **deploy to Heroku**
```yml
-name: Deploy to heroku
-uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.14 # This is the action
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "YOUR APP's NAME" #Must be unique in Heroku
          heroku_email: "YOUR EMAIL"
          healtCheck: "https://${{secrets.APP}]/healt"//lo que hace esta linea es verificar la ruta healt
```

# Integrando el pull request a nuestro pipeline de despliege

En los ejemplos anteriores todas las acciones se ejecutaban cuando se hacia un push pero que pasa cuando algien intenta hacer un pull request. En el siguiente ejemplo vamos a ver como escuchar los pull request

```yml
on:  
  push:  
    branches:  
      - main  
  pull_request:  
    branches: [main]  
    types: [opened, synchronize]
```
> [!code] Agregando el evento de pull request en el pipeline de despliege

Pero esto lo estamos agregando al pipeline de despliege imagina que no queremos que los pull request se despliegen en nuestro servidor final lo que podemos hacer es usar un metodo llamado **if** que sirve como condicional para indicarle cuando si y cuando se deven de ejecutar los jobs

Para saber en que contexto se esta ejecutando la accion podemos usar un objeto que nos da github por default llamado **context** que tiene toda la informacion de el contexto de la accion una de ellos es el evento que nos dice si fue un pullrequest o un push o un pull

```yml
-name: Deploy to heroku
if: ${{github.event_name == "push"}}
 uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.14 # This is the action
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "YOUR APP's NAME" #Must be unique in Heroku
          heroku_email: "YOUR EMAIL"
          healtCheck: "https://${{secrets.APP}]/healt"
          
```
> [!code] Agregando el if para solo ejecutar cuando el evento sea push

# Cancelar builds redindantes

Imagina que hacemos un push por lo que se ejecuta el workflow para los push pero en segida hacemos otro lo que va a pasar es que se estan haciendo dos buids al mismo tiempo por lo que lo ideal seria cancelar el workflow anterior,
Esto lo podemos hacer usando el pluggin de **cancel-workflow-actions** que lo que nos permite es pasarle el token de github para que el cancele automaticamente las builds anteriores

```yml
- name: cancel previous redundant builds  
  uses: styfle/cancel-workflow-action@0.9.1  
  with:  
    access_token: ${{ github.token }}
```
> [!code] Codigo para evitar dos builds simultaneas

# Controlando jobs paralelos 

En los ejemplos anteriores teniamos un pipeline de despliege que iba un trabajo por uno por ejemplo se eliminaba los builds simultaneos luego se hacia la build uno no tiene nada que ver con otro por lo que podriamos hacer al build al mismo tiempo que eliminamos las builds simultaneas esto lo podemos hacer dividiendo las acciones en diferentes trabajos por lo que podemos hacer acciones al mismo tiempo y indicar cuando termine una accion cual otra tenemos que hacer

1. Dividir las acciones en diferentes trabajos a los cuales les debemos de indicar en que sistema operativo se van a ejecutar ya que son diferentes maquinas 
```yml
jobs:  
  avoid_reduncy:  
    runs-on: ubuntu-latest  
    steps:  
      - name: cancel previous redundant builds  
        uses: styfle/cancel-workflow-action@0.9.1  
        with:  
          access_token: ${{ github.token }}  
  
  lint:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v4  
        with:  
          fetch-depth: 0  
      - uses: actions/setup-node@v3  
        with:  
          node-version: 16  
      - name: install dependencies  
        run: npm ci  
      - name: Lint  
        run: npm run lint
```
> [!code]- Ejemplo de josbs parelelos
> En el ejemplo las builds redundantes se estan cancelando al mismo tiempo que al codigo se le aplica el lint

# Comunicar los jobs paralelos

En el ejemplo anterior pusimos a que se cancelaran las builds redundantes y que se eslinteara el codigo pero estas dos acciones no tienen nada que ver entre si por lo que se puede ejecutar sin comuncarse.
Pero imagina que queremos hacerle test a una build por lo que el job de test necesita de la build para hacer esto podemos guardar un **artefacto** que es una forma de guardar una carpeta en forma de zip para poder utilizarla en diferente maquina o trabajo

1. Primero tenemos que ver como guardar un artefacto para esto tenemos que usar un pluggin **actions/upload-artifact@v2** y indicarle nombre de la carpeta que queremos guardar y donde se encuentra esta de la siguiente manera: 
```yml
- uses: actions/upload-artifact@v2  
  with:  
    name: dist  
    path: dist
```
> [!code]- Guardando una build
> lo que le decimos es que queremos guardar en una carpeta llamada dist la  carpeta que se encuentra en la ruta dist la cual va a subir a la nube para usarla en el futuro

```yml
steps:  
  - uses: actions/checkout@v4
    with:  
      fetch-depth: 0  
  - uses: actions/setup-node@v3  
    with:  
      node-version: 16  
  - name: install dependencies  
    run: npm ci  
  - name: Build  
    run: npm run build  
  - uses: actions/upload-artifact@v2  
    with:  
      name: dist  
      path: dist
```
> [!code] Ejemplo de build

2. **Descargando un artefacto de la nube**: En el ejemplo anterior subimos una build a un artefacto pero como uso este artefacto en otro trabajo esto lo podemos hacer de la misma forma pero usando el pluggin **actions/download-artifact@v2** esto en vez de subir descarga  el artefacto

```yml
- uses: actions/download-artifact@v2  
  with:  
    name: dist  
    path: dist
```
> [!code]- Descargar un artefacto
> En el codigo lo que le estamos diciendo es descarga el artefacto llamado dist en la ruta dist por lo que quiere decir path es donde quieres que lo descarge no donde se encuentra

3. Ahora solo le tenemos que decir que necesita nuestro trabajo para que espere lo que necesita por ejemplo si tenemos una build que queremos testear los test necesitan de la build por lo que tenemos que esperar a la build esto lo podemos hacer usando **needs** que lo que hace es esperar lo que necesita

```yml
test:
  need: [lint, build]
  runs-on: ubuntu-latest  
  steps:  
    - uses: actions/checkout@v4  
      with:  
        fetch-depth: 0  
    - uses: actions/setup-node@v3  
      with:  
        node-version: 16  
    - name: install dependencies  
      run: npm ci  
    - uses: actions/download-artifact@v2  
      with:  
        name: dist  
        path: dist  
    - name: Test  
      run: npm run test
```
> [!code] Indicando que necesita la build y el lint antes de hacer los test

Por lo que en resumen nos quedaria el flugo de la siguiente manera

![[deploy-pipeline_flow.png|500]]
> [!imagen]- Ejemplo de flow
> Esto lo que significa que avoid_reduncy no depende de nada no necesita de nadien pero los test dependen de lint y de la build


# Cacheando npm install

En los ejemplos de jobs paralelos podemos ver que cada que queremos usar las dependencias tenemos que instalarlos pero cuando cacheamos las dependencias lo que hacemos es solo instalar una vez las dependencias y en los fututros jobs usar la cache de los anteriores

Para esto solo tenemos que indicarle que queremos usar la cache de npm cuando agamos el setup de node 
```yml
- uses: actions/setup-node@v3  
  with:  
    cache: "npm"  
    node-version: 16
```

Un caso de uso muy comun es hacer un job solo para instalar las dependecias luego en todos los demas jobs usamos la cache siempre especificando que necesitamos la cache antes de continuar con el siguiente job