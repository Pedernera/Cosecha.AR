import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import  Button from 'react-bootstrap/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function CardPublicaciones(props) {
    const cardStyle={
        height:'40vh',
        objectFit:'contain',
        
    }

    const style={
        color:'	 #000000',
    }

    const editarClick =(event)=>{
        event.preventDefault();
        props.onEditar(props.id)
    }
    const eliminarClick =(event)=>{
        event.preventDefault();    
        props.onEliminar(props.id)
    }
   const urlImg= `http://localhost:8000/images/${props.imagen}`;
    return (
        <>
        <Col className="text-center" >
            <Link to={`/detail/${props.id}`} className="nav-link" style={style}>
            <Card  className="h-100" >
                <Card.Header as='h5'>{props.nombre}</Card.Header>
                <Card.Img style={cardStyle} variant="top" src={urlImg} />

                <Card.Footer className='text-muted' >${props.precio}</Card.Footer>
            {props.type === 'mispublicaciones' &&(
             <Row>
                <Col className="text-center">
                    <Button variant="light" onClick={editarClick}>
                        <FontAwesomeIcon icon={faEdit}/>    
                    </Button>
                    <Button variant="light" onClick={eliminarClick}>
                        <FontAwesomeIcon icon={faTrash}/>                        
                    </Button>
                </Col>
             </Row>

            )}
            
            </Card>
            </Link>
        </Col>
        </>
    )
}
