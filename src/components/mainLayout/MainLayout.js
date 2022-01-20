import React from "react";
import {Container, Row} from "react-bootstrap";
import BannerComp from "../banner/BannerComp";
import AboutComp from "../about/AboutComp";
import CollectionComp from "../collection/CollectionComp";
import RoadmapComp from "../roadmap/RoadmapComp";
import FAQComp from "../faq/FAQComp";
import RarityComp from "../rarity/RarityComp";

import "./MainLayout.scss";
import TeamComp from "../team/TeamComp";

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
      <Row id="rarity">
        <RarityComp/>
      </Row>
      <Row id="team">
        <TeamComp/>
      </Row>
    </Container>
  );
};

export default MainLayout;