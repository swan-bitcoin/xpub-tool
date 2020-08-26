import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, Button } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        {/* <Container> */}
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">Address</Navbar.Brand>
        </Link>
        <Link to="/xpub" className="link-no-style">
          <Navbar.Brand as="span">xPub</Navbar.Brand>
        </Link>
        <Link to="/hww" className="link-no-style">
          <Navbar.Brand as="span">HW Wallets</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button href="https://swanbitcoin.com">Start Stacking</Button>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
