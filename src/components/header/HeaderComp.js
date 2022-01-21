import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {menuData} from "../../configs/menuData";
import "./HeaderComp.scss";
import {BsMedium, FaDiscord, FaTwitter} from "react-icons/all";

const HeaderComp = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="header-comp">
      <Container className="header-comp-container">
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="header-comp-toggle-custom"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto header-comp-menu justify-content-around">
            {
              menuData.map((val, index) => (
                <div className="header-comp-items">
                  <Nav.Link key={index} href={val.path} className="menu-item">{val.label}</Nav.Link>
                </div>
              ))
            }
          </Nav>
          <Nav className="header-comp-social">
            <a className="item" href="https://discord.gg/QynaGaYB"><FaDiscord/></a>
            <a className="item" href="https://mobile.twitter.com/BabySpellFrogs"><FaTwitter/></a>
            <a className="item" href="https://medium.com/@spellfrogs1"><BsMedium/></a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComp;