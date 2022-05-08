import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

export default function CatalogCards() {
  return (
    <div>
      <Container>
        <hr/>
      <Row className="d-flex justify-content-center align-items-center">
        <div
          style={{
            fontSize: "22px",
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          <h1>Что вы ищете?</h1>
        </div>
      </Row>
      
      <Row className="d-flex justify-content-center align-items-center">
          <p style={{ fontSize: "22px", marginLeft: '15px' }} className="d-flex justify-content-center align-items-center">
            Лаконичность, комфорт и элегантность.
            За нашей одеждой видно личность.
          </p>
      </Row>
        </Container>
      <Container className="d-flex justify-content-center align-items-center">
      <Row className="d-flex" style={{ marginTop: "30px" }}>
        <Col className="d-flex justify-content-center align-items-center mt-2" md={4}>
          <Card className="bg-light text-black">
            <Card.Img src="https://image01.bonprix.nl/assets/460x644/1578340726/19349890-PQyjjZra.jpg" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className="d-flex justify-content-center align-items-center" style={{ marginTop: '300px'}}>Празничные платья</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center align-items-center mt-2" md={4}>
          <Card className="bg-light text-black">
            <Card.Img src="https://image01.bonprix.nl/assets/460x644/1578340726/19349890-PQyjjZra.jpg" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className="d-flex justify-content-center align-items-center" style={{ marginTop: '300px'}}>Casual</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center align-items-center mt-2" md={4}>
          <Card className="bg-light text-black">
            <Card.Img src="https://image01.bonprix.nl/assets/460x644/1578340726/19349890-PQyjjZra.jpg" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className="d-flex justify-content-center align-items-center" style={{ marginTop: '300px'}}>Новые платья</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
        </Container>
    </div>
  );
}
