Que es material UI? **_Material-UI es una biblioteca de componentes de interfaz de usuario (UI) para React que implementa el diseño y los estilos basados en Material Design, un sistema de diseño creado por Google. Proporciona una amplia gama de componentes reutilizables y estilizados que siguen las pautas de Material Design._**
Es como un alternativa a bootstrap con la desventaja que tiene un estilo muy marcado

> Pagina material Ui [Material UI](https://mui.com/material-ui/getting-started/installation/)

# Empezar a usar Material UI 

para empezar a usar material UI tenemos que descargar la libreria de material ui cord 
``npm i @material-ui/core`` 

1. Primero tenemos que importar la fuente
```HTML
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

2. Una vez echo esto ya podemos usar los componentes de material ui una forma de empezar es usando el componente Container

```jsx
import ContainerMaterial from '@material-ui/core/Container'

return <ContainerMaterial>{//Aqui usamos el container}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Note/:id' element={<NoteDitail notes={notes} />} />
          <Route path='/Notes' element={<Notes />} />
          <Route path='/User' element={<Users />} />
        </Routes>
      </ContainerMaterial>
```

# Haciendo tabla con material Ui

```jsx
      <TableContainer>
        <Table>
          <TableBody>
            {notesToShow.map((note, i) =>
              <TableRow key={i}>
                <Note
                  note={note}
                  toggleImportance={() => lcocalToggleImportance(note.id)}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
```

A difernencia de bootstrap cada elemento es un componente aparte y no un sub componente