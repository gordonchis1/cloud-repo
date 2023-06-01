import { Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { NoteDitail } from './components/NoteDitail'
import Notes from './components/Notes'
import useNotes from './Hooks/useNotes'
import ContainerMaterial from '@material-ui/core/Container'

const Home = () => <><h1>Home page</h1></>

const Users = () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const App = () => {
  const { notes } = useNotes()

  return (
    <BrowserRouter>
      <ContainerMaterial>
        <Navbar collapseOnSelect expand='lg' fixed='top' bg='light'>
          <Container>
            <Navbar.Brand style={{ color: 'black' }}>DEV</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Link to='/' style={inlineStyles} className='nav-link'>Home</Link>
                <Link to='/Notes' style={inlineStyles} className='nav-link'>Notes</Link>
                <Link to='/User' style={inlineStyles} className='nav-link'>Users</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Note/:id' element={<NoteDitail notes={notes} />} />
          <Route path='/Notes' element={<Notes />} />
          <Route path='/User' element={<Users />} />
        </Routes>
      </ContainerMaterial>
    </BrowserRouter>
  )
}

export default App
