import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Braces  () {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Braces</h1>
          <p>
            Braces in Makati Dental clinic or a dentist in Makati that is effective and affordable for invisalign braces, self-ligating braces, and other braces.
          </p>
          <p>
            Dental braces are devices used in orthodontics that align and straighten teeth and help to position them with regard to a person’s bite, while also working to improve dental health. They are often used to correct underbites, as well as malocclusions, overbites, cross bites, open bites, deep bites, crooked teeth, and various other flaws of the teeth and jaw.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="/path-to-image.jpg" />
            <Card.Body>
              <Card.Title>Dr. Donna Harder Ferraren</Card.Title>
              <Card.Text>
                Experienced and skilled dentist specializing in orthodontics and dental braces.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        {/* Additional columns/cards can be added here */}
      </Row>
    </Container>
  );
}


