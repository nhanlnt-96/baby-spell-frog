import React from "react";
import {Container, Row} from "react-bootstrap";
import BannerComp from "../banner/BannerComp";

const MainLayout = () => {
  return (
    <Container fluid className="main-layout">
      <Row id="home" style={{backgroundColor: "#FBEDFF"}}>
        <BannerComp/>
      </Row>
    </Container>
  );
};

export default MainLayout;