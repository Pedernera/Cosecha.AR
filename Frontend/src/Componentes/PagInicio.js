import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
export default  function PagInicio(){

   
    const containerStyle={
        height:'85.5vh',
        background:`linear-gradient( #6a85b6 0%, #bac8e0 100%)`, 
    }
    
    return(
         <>
           <Container style={containerStyle} fluid>
                <Row >
                    <Col >
                  
                    </Col>    
                </Row> 
           </Container>  
        </>
     )
}

