Que es Next.js? 
	Next.js es un marco de desarrollo web de código abierto para React. Fue creado por Zeit y ahora es mantenido por la comunidad. Next.js se utiliza para construir aplicaciones web modernas y escalables utilizando React, una biblioteca de JavaScript para construir interfaces de usuario.
	En pocas palabras es un Framework que nos permite construir aplicacion de react de manera mas facil ya que nos aporta funciones comunes como las pages

# Iniciando un proyecto de Next.js
Para crear un proyecto de Next.js desde cero podemos usar npm con el siguiente comando

```sh
npm create-next-app@latest
```
> [!code] Comando para crear un proyecto de Next.js

Despues de usar ese comando nos dara una serie de preguntas que se contestan segun nuestras necesidades
Luego ya podemos usar `npm run dev` 

# Revisando los archivos y las rutas
Una vez tenemos echo el proyecto vemos que tenemos muchos archivos y muchas rutas pero para que sirve cada una de estas

![[learn-folder-structure.jpg|100%]]
>[!imagen] Estructura basica de un proyecto de Next.js

- **/app:** Contiene todas las rutas, componentes y lógica para tu aplicación; aquí es donde trabajarás principalmente.En esta carpeta se agregan todas las paginas con el siguiente formato NOMBRE.page.jsx
- **/app/lib:** Contiene funciones utilizadas en tu aplicación, como funciones de utilidad reutilizables y funciones para obtener datos.
- **/app/ui:** Contiene todos los componentes de interfaz de usuario para tu aplicación, como tarjetas, tablas y formularios. Para ahorrar tiempo, hemos preestilizado estos componentes para ti.
- **/public:** Contiene todos los activos estáticos para tu aplicación, como imágenes.
- **/scripts:** Contiene un script de siembra que usarás para poblar tu base de datos en un capítulo posterior.
- **Config Files:** También notarás archivos de configuración como next.config.js en la raíz de tu aplicación. La mayoría de estos archivos se crean y se preconfiguran al iniciar un nuevo proyecto con create-next-app. No será necesario modifcar

# Cargando los estilos a Next.js
Si comenzamos el proyecto con teilwin ya tenemos la configuracion de los estilos casi echa pero como podemos cargar estilos globales esto se hace de la misma manera como lo hacemos en react o en js tradicional

```js
import "./ui/global.js"

// o

import '@/app/ui/global.css';

```
> [!code] Codigo para importar los estilos globales

# CSS modules
En el ejemplo pasado vimos como importar los estilos globales pero en Next.js podemos usar css modules que lo que nos permite es importar estilos de una manera diferente usando selectores como objetos y creando un hash unico por detras 

"Los módulos CSS te permiten asignar CSS a un componente mediante la creación automática de nombres de clase únicos, por lo que no tienes que preocuparte también por las colisiones de estilos."-Next.js

1. Primero tenemos que crear un archivo con el nombre que le queremos dar seguido de **.module.css**
2. Luego en nuestro componente importamos el archivo con cualquier nombre
```jsx
import sty from "./ui/home.module.css"
```
> [!code] Importar el modulo de css
3. Una vez con nuestros archivo importado y con nuestros estilos en el archivo podemos usarlos de la siguiente manera 
```css
.shape{  
    height: 0;  
    width: 0;  
    border-left: 50px solid transparent;  
    border-right: 50px solid transparent;  
    border-bottom: 50px solid black;  
}
```
> [!code] Archivo de los css modules
```jsx
import sty from "./ui/home.module.css"


<div className={sty.shape}></div>
```
> [!code]- Forma de usar los modulos de css
> En css modules en vez de poner un className solo usamos el archivo de css que importamos y un selector como si un objeto fuera

# Importar y cargar fuentes
Cuando tenemos un poryecto de react es un problema importar y cargar las fuentes pero Next.js nos da una solucion mas facil

1. Primero tenemos que importar la fuente con una herramienta que tray por defecto Next que nos permite importar cualquier fuente desde **google fonts**
```ts
import {Inter} from "next/font/google"  
  
export const inter = Inter({subsets: ["latin"], weight: "400"})
```
> [!code]- Importando la fuente Inter desde google fonts
> Primero en el import le indicamos la funte que queremos luego exportamos la fuente con su configuracion como el weight y los caracteres

2. Usando la fuente en nuestro proyecto una vez tenemos importada la fuente y exportada lo que vamos ha hacer es usarla para esto vamos usar el metodo de Tailwind 
```jsx
import"./ui/global.css"  
import {inter} from "@/app/ui/fonts";  
export default function RootLayout({  
  children,  
}: {  
  children: React.ReactNode;  
}) {  
  return (  
    <html lang="en">  
      <body className={`${inter.className} antialiased`}>{children}</body>  
    </html>  
  );  
}
```
> [!code] Usando la fuente en nuestro componente

Podemos tener mas de dos fuentes y usarla de la misma manera
<FONT color="red">Nota: Lo que next es descargar la fuente desde google fonts y luego optimizarla y guardarla en el archivo public</FONT>

# Añadiendo imagenes
Para añadir imagenes en React podemos hacaerlos de la manera comun de HTML pero esto esta muy mal optimizado y lo tendriamos que optimizar manual mente.

Pero Next.js nos da un componente llamado **Image** que lo que hace automaticamente es lo siguiente:
- Evitar automáticamente cambios en el diseño cuando las imágenes se están cargando.
- Redimensionar imágenes para evitar enviar imágenes grandes a dispositivos con un viewport más pequeño.
- Cargar imágenes de forma diferida por defecto (las imágenes se cargan a medida que ingresan al viewport).
- Servir imágenes en formatos modernos, como WebP y AVIF, cuando el navegador lo admite.

```jsx
<Image  
    src={"/hero-desktop.png"}  
    width={1000}  
    height={760}  
    alt={"Screenshots of the dashboard project showing desktop version"}  
>  
</Image>
```
- **src**: Se indica la ruta de la imagen
- **width y height**: Se indica el ancho y alto de la imagen

<FONT color="red">Nota: Esto es solo para imagenes estaticas que solo  se vayan a cargar una vez ya que si no puede ser costoso que se optimize toda las imagenes</FONT>

# Sistema de enrutado por archivos
Esto es de las ventajas mas importantes de Next.js.

**_Next.js utiliza un enrutamiento de sistema de archivos en el que se utilizan carpetas para crear rutas anidadas. Cada carpeta representa un segmento de ruta que se asigna a un segmento de URL._** 

![[folders-to-url-segments.png | 100%]]
> [!imagen] Ejemplo de enrutamiento por archivos

Lo que significa que la primera pagina o **/** la ruta principal es **page.tsx** las demas paginas son los archivos que cremos en la app

Por ejemplo si quremos crear la ruta de dashboard lo que tenemos que hacer es en directorio de app crear una carpeta llamada dashboard luego crear **page.tsx** haciendo eso ya tenemos nuestra nueva ruta
![[dashboard-route.jpg|100%]]
Si queremos crear una subruta por ejemplo **dashboard/customers** lo que tenemos que hacer es repetir lo pasado crear la carpeta customers y luego page.tsx

# Layauts que envuelven secciones especificas
Los layauts en Next.js son las partes que van a estar fijas en diferentes paginas por ejemplo un footer que no  va a cambiar solo vasta de agregarlo en el **archivo layout estos layauts se mostraran en toda nuestra aplicacion**.

Pero que pasa si queremos un layaut solo para secciones en especificas en este caso vamos hacer un layaut solo  para las rutas que se encuentren en dashboard

1. Primero tenemos que crear en nuestra ruta un archivo llamado **layout.tsx** por ejemplo en este caso **dashboard/layout.tsx** luego creamos un componente con la siguiente estructura
```tsx
import React from "react";  
  
export default function layout({children}:{children: React.ReactNode}){  
    return(  
        <section>  
            {children}  
            Esto es el layaut de dashbord  
        </section>  
    )  
}
```
> [!code] Ejemplo de estructura de layout

# Navegacion 
Una vez tenemos las rutas creadas como podemos movernos entre ellas?Para esto tenemos un componente llamado **link** que lo que nos permite es movernos entre rutas sin recargar la pagina 
Es similar a la etiqueta a de HTML pero nunca deveriamos usar esta en next.js para movernos entre rutas locles

```tsx
export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```
> [!code] Ejemplo de uso de Link para navegar entre paginas

**_Además, en producción, siempre que aparecen componentes en la ventana del navegador, Next.js predibuja automáticamente el código de la ruta enlazada en segundo plano. Cuando el usuario hace clic en el enlace, el código de la página de destino ya se ha cargado en segundo plano, lo que hace que la transición de página sea casi instantánea._**

# Saber la ruta del usuario
Si queremos saber en que ruta esta localizado el usuario Next.js tiene un hook para esto llamado **usePathname** que nos permite saber en que ruta se localiza el usuario

Es importate que siempre al momento de usar usePathname tenemos que usar enzima de todo que es componente del cliente ya que todos los componentes de react y de nextjs son del servidor.
Este componente tiene que ser de el cliente ya que en el servidor no existe el pathnam

```tsx
"use client"

export default function NavLinks() {  
  const pathname = usePathname()  
  
  return (  
    <>  
      {links.map((link) => {  
        const LinkIcon = link.icon;  
        return (  
          <Link  
            key={link.name}  
            href={link.href}  
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3  
             ${pathname === link.href ? "bg-sky-100 text-blue-600" : ""}  
            `}  
          >  
            <LinkIcon className="w-6" />  
            <p className="hidden md:block">{link.name}</p>  
          </Link>  
        );  
      })}  
    </>  
  );  
}
```
> [!code] Ejemplo de codigo con usePathname



# Deployando el proyecto con vercel

Primero vamos a ver como podemos deployar una aplicacion con vercel 

1. Para empezar, vamos a subir tu repositorio a Github si aún no lo has hecho. Esto facilitará la configuración de la base de datos y el despliegue. 
2. Visita vercel.com/signup para crear una cuenta. Elige el plan gratuito "hobby". Selecciona Continuar con GitHub para conectar tus cuentas de GitHub y Vercel.
3. **Conecta y despliega tu proyecto**:A continuación, accederás a esta pantalla en la que podrás seleccionar e importar el repositorio de GitHub que acabas de crear:
![[import-git-repo.jpg|100%]]

Name your project and click **Deploy**.

# Creando una base de datos postgres
Para almacenar datos podemos crear una base de datos postgres con vercel para esto tenemos que tener una cuenta de vercel 

1. tenemos que ir a https://vercel.com/dashboard/stores y crear una base de datos postgres
![[dashboard-store.avif.png|100%]]
2. Despues tenemos que conectar esta base de datos con nuestra aplicacion para esto vamos a usar **.env** que lo que tenemos que hacer es copiar las rutas de la db en el archivo env 

3. Instalamos la dependencia de vercel para postgres llamada `@vercel/postgres` la ventaja de esto es que la dependencia de vercel para postgres ya sabe como conectarse a la base de datos por lo que no necesita saver los secretos

# Haciendo fetching de datos
A diferencia de react que ponemos un useEffect y luego hacemos el fetch esto no se hace en nextjs ya que lo que estariamos haciendo es hacer el fetch en el cliente y no el servidor por lo que perdemos tiempo
Lo que devemos de hacer es **que el componente sea asincrono** y podemos hacer un fetch de manera convencional 
```tsx
export default async function Page(){  
	const data = await fetch("https://localhost:3000")
    console.log(data)  
      
    return <h1>Dashboard</h1>  
}
```
> [!code] Ejemplo de fetch del lado del servidor

Si vemos en el navegador en la consola el console.log no tiene los datos si no que el console.log se esta haciendo en el servidor ya que es hai donde se realiza el fetching 

```tsx
export default async function Page() {  
    const revenue = await fetchRevenue();  
    console.log(revenue)  
  
    return (  
        <main>  
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">  
                <RevenueChart revenue={revenue}  />   
            </div>  
        </main>  
    );  
}
```
> [!code] Ejemplo de uso de fetching de datos

<FONT color="red">Nota: Si no queremos que un fetch saque datos de la cache ya que quremos que solo se muestre datos frescos y actualizados devemos agregar unstable_noStore() a el fetch  Partial Prerendering</FONT>
# Striming de datos

**_¿Qué es el streaming?
El streaming es una técnica de transferencia de datos que permite dividir una ruta en "trozos" más pequeños y transmitirlos progresivamente del servidor al cliente a medida que están listos._**

**_Mediante el streaming, puede evitar que las solicitudes de datos lentas bloqueen toda la página. De este modo, el usuario puede ver partes de la página e interactuar con ellas sin tener que esperar a que se carguen todos los datos para mostrarle la interfaz de usuario_**-Next.js

![[server-rendering-with-streaming.jpg|100%]]

Que es el striming de datos? 
	En el ejemplo anterior lo que hacemos es que hasta que no tenemos todos los datos que necesitamos la pagina no se muestra haciendo que esto demore mucho ya que asta que todos los fetch no se resuelvan no esta lista la pagina.

Lo que podemos hacer con el striming de datos es que podemos **enseñar el esqueleto de la pagina en lo que carga el contenido** para hacer esto tenemos que: 

1. Envolber el componente con un compoente de react llamado **Suspense** 
```jsx
<Suspense fallback={<RevenueChartSkeleton />}>  
    <RevenueChart revenue={revenue}  />  
</Suspense>
```
> [!code] Envolviendo nuestro componente con el componente suspense
> lo que hace suspense es que nos deja mostrar algo mientras el componente hijo termina de cargar en este ejemplo ponemos un esqueleto de el compoente que carga

2. Hacer que el fetch se aga en el componente y no en el componente que almacena el componente envuelto en suspense es decir el fetch se hace en el hijo
```tsx
export default async function RevenueChart() {  
	const revenue = await fetchRevenue();
	return (  
    <div className="w-full md:col-span-4">  
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>  
        Recent Revenue  
      </h2>  
      {/* NOTE: comment in this code when you get to this point in the course */}  
  
      { <div className="rounded-xl bg-gray-50 p-4">  
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">  
          <div  
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"  
            style={{ height: `${chartHeight}px` }}  
          >  
            {yAxisLabels.map((label) => (  
              <p key={label}>{label}</p>  
            ))}  
          </div>  
  
          {revenue.map((month) => (  
            <div key={month.month} className="flex flex-col items-center gap-2">  
              <div  
                className="w-full rounded-md bg-blue-300"  
                style={{  
                  height: `${(chartHeight / topLabel) * month.revenue}px`,  
                }}  
              ></div>  
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">  
                {month.month}  
              </p>  
            </div>  
          ))}  
        </div>  
        <div className="flex items-center pb-2 pt-6">  
          <CalendarIcon className="h-5 w-5 text-gray-500" />  
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>  
        </div>  
      </div> }  
    </div>  
  );  
}
```
> [!code] Hacemos el fetch en el compoenente hijo


<FONT color="red">Nota: tambien podemos poner una pantalla de carga agregando un archivo a la ruta llamado login.tsx esto es agregar el striming a nivel de pagina aqui podemos agregar el esqueleto de la pagina para que se muestre algo antes de cargar la pagina</FONT>

```tsx
// /dashboard/loading.tsx 
import DashboardSkeleton from "@/app/ui/skeletons";  
  
export default function loading(){  
    return <DashboardSkeleton/>  
}
```

### [Fixing the loading skeleton bug with route groups](https://nextjs.org/learn/dashboard-app/streaming#fixing-the-loading-skeleton-bug-with-route-groups)

Right now, your loading skeleton will apply to the invoices and customers pages as well.

Since `loading.tsx` is a level higher than `/invoices/page.tsx` and `/customers/page.tsx` in the file system, it's also applied to those pages.

We can change this with [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups). Create a new folder called `/(overview)` inside the dashboard folder. Then, move your `loading.tsx` and `page.tsx` files inside the folder:

![Folder structure showing how to create a route group using parentheses](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Froute-group.png&w=3840&q=75&dpl=dpl_D95uoRZTiGLz5uvwchndHrGWDiDe)

Now, the `loading.tsx` file will only apply to your dashboard overview page.

Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses `()`, the name won't be included in the URL path. So `/dashboard/(overview)/page.tsx` becomes `/dashboard`.

Here, you're using a route group to ensure `loading.tsx` only applies to your dashboard overview page. However, you can also use route groups to separate your application into sections (e.g. `(marketing)` routes and `(shop)` routes) or by teams for larger applications.


# Estado en la URL para buscar

[Por qué utilizar parámetros de búsqueda de URL?](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params): Como se mencionó anteriormente, utilizarás parámetros de búsqueda en la URL para gestionar el estado de búsqueda. Este patrón puede ser nuevo si estás acostumbrado a hacerlo con el estado del lado del cliente.

Hay un par de beneficios al implementar la búsqueda con parámetros de URL:

- **URLs marcables y compartibles**: Dado que los parámetros de búsqueda están en la URL, los usuarios pueden marcar el estado actual de la aplicación, incluyendo sus consultas de búsqueda y filtros, para referencia futura o para compartir.
- **Renderizado del lado del servidor y carga inicial**: Los parámetros de URL pueden ser consumidos directamente en el servidor para renderizar el estado inicial, facilitando el manejo de la renderización en el servidor.
- **Análisis y seguimiento**: Tener las consultas de búsqueda y los filtros directamente en la URL facilita el seguimiento del comportamiento del usuario sin requerir lógica adicional del lado del cliente.

**Es decir en vez de tener un estado de la busqueda usamos la informacion que se encuentra en la url asi podemos compartir la pagina con la busqueda deseada**

---
**Pasos de Implementación:**
1. **Capturar la entrada del usuario:** Obtén la entrada del usuario, ya sea a través de un formulario, un cuadro de búsqueda u otro método.

2. **Actualizar la URL con los parámetros de búsqueda:** Utiliza los parámetros de búsqueda capturados para actualizar la URL. Esto permite que el estado de búsqueda sea reflejado en la propia URL del navegador.

3. **Mantener sincronizada la URL con el campo de entrada:** Asegúrate de que cualquier cambio en la URL se refleje en el campo de entrada correspondiente. Esto permite a los usuarios ver y compartir fácilmente el estado actual de la búsqueda.

4. **Actualizar la tabla para reflejar la consulta de búsqueda:** Utiliza los parámetros de búsqueda capturados para filtrar y actualizar la tabla de resultados. Esto garantiza que la tabla refleje la consulta de búsqueda actualizada.

--- 
1. **Capturando el input del usuario**: Para capturar el input del usuario podemos usar una funcion la cual le pasaremos al atributo onChange del input
```tsx
export default function Search({ placeholder }: { placeholder: string }) {  
    const handleSearch = (term: string) => {  
        console.log(term)  
    }  
  
  return (  
      <input  
          onChange={event => handleSearch(event.target.value)}  
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm    outline-2 placeholder:text-gray-500"  
        placeholder={placeholder}  
      />  
    </div>  
  );  
}
```
> [!code]- Capturando el input del usuario
> Si vemos en la consola del navegador tenemos lo que ponemos en el input

2. **Actualizar la URL con los parámetros de búsqueda**: Una vez tenemos capturada el input del usuario tenemos que actualizar la URL con los parámetros de búsqueda por ejemplo si el usuario pone hola en el input de search la url deve de ser la siguiente **dashboard/invoices&query=hola**

Primero con el hook useSearchParams podemos leer los parametros de la URL 
- **useSearchParams**: Le permite acceder a los parámetros de la URL actual. Por ejemplo, los parámetros de búsqueda de esta URL /dashboard/invoices?page=1&query=pending serían los siguientes **{page: '1', query: 'pendiente'}.**

```tsx
export default function Search({ placeholder }: { placeholder: string }) {  
    const searchParams = useSearchParams()  
    console.log(searchParams.get("query"))  
  
  return (  
      <input  
          onChange={event => handleSearch(event.target.value)}  
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"  
        placeholder={placeholder}  
      />  
  );  
}
```
> [!code]- Ejemplo de usar useSearchParams
> El output deve de ser los valores de query

Una vez que savemos como leer la URL ahora vamos a crear la cadena de busqueda 

**Dentro de handleSearch, crea una nueva instancia de URLSearchParams utilizando tu nueva variable searchParams.**
```tsx
export default function Search() {
  const searchParams = useSearchParams();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
  }
  // ...
}
```
> [!code] Creando una url con lso 

**URLSearchParams es una API Web que proporciona métodos de utilidad para manipular los parámetros de consulta de la URL. En lugar de crear una cadena literal compleja, puede utilizarla para obtener la cadena params como ?page=1&query=a.**

**A continuación, establezca la cadena params basándose en la entrada del usuario. Si la entrada está vacía, quieres borrarla:**
```tsx
export default function Search() {
  const searchParams = useSearchParams();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
  }
  // ...
}
```
> [!code]- Ponemos la query si el usuario ingresa algo en el input si no borramos la query

Una vez tenemos creada la cadena de busqueda podemos agregarla a la URL 

**Ahora que tienes la cadena de consulta. Puedes usar los hooks useRouter y usePathname de Next.js para actualizar la URL.**
**Importa useRouter y usePathname de 'next/navigation', y usa el método replace de useRouter() dentro de handleSearch:**

```tsx 
export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
}
```
> [!code] Remplasamos la URL con el pathname y los params
> Lo que nos da de resultado los siguiente "/dashboard/invoices?query=hola+mundo"

<FONT color="red">Nota: Recuerda que este es un componente de lado de el cliente por lo que devemos de agregar 'use client' al principio</FONT>

# Sincronizando la URL con el input
Ahora imagina que te mandan el siguiente link **dashboard/invoices?query=Gordonchis** en el input de busqueda el input deveria de ser Gordonchis pero esto no es asi ya que le devemos de dar un valor al input este valor deve de ser el mimo que el de la URL

Esto lo podemos hacer con el atributo **defaultValue** y pasando el valor de la query
```tsx
<input  
    onChange={event => handleSearch(event.target.value)}  
  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2   placeholder:text-gray-500"  
  placeholder={placeholder}  
    defaultValue={searchParams.get("query")?.toString()}  
/>
```
> [!code] Recuperamos los paramateros en especifico la query y lo ponemos como valor por defecto

# Actualizando los datos 
Imagina que en el URL de la query tenemos hola mundo pero quiero acceder a el desde la pagina osea cada que el usuario cambie algo en el input quiero actualizar la pagina.
Esto es muy sencillo ya que **La page recive un objeto llamado searchParams que nos da las query de la URL**
```tsx
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
```
> [!code] Recivimos los searchParams gracias a el objeto que le llega a page desde las props

# Haciendo un debounce
**_El debounce es una práctica de programación que limita la velocidad a la que puede dispararse una función. En nuestro caso, sólo se desea consultar la base de datos cuando el usuario ha dejado de escribir._**


Que es un debounce?Imagina que cada que el uauario cambie el input en un search se aga una peticion a la base de datos esto no es optimo ya que si el usuario escribe una palabra larga mandara una peticion a la base da datos por cada letra.
La forma de arreglar esto es usando el debounce o rebote que lo que hace es esperarse un determinado tiempo a ver si el usuario va segir realisando la accion si no es asi se manda la peticion a labase de datos o servidor

**Funcionamiento del "Debouncing":**

1. **Desencadenar el Evento:** Ocurre un evento que se desea "debouncear", como una pulsación de tecla en el cuadro de búsqueda.

2. **Espera:** Se inicia un temporizador en respuesta al evento. Si se produce un nuevo evento antes de que el temporizador expire, el temporizador se reinicia.

3. **Ejecución:** Si el temporizador llega al final de su cuenta regresiva sin que ocurra otro evento, la función "debounceada" se ejecuta. Este enfoque evita ejecuciones innecesarias y optimiza el rendimiento al manejar eventos que ocurren en ráfagas.

Puedes implementar el debouncing de varias maneras, incluyendo la creación manual de tu propia función debounce. Para simplificar las cosas, utilizaremos una biblioteca llamada use-debounce.:

1. Primero tenemos que instalar la dependencia llamada **use-debounce** 
2. Implementar el hook de **useDebounceCallback** en el lugar donde capturamos el input
```tsx
const handleSearch = useDebouncedCallback((term: string) => {  
    console.log(`Searching... ${term}`);  
  
    const params = new URLSearchParams(searchParams)  
    if(term){  
        params.set('query', term)  
    }else{  
        params.delete('query')  
    }  
  
    replace(`${pathname}?${params.toString()}`)  
},300)
```
> [!code]- Usando el sueDebounced para el input donde se hace la peticioin
>Lo que le estamos diciendo es quiero que cada que el usuario cambie el input se espere 300ms para ver si va a  seguir escribiendo o no si este deja de escribir por 300ms manda la peticion

Al eliminar el rebote, puede reducir el número de peticiones enviadas a su base de datos, con el consiguiente ahorro de recursos.

# Recuperando los parametros de la URL desde un componente del lado del cliente

Ya vimos como recuperar los parametros de la URL desde la pagina que es un componente de lado del servidor una forma de recuperar los params del lado del cliente es usando los hooks de react 
```tsx
const searchParams = useSearchParams()  
const pathname = usePathname()
```
> [!code] Recuperando los parametros desde un componente del lado del cliente

# Server actions
- Que son?
	**_Las acciones de servidor de React permiten ejecutar código asíncrono directamente en el servidor. Eliminan la necesidad de crear puntos finales de API para mutar los datos. En su lugar, se escriben funciones asíncronas que se ejecutan en el servidor y se pueden invocar desde los componentes de cliente o servidor._**
	
	**_La seguridad es una prioridad para las aplicaciones web, ya que pueden ser vulnerables a diversas amenazas. Aquí es donde entran en juego las Acciones Servidor. Ofrecen una solución de seguridad efectiva, protegiendo contra diferentes tipos de ataques, asegurando sus datos y garantizando el acceso autorizado. Las Acciones de Servidor logran esto a través de técnicas como peticiones POST, cierres encriptados, estrictas comprobaciones de entrada, hash de mensajes de error y restricciones de host, todo ello trabajando conjuntamente para mejorar significativamente la seguridad de tu aplicación._**

En pocas palabras lo que podemos hacer es mutar o manejar los datos de el servidor desde un server component 

## creando un server action
Para empezar a crear un server action lo mas optimo seria en el directorio lib tener un archivo llamado **actions.js** en donde devemos de poner todas las acciones para mutar datos 

1. Primero le temos que indicar a nuestro archivo **actions,js** que todas las funciones que se exporten son del servidor de la siguiente manera:
```js
"use server"
```
> [!code] Esto indica que todas las funciones de este archivo son funciones del servidor

2. Escribir la funcion una vez ya le indicamos al archivo que las funciones son del servidor ya podemos escribir funciones de servidor 
```js
export async function createInvoice (formData: FormData){  
    console.log("create invoice", formData)   
}
```
> [!code] Con este codigo ya tendriamos los datos de un form en el servidor sin una api

```jsx
export default function Form({ customers }: { customers: CustomerField[] }) {  
  return (  
    <form action={createInvoice}>  
    {//...}
    </form>  
  );  
}
```
> [!code] Usando la funcion de el servidor en nuestro form 

3. Validando los datos como estos datos que nos llegan del formulario van directo a la base de datos tenemos que validarlos esto lo podemos hacer con **zod** 
```js
import { z } from 'zod';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice (formData: FormData){  
    console.log("create invoice", formData)  
    const {customerId, amount, status} = CreateInvoicesFormSchema.parse({  
        customerId: formData.get('customerId'),  
        amount: formData.get('amount'),  
        status: formData.get('status'),  
    })  
}
```
> [!code] Validando los datos con zod

4. Modificando la base de datos con sql 
```js
export async function createInvoice (formData: FormData){  
    const {customerId, amount, status} = CreateInvoicesFormSchema.parse({  
        customerId: formData.get('customerId'),  
        amount: formData.get('amount'),  
        status: formData.get('status'),  
    })  
  
    const amountInCents = amount * 100  
    const [date] = new Date().toISOString().split("T")  
  
    await sql`  
    INSERT INTO invoices (customer_id, amount, status, date)    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})  
  `;  
}
```
> [!code] Mandando los datos a la base de datos

5. Revalidando la ruta en el ejemplo anterior ya grabamos los datos en la base de datos por lo que tenemos que revalidar una ruta osea hacer que deje de usar la cache y que se actualize 
```js
export async function createInvoice (formData: FormData){  
    const {customerId, amount, status} = CreateInvoicesFormSchema.parse({  
        customerId: formData.get('customerId'),  
        amount: formData.get('amount'),  
        status: formData.get('status'),  
    })  
  
    const amountInCents = amount * 100  
    const [date] = new Date().toISOString().split("T")  
  
    await sql`  
    INSERT INTO invoices (customer_id, amount, status, date)    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})  
  `;    
    revalidatePath("/dashboard/invoices")
}
```