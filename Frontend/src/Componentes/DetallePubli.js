import  React,{useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListComentarios from './ListComentarios'
export default function DetallePubli(props) {

    const {id}= useParams();
    const [publicacion, setPublicacion]= useState(null)
    const [servicio, setServicio]= useState(null)
    const [usuario, setUsuario]= useState(null)
    const [cargar, setCargar]= useState(false)
    const [comentario,setComentario]=useState('');
    useEffect(cargarDetalle, [])

   async function cargarDetalle(){
        const url='http://localhost:8000/publicaciones/' + id;  
        const response = await fetch(url)
        const data = await response.json()
        setPublicacion(data)
        const url2='http://localhost:8000/servicio';  
        const response2 = await fetch(url2)
        const data2 = await response2.json()
        setServicio(data2)
        const url3='http://localhost:8000/prestadores/'+ data.idPrestador;  
        const response3 = await fetch(url3)
        const data3 = await response3.json()
        
        const url4='http://localhost:8000/usuarios/'+ data3.idUsuario;  
        const response4 = await fetch(url4)
        const data4 = await response4.json()
        setUsuario(data4) 
    } 
   
     function cargarNombre(){
          for (let a = 0; a < servicio.length; a++) {
              if (servicio[a].id == publicacion.idServicio) {
                return servicio[a].nombre
              }
        }
    }

    const handleComentarioChange = (event)=>{
        setComentario(event.target.value)
     }

    const handleGuardarComentario = async ()=>{
        const name=props.user.name
        const url = 'http://localhost:8000/comentario/'+ id
        const params ={
            comentario,
            name,
        }
        const response= await fetch(url,{
            method:'POST',
            body: JSON.stringify(params),
            headers: {'Content-Type':'application/json'},
            credentials:'include',
          }); 
        const data = await response.json();  
        setComentario('')
        setCargar(true)
    } 
    return(
        <Container className={'my-2'} fluid>
                {publicacion && servicio && usuario &&(
                 <>    
                <Row className={'px-0'}>
                    <Col className={'mx-0'}>
                        <Image src={`http://localhost:8000/images/${publicacion.img}`}/>
                    </Col> 
                    <Col className={'mx-0'}>
                        <h4>{cargarNombre()}</h4> 
                        <h6>Vendedor: {usuario[0].nombre +" "+ usuario[0].apellido}</h6>
                        <h6>Precio: ${publicacion.precio}</h6>
                        <br/>
                        <Button type="submit">Contratar Servicio</Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col> 
                        <h4>Detalle: </h4>
                        <h6>{publicacion.detalle}</h6>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Group>
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control   as="textarea" 
                                        rows={2} 
                                        value={comentario}
                                        onChange={handleComentarioChange}/>
                        <Button className='m-2' onClick={handleGuardarComentario}>Realizar Comentario</Button>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <ListComentarios id={id} cargar={cargar} setCargar={setCargar}/>
                    </Col>
                </Row>
                </> 
                )}
        </Container>
    )
}

