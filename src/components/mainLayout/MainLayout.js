import React from "react";
import { Container, Row } from "react-bootstrap";
import BannerComp from "../banner/BannerComp";
import AboutComp from "../about/AboutComp";
import CollectionComp from "../collection/CollectionComp";
import './MainLayout.scss';

const MainLayout = () => {
  return (
    <Container fluid className="main-layout">
      <Row id="home" style={{ backgroundColor: "#FBEDFF" }}>
        <BannerComp />
      </Row>
        <Row id="about">
          <AboutComp />
        </Row>
        <Row id="collection">
          <CollectionComp />
        </Row>
    </Container>
  );
};

export default MainLayout;