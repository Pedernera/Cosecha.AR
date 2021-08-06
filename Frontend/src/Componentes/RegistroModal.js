import  React,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
export default function RegistroModal(props) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [nombre,setNombre]=useState('');
    const [apellido,setApellido]=useState('');
    const [tipoUsuario,setTipoUsuario]=useState([]);
    const [usuario,setUsuario]=useState([]);

    const estiloModal={
        height:'100vh',
        margin:'5px',
        padding:'5px',
      
     }
    const tipoUsuarios =[
        {value:0,name:'Seleccionar Usuario'},
        {value:'prestadores',name:'Prestador de Servicio'},
        {value:'productores',name:'Productor'}
    ]
    useEffect(()=>{
        const url = `http://localhost:8000/usuarios/email/${email}`
        fetch(url)
            .then((response)=>response.json())
            .then((data)=>{
            setUsuario(data)
            })
    },[email])

    const insertUser= async(nombre,apellido,email,password,tipoUsuario)=>{
        
        const url = 'http://localhost:8000/usuarios';
        const params ={
          nombre,
          apellido,
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
          props.handleLogin(email,password,tipoUsuario)
          alert(data.message)
        } else{
          alert(data.message)
        }
    }
    const handleEmailChange =(event)=>{
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }
    
    const handleNombreChange =(event)=>{
      setNombre(event.target.value)
    }
    const handleApellidoChange =(event)=>{
      setApellido(event.target.value)
    }
    
    const handleAceptar=()=>{
        insertUser(nombre,apellido,email,password,tipoUsuario)
        setTipoUsuario(tipoUsuarios[0])
        setApellido('')
        setNombre('')
        setEmail('')
    }
    
    const handleTipoUsuario=(event)=>{
      setTipoUsuario(event.target.value)
    }

  function getTipoUsuarios(){
    return tipoUsuarios.map((usuario)=>(
    <option value={usuario.value}>{usuario.name}</option>
    )) 
}

    return (
      <>
        <Modal style={estiloModal} show={props.show} onHide={props.handleCerrarModal}>
        <Modal.Header closeButton>
        <Modal.Title >Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form> 
                <Row className="mb-3 m-0 p-0">             
                        <Form.Group as={Col} className='my-0'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control   type="text"
                                            value={nombre}
                                            onChange={handleNombreChange}
                        />
                        </Form.Group>
                        <Form.Group as={Col} className='my-0' >
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control   type="text"
                                            values={apellido}
                                            onChange={handleApellidoChange}
                            />
                        </Form.Group>
                        
                </Row> 
                <Row className="mb-3 m-0 p-0">             
                        <Form.Group as={Col} className='my-0'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control   type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                            />  
                        </Form.Group>
                        
                </Row>
                <Row className="mb-3 m-0 p-0">             
                        
                        <Form.Group as={Col} className='my-0'>
                            <Form.Label >Contraseña</Form.Label>
                            <Form.Control   type="password"
                                            values={password}
                                            onChange={handlePasswordChange}
                            />
                        </Form.Group>
                        
                </Row>
                <Row className='mb-3 m-0 p-0'>
                        <Form.Group as={Col} className='my-0'>
                            <Form.Label>Tipo de Usuario</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={tipoUsuario} 
                                onChange={handleTipoUsuario}
                                >{getTipoUsuarios()}
                            </Form.Control>
                        </Form.Group>
                </Row>
                
            </Form>
    </Modal.Body >
        <Modal.Footer className='my-0'>
          <Button variant="secondary" onClick={props.handleCerrarModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleAceptar}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}
      
