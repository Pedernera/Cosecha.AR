import React,{useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
export default function ModalActualizarFoto(props) {
    let urlImg='http://localhost:8000/images/'
    const [previewImgPub,setPreviewImgPub]=useState(urlImg + props.usuario.img)
    const [imgPub,setImgPub]=useState(null)

    const handleImgPub =(event)=>{
        setImgPub(event.target.files[0])
        setPreviewImgPub(URL.createObjectURL(event.target.files[0]))
    }

    const handleSave=()=>{
        const formData = new FormData();
        formData.append('nombre',props.usuario.nombre)
        formData.append('apellido',props.usuario.apellido)
        formData.append('email',props.usuario.email)
        formData.append('password',props.usuario.password)
        formData.append('imgPub',imgPub)
        
        let url='http://localhost:8000/usuarios/'+props.usuario.id;
        fetch(url,{
            method:'PUT',
            body:formData,
            credentials:'include',
        })
            .then((response)=> response.json())
            .then((data)=>{
                console.log(data)
            })
            props.handleCerrarModal()
    } 
    return (
        <Modal show={props.show} onHide={props.handleCerrarModal}>
        <Modal.Header closeButton>Actualizar Foto</Modal.Header>
        <Modal.Body>
            <Form.Group className="d-flex justify-content-center">
                {previewImgPub && (
                <Image style={{height:'40vh', width:'40vh'}} src={previewImgPub} roundedCircle/>
                )}
            </Form.Group>

            <Form.Group>
                <Form.Control type="file" onChange={handleImgPub}/>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.handleCerrarModal} >Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
    </Modal>
    )
}
