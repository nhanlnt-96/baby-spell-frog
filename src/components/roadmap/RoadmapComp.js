import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TitleComp from "../title/TitleComp";

import "./RoadmapComp.scss";

const RoadmapComp = () => {
  return (
    <Container fluid className="roadmap-comp comp-height">
      <Container className="roadmap-comp-container">
        <TitleComp title={"ROADMAP"}/>
        <Row className="roadmap-comp-content justify-content-center align-items-center">
          <div className="roadmap-comp-content-container">
            {
              [...new Array(5)].map((val, index) => (
                <Col data-aos="fade-up" index={index} className="roadmap-comp-content-item">
                  <div className="content-box">
                    <div className="content-container">
                      <div className="title-container">
                        <h6 className="title">Lorem.</h6>
                      </div>
                      <div className="subtitle-container">
                        <p className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut
                          dolorum facere fugit sequi voluptatem.</p>
                      </div>
                    </div>
                    <div className="roadmap-number d-flex justify-content-center align-items-center">
                      <p className="number">{`0${(index++) + 1}`}</p>
                    </div>
                  </div>
                </Col>
              ))
            }
          </div>
        </Row>
      </Container>
    </Container>
  );
};

export default RoadmapComp;