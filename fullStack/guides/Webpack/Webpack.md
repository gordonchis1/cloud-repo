Que es webpak?**_Webpack es una herramienta que ayuda a los desarrolladores a organizar y combinar diferentes archivos de código en un solo archivo. Esto es útil para los sitios web porque hace que los archivos sean más pequeños y rápidos de cargar._**

**_Imagina que estás construyendo una casa con muchos ladrillos. Webpack toma todos esos ladrillos, los organiza de manera eficiente y los coloca en una estructura sólida. En lugar de tener muchos ladrillos separados, ahora tienes un solo bloque compacto y ordenado_**

# Que es el punto de entrada de nuestra aplicacion

Antes de ver como usar webpack tenemos que entender que es el punto de entrada de nuestra apliacion.

Que es el punto de entrada de una aplicacion?el punto de enrtrada es el documento que importa todo por ejemplo en una aplicacion react seria el index donde renderizamos nuestro componente raiz lo que hace es importar todos los documentos y imagenes para que funcione nuestra aplicacion

**Una regla que casi siempre se cumple en el punto de entrada es que no puede exportar nada**

# Empezando a usar webpack

Para empezar  a usar webpack tenemos que instalar dos dependencias de desarollo una llamada webpack y otra webpack-cli una vez instalada ya podemos empezar a usar webpack

En el siguiente ejemplo tenemos una founcion y un punto de entrada de nuestro componente

```js
//Funcion a exportar
export const sayHi = () => {
    console.log('hola')
}

//Index.js
import { sayHi } from "./utils";

sayHi()
```

Ya con esto podemos usar webpack que lo que tiene que hacer es crarnos un solo archivo juntando los dos para esto tenemos que hacer un script en el package.json ejemplo:
```JSON
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"//ya con eso podemos usar webpack
  },
```

Si te das cuanta nos va a regresar un anucio que dice que no especificamos en que modo estamos trabajando para hacer esto tenemos que hacer lo siguiente
```JSON
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=development"//ya con eso podemos usar webpack
  },
```

una vez echo el build nos va a dar un output donde nos indica que nos a creado un archivo main cuanto pesa y cuantos modulos tenemos los modulos son todo lo que importamos a el punto de entrada 

lo que iso webpack es crearonos una carpeta con el nombre dist donde esta el archivo main.js en este archivo lo que hace es agruparnos los dos docuemntos en 1 solo

# Creando la configuarcion de webpack

Para configurar webpack podemos crear un archivo llamado **webpack.config.js** en el que tenemos que exportar un objeto
```js
//archivo de configuracion
module.exports = {
	entry: './src/index.js'//esta configuracion lo que hace es especificar el punto de entrada 
}
```

# Cambiando la ruta del output

Imagina que quieres que el archivo main o el resultado de webpack se cree pero no en una carpeta llamada dist dino que con el nombre que tu quieras pues esto lo podemos hacer con la configuracion

```js
    output: {
        path: path.resolve(__dirname, 'build')
    }
```

<FONT color='red'>Nota: siempre le tenmos que pasar la ruta absoluta al path no podemos solo pasar el nombre</FONT>

# Creando una aplicacion de react desde 0 

primero tenemos que instalar las dependecias de webpack como de desarollo luego las de react y la de react-dom  y tenemos que crear el index y renderizar el componente que queramos

```jsx
import React from "react";
import ReactDOM from 'react-dom'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```

Una vez teniendo creada nustra estructura basica de react vamos a intentar hacer el build te daras cuenta de que no se puede ya que webpack por defecto no entiende la sintaxis de jsx

# Haciendo que webpack entienda a react con un loader 

Que es un loader? un loader es como un traductor para webpack para que lo entienda en este caso vamos a usar babel que lo que hace es traducirle jsx a webpack tambien le sirve al navegador ya que el navegador tampoco entieende jsx por defecto

primero tenemos que instalar las dependecias de babel que son las siguienets @babel/core babel-loader @babel/preset-react todas como dependecia de desarollo

# Configurando un loader

para configurar un loader en webapck tenemos anadir un modulo en la configuracion de webpack y dentro de el modulo decirle las reglas en el que tenemos que indicar que tipo de archivos queremos que sean traducidos por babel

```js
    module: {
        rules:[{
            test: /\.js$/,//lo que le estamos diciendo es quiero que traduscas los archivos con extencion .js
            loader: 'babel-loader',//aqui le esta diciendo que lo tradusca usando babel
            options: {
                presets: ['@babel/preset-react']//aqui le indicamos el preset osea las plantillas de babel
            }
        }]
    }
```

Una vez echo esto ya puede entender webpack a react y podemos ejecutar la build

> Si quieres ver la configuracion de bable [@babel/core · Babel (babeljs.io)](https://babeljs.io/docs/babel-core/#options)

<FONT color='red'>Nota: este es solo un ejemplo de un loader ya que hay demaciados ya sea para scss para typescript</FONT>

# Evitando la mala practica de importar react

En los ejemplos pasados tenemos que importar react y react-dom esto en la actualidad es una mala practica ya que el preset de babel-ract tiene una configuracion para evitar esto 

```js
    module: {
        rules:[{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                "presets": [
                    ["@babel/preset-react", 
                    {
	                    "runtime": "automatic"// esta es la configuracion el defecto es classic
                    }]
                    ]
	           }
        }]
    }

```

# Cargando css en nuestra aplicacion

Si vemos en nustra aplicacion no nos deja poner estilos en nuestros componentes ya que webpack todavia no entiende css lo que vamos hacer es usar dos loaders uno para traducir el css y otro para cargar las imagenes staticas 

```jsx
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
```

# plugins en webpack
Que es un plugin en webpack? un plugin es anadir alguna funcionalidad a webpack en el siguiente ejmeplo vamos a implementar un plugin que nos permita no tener que crear el html de nustra app de react 

Pero como utiliso el plugin? la forma de utilizar plugins es poniendo en el acrhcivo de configuracion de webpack plugins: y un array donde indiquemos los plugins
```jsx
    plugins:[
       new HtmlWebpackPlugin({template: 'src/indexedDB.html'})
    ],
```

# Creando un entorno de desarollo con webpack

Asta haora lo que estamos haciendo es cada que hacemos un cambio volvemos a generar la build lo que es poco practico una forma de manejar esto es hacer un live server de webpack

```JSON
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=development",
    "dev": "webpack serve --mode=development"
  },
```

lo que nos creara es un live server y podemos ver nuestra aplcacion en el puerto 8080

# Hashear los documentos generados por webpack

imagina que tienes una apliacacion en produccion y quieres llevar un control de los cambios una forma de hacer esto es hacer un hash unico para cada cambio de la siguiente manera

```js
module.exports = (env, argv) =>  {
    const { mode } = argv
    const isProduction = mode === 'production'// si el modo es production debuelve true

    return {
    output: {
        filename: isProduction ? '[name].[contenthash].js': 'main.js',//si es true pones name y una hash unico para el contenido 
        path: path.resolve(__dirname, 'build')
    },}
```

