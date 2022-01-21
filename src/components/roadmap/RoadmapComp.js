import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TitleComp from "../title/TitleComp";

import "./RoadmapComp.scss";
import {roadmapData} from "../../configs/roadmapData";

const RoadmapComp = () => {
  return (
    <Container fluid className="roadmap-comp comp-height">
      <Container className="roadmap-comp-container">
        <TitleComp title={"ROADMAP"}/>
        <Row className="roadmap-comp-content justify-content-center align-items-center">
          {/*<div className="roadmap-comp-content-container">*/}
          {
            roadmapData.map((val, index) => (
              <Col lg={4} md={4} sm={12} data-aos="fade-up" index={index} className="roadmap-comp-content-item">
                <div className="content-box">
                  <div className="content-container">
                    <div className="title-container d-flex justify-content-center align-items-center">
                      <h6 className="title">{val.title}</h6>
                    </div>
                    <div className="subtitle-container">
                      <p className="content">{val.content}</p>
                    </div>
                  </div>
                  <div className="roadmap-number d-flex justify-content-center align-items-center">
                    <p className="number">{val.phase}</p>
                  </div>
                </div>
              </Col>
            ))
          }
          {/*</div>*/}
        </Row>
      </Container>
    </Container>
  );
};

export default RoadmapComp;