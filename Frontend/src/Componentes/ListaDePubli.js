import React ,{useEffect,useState} from 'react'
import CardPublicaciones from './CardPublicaciones'
import NavBarMisPublicaciones from './NavBarMisPublicaciones'
import Row from 'react-bootstrap/Row'
import EditarPublicaciones from './EditarPublicaciones'
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container'
export default function ListaDePubli(props) {
    const [publicaciones,setPublicaciones]= useState([]);
    const [publicaciones2,setPublicaciones2]= useState([]);
    const [selectedPub, setSelectedPub]= useState(null);
    const [editPub,setEditPub]= useState(false)
    useEffect(getPubs,[props.type]);

    
    async function getPubs(){
      if(props.type==="publicaciones"){
        const url='http://localhost:8000/publicaciones';
      
        const response = await fetch(url,{credentials:'include'});
        const data = await response.json();
        setPublicaciones(data)
        
      }else if(props.type === "mispublicaciones"){
        const url='http://localhost:8000/publicaciones/userpubs/'+ props.id;
        const response = await fetch(url,{credentials:'include'});
        const data = await response.json();
        setPublicaciones(data)
      }
      const url2='http://localhost:8000/servicio';
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        setPublicaciones2(data2)
    }

    function getNombre(i){
        for (let a = 0; a < publicaciones2.length; a++) {
              if (publicaciones2[a].id === i) {
                return publicaciones2[a].nombre
              }
        }
        
    }
    
    function getCards(){
     
    const cards = publicaciones.map( (publicacion)=>{
      
      return(
        <CardPublicaciones  
              precio={publicacion.precio} 
              imagen={publicacion.img}
              id={publicacion.id}
              nombre={getNombre(publicacion.idServicio)}
              type={props.type}
              onEditar = {handleEditar}
              onEliminar = {handleEliminar}
          />
      )
      
    })
    return cards;
  }
    const handleEditPub =()=>{
      setSelectedPub(null)
      setEditPub(true)
    }
    const closeEditPub =()=>{
      setEditPub(false)
    }
    const pubSaved = (message)=>{
      getPubs();
      closeEditPub();

      Swal.fire({
        text: message,
        icon: 'success',
      })
    }

   const handleEditar = (pubId) => {
      setSelectedPub(pubId)
      setEditPub(true)
   }

   const handleEliminar = async (pubId)=>{
   const confirm=await Swal.fire({
       title: `Eliminar Publicacion`,
       icon:'question',
       showCancelButton:true,
       confirmButtonText:'Eliminar',
       cancelButtonText:'Cancelar',
     })

     if(confirm.value){

    const url=`http://localhost:8000/publicaciones/${pubId}`

    const response= await fetch(url, {
          method:'DELETE',
          credentials: 'include',
        })

    const data = await response.json()
    if(data.status==='ok'){
      getPubs();
      Swal.fire({title:data.message,icon:'success'})
    }else{
      Swal.fire({title:data.message,icon:'error'})
      
    }
  
  }
}

 
    return (
      <>
        <Container  fluid>
        {props.type === "mispublicaciones" &&( 
        <NavBarMisPublicaciones onNewPubClick={handleEditPub}/>)}
        <Row className='mx-0 my-1 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 '>
          {getCards()}
        </Row>
        <EditarPublicaciones 
        show={editPub} 
        handleHide={closeEditPub} 
        idPrestador={props.id}
        onPubSaved={pubSaved}
        pubId = {selectedPub}
        />
        </Container>
      </>
    )
 }
