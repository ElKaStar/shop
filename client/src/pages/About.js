import * as React from "react";
import NavBar from "../components/NavBar";
import { Row, Col, Figure, Container, Image } from "react-bootstrap";

export default function About() {
  return (
    <div>
      <Container style={{ paddingTop: "10px" }}>
        <Row>
          <Col md={4}>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="https://th.bing.com/th/id/R768738362305e591e220e5b65c813894?rik=Kp4Mb2t9b9fPDg&pid=ImgRaw"
              />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={8}>
            <h1>Наша команда</h1>
            <div
              style={{ paddingTop: "10px" }}
              className="d-flex align-items-right"
            >
              <p>
                To be good, descriptive writing has to be concrete, evocative
                and plausible.
                <ul>
                  <li>
                    <p>
                      To be concrete, descriptive writing has to offer specifics
                      the reader can envision. Rather than “Her eyes were the
                      color of blue rocks” (Light blue? Dark blue? Marble?
                      Slate?), try instead, “Her eyes sparkled like sapphires in
                      the dark.”
                    </p>
                  </li>
                  <li>
                    <p>
                      To be concrete, descriptive writing has to offer specifics
                      the reader can envision. Rather than “Her eyes were the
                      color of blue rocks” (Light blue? Dark blue? Marble?
                      Slate?), try instead, “Her eyes sparkled like sapphires in
                      the dark.”
                    </p>
                  </li>
                  <li>
                    <p>
                      To be concrete, descriptive writing has to offer specifics
                      the reader can envision. Rather than “Her eyes were the
                      color of blue rocks” (Light blue? Dark blue? Marble?
                      Slate?), try instead, “Her eyes sparkled like sapphires in
                      the dark.”
                    </p>
                  </li>
                </ul>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Image
            src="https://www.livewritethrive.com/wp-content/uploads/2016/08/group-of-people.jpg"
            fluid
          />
        </Row>
      </Container>
    </div>
  );
}
