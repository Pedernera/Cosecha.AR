import  React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import ModalActualizarFoto from './ModalActualizarFoto'
import Badge from 'react-bootstrap/Badge'
export default function MiCuenta(props) {
    const [usuario, setUsuario]= useState(null)
    const [actualizar,setActualizar]=useState(null)
    useEffect(cargarDetalle, [actualizar])
    let urlImg='http://localhost:8000/images/'
    async function cargarDetalle(){
        const url='http://localhost:8000/usuarios/'+ props.user.id
        const response = await fetch(url)
        const data = await response.json()
        setUsuario(data[0])
    } 
    
    const [show, cambiarEstadoShow]= useState(false)
    const handleAbrirModal = () => {
        cambiarEstadoShow(true)
        setActualizar(true)
    }

    const style={
        color:'#000000',
        background:'#fff'
    }
   
    const handleCerrarModal= () => {
        cambiarEstadoShow(false)
        setActualizar(false)
      } 
    
    return (
            <Container fluid>
                {usuario &&(
                <>
                <Row className='my-3' >
                        <div className={'text-center ml-2'}>
                            <Image style={{height:'40vh', width:'40vh'}} src={`${urlImg + usuario.img}`} roundedCircle  />
                            <br/>
                            <Button onClick={handleAbrirModal} className='mt-1' variant="secondary" size="sm">Actualizar Foto</Button>
                        </div>
                    <Col className={'mx-5 p-0'} >
                        <h5><Badge variant="secondary">Datos de la Cuenta</Badge></h5>
                        <Link to='/modificarEmail' style={style} className="nav-link p-0 m-0">
                            <ListGroup.Item style={style}><h6>Email: {usuario.email}</h6></ListGroup.Item>
                        </Link>
                        <Link to='/modificarPassword' style={style} className="nav-link p-0 m-0">
                            <ListGroup.Item style={style}><h6>Contraseña: *****</h6></ListGroup.Item>
                        </Link>
                        <Link style={style} className="nav-link p-0 m-0">
                            <ListGroup.Item style={style}><h6>Tipo de Usuario: {usuario.tipoUsuario}</h6></ListGroup.Item>
                        </Link>
                        <h5 className={'mt-2'}><Badge variant="secondary">Datos Personales</Badge></h5>
                        <Link to='/modificarNombre'style={style} className="nav-link p-0 m-0" >
                            <ListGroup.Item style={style}><h6>Nombre: {usuario.nombre}</h6></ListGroup.Item>    
                        </Link>

                        <Link to='/modificarApellido' style={style} className="nav-link p-0 m-0">
                            <ListGroup.Item style={style}><h6>Apellido: {usuario.apellido}</h6></ListGroup.Item>
                        </Link>
                        <Link to='/modificarTelefono' style={style} className="nav-link p-0 m-0">
                            <ListGroup.Item style={style}><h6>Telefono: {usuario.telefono}</h6></ListGroup.Item>
                        </Link>
                    </Col>
                </Row>
                <ModalActualizarFoto
                    show={show} 
                    handleCerrarModal={handleCerrarModal}
                    usuario={usuario}
                />
                </>
                )}
            </Container>
    )
}
