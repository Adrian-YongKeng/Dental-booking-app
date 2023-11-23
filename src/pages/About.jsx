import { Col, Image, Row } from "react-bootstrap";
import Header from "../components/Header";


export default function About() {
    return (
      <div>
        <Header/>
        <Row>
            <Col>
              <Image src="./src/assets/teeth.gif" fluid />
            </Col>
            <Col sm={6} className="p-3">
              
              <Image src="./src/assets/blueteethh.jpg" style={{ width: '50px', height: '50px' }}/>
            <Col sm={10}>
              <p className="mt-3" style={{fontSize: 50}}>About Us</p>
              <h2 className="my-2" style={{fontSize: 25}}>Our team is dedicated to provide you with the highest standard of quality dental care services that are tailored to meet your needs and comfort. </h2>
              </Col>
            </Col>
          </Row>
      </div>
    )
  }
  
  