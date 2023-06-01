Que es NPM worksapeces? **_Los NPM workspaces son una característica que permite gestionar múltiples paquetes dentro de un mismo repositorio de NPM. Con esta característica, es posible tener varios paquetes relacionados en un solo repositorio, lo que simplifica la gestión y el mantenimiento de los mismos._**
Osea imagina que tenemos el backend en una carpeta y el frontend en otra podemos hacer un monorepositorio para unificar los dos 

>si quieres construir la api y la app que vamos a estar usando [[React]] [[NodeJS]]

# Creando el primer monorepo

Siguiendo el ejemplo que teniamos tenemos nustro backend en una carpeta y nuestro fronted en otra lo primero lo que tenemos que hacer es crear una nueva carpeta y iniciar un proyecto de npm con el comando ``npm init -y`` una vez echo esto te vas a dar cuenta que tenemos 3 package.json el que creamos el de el backend y el de el frontend luego ya podemos empezar a unificar paquetes por ejemplo un caso muy comun es unificar el linter 

# Unificando configuracion de linter

Lo primero que tenmos que hacer es mover la configuracion que teniamos tanto en el backend y en el frontend a la raiz osea al package.json que esta en la raiz de la siguiente manera

```json
//PACKAGE.JSON de la raiz
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json",
    "env": {
      "jest": true,
      "cypress/globals": true
   },
    "plugins": [
      "cypress"
    ]
  },
```

De igual manera nos tenemos que llevar las dependencias de eslint de la siguiente manera: 
```json
//PACKAGE.JSON de la raiz
   "devDependencies": {
    "standard": "^17.0.0",
    "eslint-plugin-cypress": "^2.13.3",
  },
```

# Usando npm workspaces

para comensar a usar npm workspaces primero tenemos que definir los paquetes que tenemos en nuestra aplcacion en el package.json de la raiz de la siguiente manera

Osea tenemos que poner todas las rutas que tengan en su interior un package.json
```json
//Archivo package.json raiz
{
  "name": "notes-app",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "workspaces": [
    "notes__app-frontend",
    "backend_app-node"
  ],//aqui es donde definimos las dependencias
  //en mi caso tengo el backend y el frontend
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json",
    "env": {
      "jest": true,
      "cypress/globals": true
    },
    "plugins": [
      "cypress"
    ]
  },
  "devDependencies": {
    "standard": "^17.0.0",
    "eslint-plugin-cypress": "^2.13.3"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```


# Instalando las dependencias en el monorepo

Ahora que ya tenemos el monorepo creado podemos instalar las dependencias sige los siguientes pasos

1. Elimina las carpetas de node_modules si es que existe
2. instala las dependencias desde la carpeta raiz con npm install

<FONT color='red'>Nota: te vas a dar cuenta que cuando instales las dependencias en las carpetas del backend ni en la del frontend estara la carpeta de modules pues esta se creo en la ruta raiz</FONT>

# Agregar scrpits en el package.json raiz

Cuando uses npm workspaces te daras cuenta que tienes que estar moviendote por directorios para corre r ya sea el backen o el frontend esto lo podemos corregir agregando scripts en la carpeta raiz

Ejemplo:
```json
   "build": "npm run build --workspace=app"
   //indicamos que queremos correr la api en el workpace app
```