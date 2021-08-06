import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarraNavegacion from './Componentes/BarraNavegacion';
import ListaDePubli from './Componentes/ListaDePubli';
import PagInicio from './Componentes/PagInicio';
import DetallePubli from './Componentes/DetallePubli';
import MiCuenta from './Componentes/MiCuenta';
import ModificarDatos from './Componentes/ModificarDatos';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React,{useState,useEffect} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
function App() {
   const [ user, setUser]= useState(null)
   const [ id, setId]= useState(null)
   useEffect(checkUser,[id]);
   
  function checkUser(){
    
    const url = 'http://localhost:8000/autenticacion/check';
    fetch(url,{
      credentials:'include'
    })
      .then((response)=> response.json())
      .then((data)=>{
        changeUser(data.data)
      })
  }
  const style={
    background:'#e7e4e4'
}
  
  const changeUser =(newUser)=>{
    setUser(newUser)
    if(newUser){
        let url ='http://localhost:8000/prestadores/usuario/'+ newUser.id;
        fetch(url,{
          credentials:'include'
        })
        .then((response)=>response.json())
        .then((data)=>{
          setId(data.id) 
        })
    }
  }
  
  
  return (
    <>
    <Container className='m-0' fluid style={style} > 
        <Row className='p-0'>
            <Col className='p-0'>
                <BrowserRouter>
                    <BarraNavegacion user={user} id={id} changeUser={changeUser} setId={setId}/>
                    <Switch>
                        {user?(
                          <>
                            <Route exact path="/" >
                                <ListaDePubli type="publicaciones"/>
                            </Route>
                            <Route path="/detail/:id" children={<DetallePubli user={user}/>}/>
                            <Route path="/mispublicaciones">
                                <ListaDePubli type="mispublicaciones" id={id}/>
                            </Route>
                            <Route path='/micuenta'>
                                <MiCuenta user={user}/>
                            </Route> 
                            <Route path='/modificarNombre'>
                                <ModificarDatos type='text' dato='nombre' user={user} validar={false}/>
                            </Route>
                            <Route path='/modificarApellido'>
                                <ModificarDatos type='text' dato='apellido' user={user} validar={false}/>
                            </Route>
                            <Route path='/modificarEmail'>
                                <ModificarDatos type='email' dato='email' user={user} validar={true}/>
                            </Route>
                            <Route path='/modificarTelefono'>
                                <ModificarDatos type='tel' dato='telefono' user={user} validar={false}/>
                            </Route>
                          </>  
                        ):(
                            <Route exact path="/" children={<PagInicio/>}/>
                        )}
                         
                    </Switch>
                </BrowserRouter>
            </Col>
        </Row>
    </Container>
    </>
  );
}

export default App;
