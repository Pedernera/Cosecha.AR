import  Button from 'react-bootstrap/Button'
import  Navbar  from 'react-bootstrap/Navbar'
import  Nav     from 'react-bootstrap/Nav'
import  NavDropdown  from 'react-bootstrap/NavDropdown'
import  React,{useState} from 'react'
import LoginModal from './LoginModal'
import RegistroModal from './RegistroModal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
export default function BarraNavegacion(props){
    const [show, cambiarEstadoShow]= useState(false)
    const urlImg= `http://localhost:8000/images/fondo2.jpg`;
    const [type, setType]=useState('')
    const handleAbrirModal1 = () => {
      cambiarEstadoShow(true)
      setType('inicio')
    }
    const handleAbrirModal2 = () => {
      cambiarEstadoShow(true)
      setType('registro')
    }
    const handleCerrarModal= () => {
      cambiarEstadoShow(false)
    } 
    const handleCerrarSesion=async () => {
      const url = 'http://localhost:8000/autenticacion';
      const response=await fetch(url,{method:'DELETE',credentials:'include'}); 
      const data=response.json()
      if(response.status===200){
        props.changeUser(null)
        props.setId(null)
      } else{
        alert(data.message)
      }
    } 
    
    
    const handleLogin = async (email,password,tabla)=>{
      const url = 'http://localhost:8000/autenticacion';
      const params ={
        email,
        password,
      }
      const response= await fetch(url,{
        method:'POST',
        body: JSON.stringify(params),
        headers: {'Content-Type':'application/json'},
        credentials:'include',
      }); 
      const data = await response.json();
      if(response.status===200){
        handleCerrarModal()
        props.changeUser({name: data.data})
        props.setId(data.id)
        if(tabla!=null){
          insertarUsuario(tabla, data.id)
        }
      } else{
        alert(data.message)
      }
    }
    
    const insertarUsuario=async(tabla,id)=>{
      const url = `http://localhost:8000/${tabla}/${id}`;
      console.log(url)
      const response= await fetch(url,{
        method:'POST',
        credentials:'include',
      }); 
      const data = await response.json();
      if(response.status===200){
        alert(data.message)
      } else{
        alert(data.message)
      }
    }
    
    const navbarColor={
       background:`linear-gradient( #6a85b6 0%, #bac8e0 100%)`, 
       height:'auto',
    }

    return ( 
      <>
        <Container style={navbarColor}  fluid >
          <Row className='m-0'>
              <Col className='p-0'>
                  <Navbar expand="lg">
                    <Link to="/"className="nav-link">
                      <Navbar.Brand href="#home">Cosecha.AR</Navbar.Brand>
                    </Link>  
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                          {props.user 
                          ?(
                          <>
                              <Link to="/mispublicaciones" className="nav-link">Mis Servicios</Link>
                              <NavDropdown alignRight title={props.user.name} id="basic-nav-dropdown">
                              <Link to="/micuenta" className='dropdown-item'>Mi cuenta</Link>
                              <NavDropdown.Divider />
                              <Link to="/" onClick={handleCerrarSesion} className='dropdown-item'>Cerrar sesion</Link>
                              </NavDropdown>
                          </>
                          ):(
                          <>
                                  <Button onClick={handleAbrirModal1} className='mx-1'>Iniciar Sesión</Button>
                                  <Button onClick={handleAbrirModal2} className='mx-1'>Crear Cuenta</Button>
                          </>        
                          )}
                        </Nav>
                      </Navbar.Collapse>
                  </Navbar>
                  </Col>
            </Row>  
                  { 
                    type ==='inicio' &&( <LoginModal show={show} 
                    handleCerrarModal={handleCerrarModal}
                    handleLogin={handleLogin}
                    /> 
                  )} 
                  { 
                    type ==='registro' &&( 
                    <RegistroModal
                    show={show} 
                    handleCerrarModal={handleCerrarModal}
                    handleLogin={handleLogin}
                    /> 
                  )} 
        </Container>
      </>
    )
}