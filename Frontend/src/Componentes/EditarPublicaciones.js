import React,{useState,useEffect}  from 'react'
import Modal from 'react-bootstrap/Modal'
import  Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
export default function EditarPublicaciones(props) {
    const [categorias,setCategorias]=useState([])
    const [servicios,setServicios]=useState([])

    const [tituloPub,setTituloPub]=useState('')
    const [precioPub,setPrecioPub]=useState('')
    const [imgPub,setImgPub]=useState('')
    const [previewImgPub,setPreviewImgPub]=useState('')
    const [categoriaPub,setCategoriaPub]=useState('')
    const [servicioPub,setServicioPub]=useState('')
    useEffect(()=>{
        const url = "http://localhost:8000/categorias"
        fetch(url)
            .then((response)=>response.json())
            .then((data)=>{
            setCategorias(data)
            })
    },[])
    useEffect(()=>{
        const url = "http://localhost:8000/servicio"
        fetch(url)
            .then((response)=>response.json())
            .then((data)=>{
            setServicios(data)
            })
    },[])

    function getCategorias(){
        return categorias.map((categoria)=>(
        <option value={categoria.id}>{categoria.nombre}</option>
        )) 
    }

    function getServicios(){
        return servicios.map((servicio)=>(
        <option value={servicio.id}>{servicio.nombre}</option>
        )) 
    }

    const handleTituloPub =(event)=>{
        setTituloPub(event.target.value)
    }

    const handlePrecioPub =(event)=>{
        setPrecioPub(event.target.value)
    }
    const handleImgPub =(event)=>{
        setImgPub(event.target.files[0])
        setPreviewImgPub(URL.createObjectURL(event.target.files[0]))
    }

    const handleCategoriaPub=(event)=>{
        setCategoriaPub(event.target.value)
    }

    const handleServicioPub=(event)=>{
        setServicioPub(event.target.value)
    }

   
    const handleSave=()=>{
        const formData = new FormData();
        formData.append('tituloPub',tituloPub)
        formData.append('idPrestador',props.idPrestador)
        formData.append('precioPub',precioPub)
        formData.append('categoriaPub',categoriaPub)
        formData.append('servicioPub',servicioPub)
        formData.append('imgPub',imgPub)
        
        let url='http://localhost:8000/publicaciones';
        let method= 'POST'
        if(props.pubId){
            method='PUT'
            url += `/${props.pubId}`;
        }

        fetch(url,{
            method:method,
            body:formData,
            credentials:'include',
        })
            .then((response)=> response.json())
            .then((data)=>{
                props.onPubSaved(data.message)
            })
    } 

    useEffect(
        ()=>{
            if( props.pubId){
                const url=`http://localhost:8000/publicaciones/${props.pubId}`
                fetch(url)
                        .then((response)=> response.json())
                        .then((data)=>{
                            setTituloPub('')
                            setPrecioPub(data.precio)
                            setImgPub('')
                            setPreviewImgPub(`http://localhost:8000/images/${data.img}`)
                            setCategoriaPub()
                            setServicioPub(data.id)
                        })
            }else{
                setTituloPub('')
                setPrecioPub('')
                setImgPub('')
                setPreviewImgPub('')
                setCategoriaPub('')
                setServicioPub('')
            }
        },[props.pubId])
    return (
        <Modal show={props.show} onHide={props.handleHide}>
            <Modal.Header closeButton>Publicaciones</Modal.Header>
            <Modal.Body>

                <Form.Group>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={tituloPub}
                    onChange={handleTituloPub}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control 
                    type="text"
                    value={precioPub}
                    onChange={handlePrecioPub}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={categoriaPub} 
                        onChange={handleCategoriaPub}
                    >{getCategorias()}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Servicios</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={servicioPub} 
                        onChange={handleServicioPub}
                        >{getServicios()}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="d-flex justify-content-center">
                    {previewImgPub && (
                    <img style={{height:'25vh'}}src={previewImgPub}/>
                    )}
                </Form.Group>

                <Form.Group>
                    <Form.Label>imagen</Form.Label>
                    <Form.Control type="file" onChange={handleImgPub}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleHide} >Cancelar</Button>
                <Button onClick={handleSave}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}
