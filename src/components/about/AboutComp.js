import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AboutImg from "../../assets/imgs/aboutImg.png";
import PrimaryButton from "../primaryButton/PrimaryButton";
import TitleComp from "../title/TitleComp";
import WavesComps from "../waves/WavesComp";
import "./AboutComp.scss";

const AboutComp = () => {
  return (
    <Container fluid className="about-comp comp-height">
      <Container className="about-comp-container d-flex flex-column justify-content-center align-items-center">
        <Row className="about-comp-content">
          <Col lg={8} md={8} sm={12} className="about-left-side">
            <TitleComp title="Introduction"/>
            <div className="subtitle">
              <p data-aos="fade-left" className="subtitle-text">Our first 1000 Baby Frogs will, once minted, immediately
                hop into Abracadabra Money. Your frog will work hard for 30 days using interest baring assets as
                collateral within Abracadabra to provide you with a return in Magic Internet Money (MIM).
                In Simple terms, hold on to your Frog and you will receive a return for doing so every month.</p>
            </div>
            <div className="about-button">
              <PrimaryButton data-aos="fade-down" buttonName={"LEARN MORE"}/>
            </div>
          </Col>
          <Col lg={4} md={4} sm={12} className="about-right-side d-flex justify-content-center align-items-center">
            <img data-aos="fade-right" src={AboutImg} alt="baby-spell-frog"/>
          </Col>
        </Row>
      </Container>
      <div className="comp-wave">
        <WavesComps/>
      </div>
    </Container>
  );
};

export default AboutComp;
