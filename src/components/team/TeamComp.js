import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TitleComp from "../title/TitleComp";
import TeamMember from "../../assets/imgs/teamMember.jpeg";
import {FaDiscord, FaFacebookF, FaTelegram} from "react-icons/all";

import "./TeamComp.scss";

const TeamComp = () => {
  return (
    <Container fluid className="team-comp">
      <Container className="team-comp-container">
        <TitleComp title={"TEAM"}/>
        <Row className="team-comp-content justify-content-center align-items-center">
          {
            [...new Array(3)].map(() => (
              <Col data-aos="zoom-in" lg={4} md={6} sm={12}
                   className="team-box d-flex justify-content-center align-items-center">
                <div className="team-box-container">
                  <div className="team-ava">
                    <img src={TeamMember} alt="frogs-team"/>
                  </div>
                  <div className="team-name">
                    <p className="name">Lorem.</p>
                  </div>
                  <div className="team-about">
                    <p className="about">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, sed.</p>
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