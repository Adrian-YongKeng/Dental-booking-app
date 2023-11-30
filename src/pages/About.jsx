import { Col, Image, Row } from "react-bootstrap";
import Header from "../components/Header";

const blueteeth = 'https://firebasestorage.googleapis.com/v0/b/booking-app-b1b60.appspot.com/o/blueteethh.jpg?alt=media&token=f4d262a7-db30-40ad-81e0-597b241a7804';
const teethgif = 'https://firebasestorage.googleapis.com/v0/b/booking-app-b1b60.appspot.com/o/teeth.gif?alt=media&token=055a6cd1-9d49-4fa1-afc6-31de4aaf2752'

export default function About() {
    return (
      <div>
        <Header/>
        <Row>
            <Col>
              <Image src={teethgif} fluid />
            </Col>
            <Col sm={6} className="p-3">
              
              <Image src={blueteeth} style={{ width: '50px', height: '50px' }}/>
            <Col sm={10}>
              <p className="mt-3" style={{fontSize: 50}}>About Us</p>
              <h2 className="my-2" style={{fontSize: 25}}>Our team is dedicated to provide you with the highest standard of quality dental care services that are tailored to meet your needs and comfort. </h2>
              </Col>
            </Col>
          </Row>
      </div>
    )
  }
  
  