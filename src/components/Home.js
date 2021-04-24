import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import bgimage from "./images/metacoinz3.jpg";
import { Image } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <Container>
{/*       <Row>
        <Col md={12}>
          <div style={{ height: 10 }} />
        </Col>
      </Row> */}
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          {/* <Image src={bgimage} style={{ height: 300 }} /> */}
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={bgimage} /* style={{ height: 300 }} */ />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div style={{ height: 30 }} />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div style={{ height: 90 }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
