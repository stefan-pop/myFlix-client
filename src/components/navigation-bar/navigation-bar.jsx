import React from 'react';

// react-bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function NavigationBar(props) {

    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">My Flix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="User" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Favorite Movies</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Delete Account</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>            
        </Navbar>
    )
}