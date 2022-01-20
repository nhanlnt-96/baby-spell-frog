import React from "react";
import { Container, Row } from "react-bootstrap";
import './TitleComp.scss';

const TitleComp = ({ title }) => {
  return (
    <Container fluid className="title-comp">
      <Row className="title-container">
        <h2 className="title">{title}</h2>
      </Row>
    </Container>
  )
}

export default TitleComp;