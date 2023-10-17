Que es react native?
**_React Native es un marco de desarrollo de código abierto desarrollado por Facebook que te permite construir aplicaciones móviles utilizando JavaScript y React, la popular biblioteca para construir interfaces de usuario. La principal característica que distingue a React Native es su capacidad para crear aplicaciones móviles auténticas y nativas que se sienten y se ven como si hubieran sido desarrolladas en lenguajes nativos como Java para Android o Swift para iOS. Sin embargo, aquí está el truco: todo el desarrollo se realiza utilizando conocimientos de JavaScript_**

En pocas palabras es una forma de hacer aplicaciones con react ya sea para android o para ios podiendo diferenciar entre ellas por lo que podemos hacer algunos componentes para ios y otros para android

# Como crear mi promera app de react native con expo

Expo es una forma de crear la aplicacion es como usar vite en react la forma de crear nuestra primera app es haciendo los siguiente

```npm
npx create-expo-app .
```

esto lo que hara es descargarnos los archivos nesesarios para nuestra app a la que podemos acceder usando **Android studio** para emular una app en android y **xCode** para emular la app en ios

# Componentes en react native

A diferencia de react en react native no podemos escribir HTML por lo que hay alguna diferencia en las etiquetas:

- **Texto**: Solo hay una manera de renderizar texto con la etiqueta `<Text>Hola mundo!!!</Text>`
- **View**: El componente View es el segundo mas importante que lo que nos permite es construir la UI es casi lo mismo que un ``<div>`` pero con una diferencia que siempre los view por defecto se comportan como un contenedor con **flexbox**
- **TextInput**: El componente TextInput es casi lo mismo que un  `<input>`
- **Touchable**: El componente Touchable es casi lo mismo que un `<button>` pero con la diferecia que ay un monton de ellos 
- **onClick**: En react todos los elementos pueden tener un onClick por ejemplo podemos hacer un `<p>` que tenga un onClick pero en react native esto no se puede siempre que queramos que algo sea clickeable tenemos que usar un **Touchable** con la diferencia que en ves de que sea onClick es onPress
- **Alert**: En React los alert casi no se usan ya que quedan feos pero en react native al integrarse con la UI de el sistema operativo lo vamos a uasr solo que ay una diferencia tenemos que usar el componente **Alert** de la siguiente manera `ònPres={Alert.alert("Hola mundo")}`


# Estilos en React native

En react native no podemos usar CSS por lo que tenemos que usar la propiedad **style** que es como los inline styles de react

```jsx
<View style={{ marginBottom: 100 }}>
```

Tambien notaras que en el marginButton no hay nigun unidad de medida para el 100 pero lo que hace esto es dejar 100px naturales del dispositivo

La forma anterior es una forma que esta bien pero no es tan optima ya que cada ves que el Componente se renderize se creara un objeto

La forma mas optima de hacer esto es usando un metodo que se llama `StyleSheet.create()` que lo que hace es que nos deja hacer un objeto con keys que seran como los selectores de CSS

```jsx
const styles = StyleSheet.create({
    container: {
        padding: 29,
        borderWidth: 1,
        borderBlockColor: "#252525"
    },
    strong: {
        color: "#000",
        fontWeight: "bold",
        marginBottom: 1
    }
})

const propssitoreItem = (props) => {
    return (
        <View key={props.id} style={styles.container}>
            <Text style={styles.strong}>id: {props.id}</Text>
            <Text>description: {props.description}</Text>
            <Text>Full name:{props.fullName}</Text>
            <Text>lenguage: {props.lenguage}</Text>
        </View >
    )
}
```
Esta es la forma mas optima de escribir estilos en react native

# Solucionado el renderizando debajo de la status bar

Si renderizas un componente sin ni un solo estilo lo que vas a ver es que tu contenido queda debajo de la status bar

![](img/statusbar.png)

Como podemos solucionar esto? una forma es usar las constantes que nos da expo al momento de iniciar el proyecto una de ellas es el alto de la statusbar por lo que podemos usar la propiedad marginTop con esta constante 

<FONT color="red">Nota: en algunas versiones de expo esta libreria no biene por default pero lo podemos instalar usando npm install expo-constants</FONT>

```jsx
import { View, Text } from "react-native"
import Constants from "expo-constants"

const Main = () => {
    return (
        <View style={{ marginTop: Constants.statusBarHeight }}>//aqui es donde usamos las constanst
            <Text>Rate repos app</Text>
        </View>
    )
}

export default Main
```


# Solucian el scroll en react native

A diferencia de react los view en react native no permiten el scroll por lo que si el contenido no cabe en el viewport tenemos que usar otro componente

![200](./img/scroll.png)
Lo que podemos hacer es usar dos componentes los cuales nos permitiran hacer scroll: 

1. **FlatList**: Este componente lo que nos permite es renderizar una lista y poder hacer scroll en ella por lo que en el ejemplo pasado lo mas optimo seria usar este componente

2.  **ScrollView**: Este componente esta mas enfocado a cuando nos interesa que se aga escroll en un contenido que no cabe en el viewport por ejemplo un texto

Usando el componente **FlatList** para renderizar una lista y poder hacer scroll en ella: 

```jsx
        <FlatList
            data={repositories}
            ItemSeparatorComponent={() => <Text> </Text>}//esto lo que hace es separar cada item de el de abajo
            renderItem={({ item: repo }) => {
                return (
                    <View key={repo.id}>
                        <Text>id: {repo.id}</Text>
                        <Text>description: {repo.description}</Text>
                        <Text>Full name:{repo.fullName}</Text>
                        <Text>lenguage: {repo.lenguage}</Text>
                    </View>)
            }}
        >
        </FlatList>
```
Es como hacer un map pero en vez de rendizar los datos en medio de la etiqueta lo hacemos en el atributo renderItem y el atributo data le pasamos los datos

# Crear un componente reutilizable para los estilos 

Una forma de estilar los componentes que podemos usar es hacer un diccionario de estilos y hacer que el estilo no los pasen por los parametros 

```jsx

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: "grey"
    },
    bold: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 13
    },
    blue: {
        color: "blue"
    },
    big: {
        fontSize: 20
    },
    small: {
        fontSize: 10
    }
})// creamos el diccionario


export default function StyleText({ blue, bold, children, big, small }) {
    const textStyle = [
        styles.text,
        blue && styles.blue,
        big && styles.big,
        bold && styles.bold,
        small && styles.small,
    ]// lo que hacemos es decir bold existe entonces ponlo en false por ende el and combierte el estilo a undefinated
    return (
        <Text style={textStyle}>{children}</Text>
    )
}
```

Por lo que en el compoenete donde queramos usar este componente deberia de quedar de la siguiente manera

```jsx
<View key={props.id} style={styles.container}>
    <StyleText bold>id: {props.id}</StyleText>
    <StyleText small>description: {props.description}</StyleText>
    <StyleText small>lenguage: {props.lenguage}</StyleText>
    <StyleText blue>Full name:{props.fullName}</StyleText>
</View >
```

# Haciedo un theme en react native

Imagina que queremos que nues app tenga diferentes temas por lo que podemos componetisar los estilos lo que nos permitira tener un patron de diseño

1. Definir nuestros estilos de el tema:
```js
const theme = {
    colors: {
        textPrimary: "#2492e",
        textSecondary: "#586069",
        primary: "#0366d6"
    },
    fontSizes: {
        body: 14,
        subheading: 15
    },
    fonts: {
        main: "System"
    },
    fontWeights: {
        normal: "400",
        bold: "700"
    }
}

export default theme
```

2. Crear nusestro componente el que vamos a reutilizar en nuestra app:

```jsx
const styles = StyleSheet.create({
    text: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    colorPrimary: {
        color: theme.colors.textPrimary
    },
    colorSecondary: {
        color: theme.colors.textSecondary
    },
    bold: {
        fontWeight: theme.fontWeights.bold
    },
    subheading: {
        fontSize: theme.fontSizes.subheading
    }
})


export default function StyleText({ color, children, fontSize, fontWeight, style, ...restOfProps }) {
    const textStyle = [
        styles.text,
        color === "primary" && styles.colorPrimary,
        color === "secondary" && styles.colorSecondary,
        fontSize === "subheading" && styles.subheading,
        fontWeight === "bold" && styles.bold
    ]

    return (
        <Text style={textStyle} {...restOfProps}>{children}</Text>
    )
}
```

Usando este componente lo que nos permitira es que nos puedan pasar el estilo por props
```jsx
<StyleText fontWeight={"bold"} fontSize={"subheading"}>{props.fullName}</StyleText>
```

# Agregar imagenes

Para agregar una imagen en react native hay un componente llamado **Image** pero con diferencia a react o HTML no se pone src para especificar la ruta si no que se pone **source** y se pone un objeto con el tipo de direccion que vamos a poner por ejemplo si vamos a usuar un url ponemos uri

```jsx
<Image source={{uri: "https://imgs.search.brave.com/pB5jKUX86a31qe_yECwGcQeUJi7u2_yFibSYu7bjJVo/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzI5L0dp/dEh1Yl9sb2dvXzIw/MTMuc3ZnLzUxMnB4/LUdpdEh1Yl9sb2dv/XzIwMTMuc3ZnLnBu/Zw"}}/>
```

<FONT color="red">Nota: en react native siempre deve de estar estilda la imagen ya que de lo contrario no se mostrara</FONT>

# Haciendo rutas con react router native

Esta es una libreria que nos permite tener casi las mismas funciones que react router dom pero en react native

1. Primero tenemos que envolver nuestra app con el provider de react router dom
```jsx
 <NativeRouter>  
   <Main />
 </NativeRouter>  
```
Si hacemos esto y estamos usuando la web de expo nos va a dar un error el cual podemos solucionar de la siguiente manera

Primero tenemos que instalar la dependencia de `@expo/webpack-config` para desarollo
Luego tenemos que crear un archivo llamado `wepack.config.js`
En este archivo tenemos que extender la configuracion de webpak haciendo que los archivos .jsx se conviertan a .js

```js
const path = require("path")  
const createExpoConfigAsync = require("@expo/webpack-config")  
  
module.exports = async function (env, argv) {  
    const config = await createExpoConfigAsync(env, argv)  
  
    config.module.rules.push({  
        test: /\.js$/,  
        loader: "babel-loader",  
        include: [  
            path.join(__dirname, "node_modules/react-router-native")  
        ]  
    })  
  
    return config  
}
```

2. Una vez con la dependencia funcionando ya podemos usar nuestras rutas de la siguiente manera:
```jsx
<Routes>  
    <Route path={"/"} element={<RepositorieList />}exact>  
    </Route>  
    <Route path={"/login"} element={<Text>Work</Text>} exact>  
    </Route>  
    <Redirect />  
</Routes>
```

# Hacer scroll para las tabs

Si quieres que un componente aga scroll podemos usar el componente llamado **ScrollView** seguido de el eje donde lo queramos si en horizontal o en vertical

```jsx
<ScrollView horizontal>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/"}>Repositories</AppBarTab>  
    <AppBarTab to={"/login"}>Login</AppBarTab>  
</ScrollView>
```

tambien podemos usuar la propiedad `showsHorizontalScrollIndicator={false}` para quitar la barra de scroll

# Cambiando el color de status bar (Expo)

Si vemos el color de la status bar depende de el color que este debajo de ella por lo que si tenemos un color negro o obscuro no podremos leer el contenido de la statusbar pero podemos cambiar esto

![](Status__bar-color.png)

Lo que tenemos que hacer es usar un componente que descarga expo por default llamado **statusBar** y especificar el tema de la siguiente manera

```jsx
export default function App() {  
  return (  
      <>  
        <StatusBar style={"light"}/>{// este es el componente}
        <NativeRouter>  
          <Main />  
        </NativeRouter>  
      </>  );  
}
```

![[Status__bar-dark.png|300]]
> [!imagen]- Despues de modificar el componente
>  Este cambio lo podemos hacer con un estado

<FONT color="red">Nota: esta es una forma de hacerlo cuando usamos expo pero si estamos usado otra plataforma tenemos que usar otro metodo</FONT>

# Platform select

Que es el platform select?Imagina que queremos que para los usuarios de **IOS** sea un componente y para los usuarios de **Ansroid** sea de otro color pues con platfor select podemos hacer esto de la siguiente manera

Lo que nos da platform es un monton de informacion de la plataforma como si es en un navegador si es en una TV o si es un Celular

```js

backgroundColor: Platform.OS === "android" ? "green" : "blue",

```
> [!code]- Cambiar el color segun el sisitema operativo
> En el ejemplo anterior lo que hacemos es que si el sistema operativo es igual a android lo ponemos de color verde y si es diferente lo ponemos de color azul

## Platform de forma mas sensilla

La forma anterior es una buena forma si solo queremos distingir entre dos sistemas operativos pero imagina que quremos disitngir entre mas o entre la web o el navegador

Pues platform tiene un metodo llamado **select** que lo que hace es que podemos usar un objeto para espesificar lo que queremos que pase de la siguiente manera

```js
backgroundColor: Platform.select({  
    ios: "red",  
    android: "blue",  
    default: "yellow"  
})
```
> [!code]- cambiar el color segun el sistema operativo usando select
> Lo que le estamos diciendo es que si el usuario se encuentra en ios que sea red si se encuentra en android blue y si se encuntra en algun otra yellow

<FONT color="red">Nota: Esto es solo un simple ejemplo pero podemos usar componentes enbes de solo colores</FONT>

```jsx
const AppBar = Platform.select({
ios: ()= require('./IOSAppBar.jsx').default,
default: () =require('./AppBar. jsx'). default
})
```
> [!code] Ejemplo de componentes 

# Usando los nombres de los componentes para seleccionar platform

En el ejemplo anterior vimos como usar una funcion para diferenciar la appBar de ios y de android esto es funcional pero hay una mejor manera que React Native nos da sin cambiar nada en el codigo solo en el nombre de los componentes

lo que tenemos que hacer es agregar una extension antes de jsx donde espesificamos para que sistema operativo es

![[components__platform.png]]
> [!imagen]- AppBar para ios y para los de mas
> Lo que le indicamos es que para ios queremos la AppBar con la extension .ios y para lo de mas queremos la AppBar normal

<FONT color="red">Nota: Esto es una bunea opcion para ocaciones muy concretas ya que si lo hacemos mucho el tamaño de nuestra app aumentara demasiado </FONT>

# Haciendo el sign in con FORMIK

Que es formik? Formik es una libreria que te permite hacer fomularios en React y React Native de forma mas sensilla lo que te evita tener que estar manejando estados.

Primero tenemos que instalar la dependencia de `formik` luego tenemos que segir los siguientes pasos: 

1. Despues tenemos que importar el componente llamado **Formik** que lo que hace es que nos va a crear un contexto en nuestro formulario este componente debe incluir dos parametros obligatorios el primero son los valores por defecto y el segundo es la funcion que vamos hacer al momento de enviar el formulario
```jsx
const initialValues = {  
    email: "",  
    password: ""  
}

const Login = () => {  
    return (  
        <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
        </Formik>  
    )  
}
```
> [!code]- Ejemplo de compoente login
> Lo que hacemos en el ejemplo es declalar la constante initalValues que son los valores iniciales de los input despues tenemos que hacer la funcion que hara al mandar el formulario

2. Una vez tenemos nuestro componente envuelto en el contexto de formik tenemos que indicar lo que va ir dentro de este componente osea hacer el cuerpo de nuestro formulario. 
	En esta ocacion se hace de una froma diferente lo que se pone dentro de la etiqueta Formik no son componentes si no con una funcion que al ejecutarse desmonta el componente que esta dentro de la funcion la funcion nos da unas propiedades como el handleChange handleSubmit y el value siendo estos los mas importates
```jsx
const initialValues = {  
    email: "",  
    password: ""  
}  
  
const Login = () => {  
    return (  
        <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>  
            {({handleChange, handleSubmit, values}) => {  
                return (<View>  
                    <TextInput 
		                placeholder={"E-mail"}  
	                    value={values.email} 
	                    onChangeText={handleChange("email")}>
	                </TextInput>  
                    <TextInput 
			            placeholder={"Password"} 
	                    value={values.password} 
	                    onChangeText={handleChange("password")}>
	                </TextInput>  
                    <Button title={"login"}/>  
                </View>)  
            }}  
        </Formik>  
    )  
}  
  
export default Login
```
> [!code]- Agregando los campos y cambiando los valores
>  Lo que hacemos en el atributo onChangeText es decire que hubo un cambio luego lo que hacemos es pasarle la funcion handelChange() y la propiedad de donde se encuentra el cambio

# Simplificando el codigo de formik con los hooks useField

En los ejemplos pasados vimos que formik no nos haorra casi nada de codigo pero esto lo podemos solucionar usando useField 

¿Que hace useField? useField es un custom hook que nos permite simplificar el codigo solo indicando el nombre de el campo y nos regresa un array de 3 pocisiones las cuales son
1. **Field**: Nos regresa el nombre de el campo por ejemplo si estamos usando el campo e-mail nos va a regresar e-mail
2. **Meta**: Esto nos regresa la informacion de el campo como que validaciones estamos usando o los errores
3. **Helpers**: Esto es lo que nos va a permitir actualizar los campos

Lo que tenemos que hacer es crear un componente donde solo le pasamos el nombre de el campo por las props y este name se lo pasamos a setValues de la siguiente manera 

```jsx
const FormikInputValue = ({name, ...props}) => {
    const [field, meta, helpers ] =useField(name)

    return(
        <StyledTextInput  value={field.value} onChangeText={value => helpers.setValue(value)} {...props}/>
    )
}
```
> [!code]- Ejemplo de componente de campo
> lo que hacemos es recibir name por parametros y pasarselo al hook luego en el componente cambiamos el value usando el helpers.setValues(value)

# Validando los formularios con yup

Imagina que en el e-mail alguien no pone un e-mail valido pues pare esto sirbe validar los formularios

Que es jup?Jup es una dependecia que nos ayuda a validar los formularios de manera mas sencillas

Para validar un formulario con yup tenemos que seguir los siguientes pasos:

1. Primero tenemos que crear la forma de el objeto que queremos osea espesificar que tipo de dato queremos que tenga cada elemento de ese objeto y si es requierdo o no
```js
export const loginValdationSchema = yup.object().shape({  
    email: yup.string().email().required("Email is required"),  
    password: yup.string().min(5,"Too short").required("Password is required")  
})
```
> [!code]- Ejemplo de un validacion de email y password
> Dentro de las props podemos indicar el error que queremos que este regrese si no se cumple la validacion

2. Para usar la validacion en el formulario de formik tenemos que agreagar la prop en el componente Formik llamado **validationSchema**
```jsx
const Login = () => {  
    return (  
        <Formik initialValues={initialValues} validationSchema={loginValdationSchema} onSubmit={values => console.log(values)}>  
            {({handleSubmit}) => {  
                return (<View style={{padding: 20}}>  
                    <FormikInputValue name={"email"} placeholder={"e-mail"} />  
                    <FormikInputValue placeholder={"Password"} name={"password"} secureTextEntry/>  
                    <Button title={"login"} onPress={handleSubmit}/>  
                </View>)  
            }}  
        </Formik>  
    )  
}
```
> [!code]- Agregando la propiedad validationSchema en el componente Formik

# Sacando informacion desde un backend

En los ejmeplos anteriores teniamos una lista de repostorios pero estos venian de un JSON local haora vamos a ver como sacar la informacion desde un backend

Primero tenemos que tener en cuenta que **fetch** y **axios** si se pueden usar en Ract Native por lo que no es muy diferente a hacer una request en react


Una forma de hacer un fetch de un backen es la siguiente:
```js
const [repositories, setRepositories] = useState(null)  
  
  
const fetchRepositories = async () => {  
    try{  
        const response = await fetch("http://192.168.100.22:5000/api/repositories")  
        const json = await response.json()  
        console.log(json)  
        setRepositories(json)  
    }catch (e) {  
        console.log(e)  
    }  
}  
  
useEffect( () => {  
    fetchRepositories()  
}, []);
```
> [!code]- Ejemplo de fetch

<FONT color="red">Nota: Es posible que si usamos el localHost vamos a tener muchos problemas asi que es mejor usar la ip</FONT>

# Apollo client y React Native

para conectar apollo client con react native lo podemos hacer de la misma manera que lo conectariamos a react por lo que el unico cambio que tenemos que agregar en react native es enbolver la app con el provider de ApolloClient

```jsx
export default function App() {  
  return (  
      <ApolloProvider client={apolloClient}>  
        <StatusBar style={"light"}/>  
        <NativeRouter>  
          <Main />  
        </NativeRouter>  
      </ApolloProvider>  
  );  
}
```

Todo lo demas se hace de la misma manera que en React.

