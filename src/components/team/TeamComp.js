import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TitleComp from "../title/TitleComp";
import {FaDiscord, FaFacebookF, FaTelegram} from "react-icons/all";

import "./TeamComp.scss";
import {teamData} from "../../configs/teamData";

const TeamComp = () => {
  return (
    <Container fluid className="team-comp">
      <Container className="team-comp-container">
        <TitleComp title={"TEAM"}/>
        <Row className="team-comp-content justify-content-center align-items-center">
          {
            teamData.map((val, index) => (
              <Col key={index} data-aos="zoom-in" lg={6} md={6} sm={12}
                   className="team-box d-flex justify-content-center align-items-center">
                <div className="team-box-container">
                  <div className="team-ava">
                    <div className="team-ava-container">
                      <img src={val.ava} alt="frogs-team"/>
                    </div>
                  </div>
                  <div className="team-name d-flex justify-content-center align-items-center">
                    <p className="name">{val.name}</p>
                  </div>
                  <div className="team-about">
                    <p className="about">{val.about}</p>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
        <Row className="team-social d-flex justify-content-center align-items-center">
          <a href="#"><FaFacebookF/></a>
          <a href="#"><FaTelegram/></a>
          <a href="#"><FaDiscord/></a>
        </Row>
      </Container>
    </Container>
  );
};

export default TeamComp;