import Header from "../components/Header";
import { Button, Col, Container, Row } from 'react-bootstrap';

const backgroundImage = './src/assets/bgimage.png'; 

export default function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', 
    width: '100vw' ,
  };

  const textStyle = {
    color: '#ffffff', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px #000000', 
    fontSize: '2rem', 
    paddingTop: '50px', 
  };

  return (
    <>
      <Header/>
      <Container fluid style={backgroundStyle}>
      <Row>
        <Col>
          <div style={textStyle}>
            We Take Your <span style={{ color: '#FFD700' }}>SMILE</span> To <span style={{ fontStyle: 'italic' }}>HEART</span>
          </div>
        </Col>
      </Row>
      <Row style={{ minHeight: '60vh' }}>
  <Col md={10} className="p-3" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginLeft:'28px' }}>
    <h2 style={{ fontSize: 50 }}>Welcome to</h2>
    <h1 style={{ fontSize: 61 }}>Your Trusted Dentist</h1>
    <h2 style={{ fontSize: 32 }}>Modern Dentistry with a Personal Touch</h2>
    <Button 
      href='/login' 
      variant="outline-warning" 
      className="mt-3" style={{width: '250px', fontWeight:'bold'}}>
        Book Your Appointment Now!
      </Button>
  </Col>
</Row>

      </Container>
    </>
  );
}
