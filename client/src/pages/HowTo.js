import * as React from "react";
import NavBar from "../components/NavBar";
import { Row, Col, Figure, Container, Image, Carousel } from "react-bootstrap";

export default function HowTo() {
  return (
    <div>
      <Container>
        <Carousel>
          <Carousel.Item interval={100000}>
            <img
              className="d-block w-100"
              src="https://previews.123rf.com/images/dizanna/dizanna1601/dizanna160100060/50441540-instruction-word-cloud-education-concept.jpg"
              alt="First slide"
            />
            <Carousel.Caption
              style={{
                color: "black",
                fontSize: "26px",
                textShadow: "2px 2px yellow"
              }}
            >
              <Row>
                <h3>
                  <b>1 slide label</b>
                </h3>
              </Row>
              <Row>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Row>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={100000}>
            <img
              className="d-block w-100"
              src="https://previews.123rf.com/images/dizanna/dizanna1601/dizanna160100060/50441540-instruction-word-cloud-education-concept.jpg"
              alt="Second slide"
            />
            <Carousel.Caption
              style={{
                color: "black",
                fontSize: "26px",
                textShadow: "2px 2px yellow"
              }}
            >
              <Row>
                <h3>
                  <b>2 slide label</b>
                </h3>
              </Row>
              <Row>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Row>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={100000}>
            <img
              className="d-block w-100"
              src="https://previews.123rf.com/images/dizanna/dizanna1601/dizanna160100060/50441540-instruction-word-cloud-education-concept.jpg"
              alt="Third slide"
            />
            <Carousel.Caption
              style={{
                color: "black",
                fontSize: "26px",
                textShadow: "2px 2px yellow"
              }}
            >
              <Row>
                <h3>
                  <b>3 slide label</b>
                </h3>
              </Row>
              <Row>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Row>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}
