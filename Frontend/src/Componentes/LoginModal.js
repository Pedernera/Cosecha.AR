import  React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import  Form  from 'react-bootstrap/Form'
export default function LoginModal(props) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleEmailChange =(event)=>{
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }
    
    const handleAceptar=()=>{
      props.handleLogin(email,password) 
      setEmail('')
      setPassword('')
    }

    const estiloModal={
      height:'100vh',
      margin:'5px',
      padding:'5px',
   }
    return (
      <>
        <Modal style={estiloModal} show={props.show} onHide={props.handleCerrarModal}>
        <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>              
                <Form>
                  <Form.Group>
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" 
                                  placeholder="example@.com" 
                                  value={email} 
                                  onChange={handleEmailChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" 
                                  value={password} 
                                  onChange={handlePasswordChange}
                    />
                  </Form.Group>
                </Form>
              
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCerrarModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleAceptar}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}