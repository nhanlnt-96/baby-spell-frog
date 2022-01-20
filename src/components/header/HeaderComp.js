import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { menuData } from '../../configs/menuData';
import './HeaderComp.scss';

const HeaderComp = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="header-comp">
            <Container className="header-comp-container">
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="header-comp-toggle-custom" />
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderComp;