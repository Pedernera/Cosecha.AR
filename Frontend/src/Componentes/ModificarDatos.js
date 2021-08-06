import  React,{useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import './ModificarDatos.css';
export default function ModificarDatos(props) {
    const [usuario, setUsuario]= useState(null)
    const [dato,setDato]=useState('')
    const [repetirDato,setRepetirDato]=useState('')
    const [valido,setValidar]=useState(true)
    useEffect(cargarDetalle, [])
    async function cargarDetalle(){
        const url='http://localhost:8000/usuarios/'+ props.user.id
        const response = await fetch(url)
        const data = await response.json()
        setUsuario(data[0])
    }

    const handleDato =(event)=>{
        setDato(event.target.value)
    }
    const style={
      color:'red'
    }
    const handleRepetirDato =(event)=>{
        setRepetirDato(event.target.value)
    }

    const guardar=()=>{
      const formData = new FormData();
      for (const propiedad in usuario) {
         if (propiedad != props.dato) {
            formData.append(propiedad,usuario[propiedad])
         }else{
           formData.append(propiedad,dato)
         }
      }
      let url='http://localhost:8000/usuarios/'+ usuario.id;
        fetch(url,{
            method:'PUT',
            body:formData,
            credentials:'include',
        })
            .then((response)=> response.json())
            .then((data)=>{})
        alert(`${props.dato} Modificado Correctamente`)
        setRepetirDato('')
        setDato('')
    }
    const handleSave=()=>{
      
      if(props.validar){
        if(dato === repetirDato){
            setValidar(true)
            guardar()
        }else{
            setValidar(false)
        }
      }else{
        guardar()
      }
    } 
   
    return (
        <>     
          <Container className={'flex-container'} fluid>
            <Form className={'form'}>
            <div><h5>Modificar {props.dato}</h5></div>
              <div>
                <Form.Control type={props.type} 
                              placeholder={`Ingrese nuevo ${props.dato}`} 
                              className={'form-imput'} 
                              value={dato}
                              onChange={handleDato}/>
              </div>
              {props.validar&& (
              <div>
                <Form.Control type={props.type} 
                              placeholder={`Repite el ${props.dato}`} 
                              className={'form-imput'}
                              value={repetirDato}
                              onChange={handleRepetirDato}/>
                {valido ||(
                <Form.Text style={style}>
                  Los datos no coinciden
                </Form.Text>)}
              </div>
              )}
              <div>
              <Button className='mt-1 mx-4' variant="primary" size="sm" onClick={handleSave}>Guardar</Button>
              <Link to='/micuenta'><Button className='mt-1 mx-4' variant="secondary" size="sm">Volver</Button></Link>
              </div>
            </Form>
          </Container>
        </> 
    )
}
