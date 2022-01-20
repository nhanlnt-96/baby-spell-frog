import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TitleComp from "../title/TitleComp";

import './RoadmapComp.scss';

const RoadmapComp = () => {
  return (
    <Container fluid className="roadmap-comp comp-height">
      <Container className="roadmap-comp-container">
        <TitleComp title={"ROADMAP"} />
        <Row className="roadmap-comp-content">
          <Col className="roadmap-comp-content-item">
          dfgjhsdkjghkjfd
          </Col>
          <Col className="roadmap-comp-content-item">
dfgjhsdkjghkjfd
          </Col>
          <Col className="roadmap-comp-content-item">
dfgjhsdkjghkjfd
          </Col>
          <Col className="roadmap-comp-content-item">
dfgjhsdkjghkjfd
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default RoadmapComp;