import React from "react";
import {Container, Row} from "react-bootstrap";
import BannerComp from "../banner/BannerComp";
import AboutComp from "../about/AboutComp";
import CollectionComp from "../collection/CollectionComp";
import RoadmapComp from "../roadmap/RoadmapComp";
import "./MainLayout.scss";
import FAQComp from "../faq/FAQComp";

const MainLayout = () => {
  return (
    <Container fluid className="main-layout">
      <Row id="home" style={{backgroundColor: "#FBEDFF"}}>
        <BannerComp/>
      </Row>
      <Row id="about">
        <AboutComp/>
      </Row>
      <Row id="collection">
        <CollectionComp/>
      </Row>
      <Row id="roadmap">
        <RoadmapComp/>
      </Row>
      <Row id="faq">
        <FAQComp/>
      </Row>
    </Container>
  );
};

export default MainLayout;