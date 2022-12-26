import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar bg="dark" variant= 'dark' expand="lg">
            <Container>
                <Navbar.Brand xs={6} md={4} href="/">eQue</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                <Nav className="justify-content-end">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact Us</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </div>
  )
}

export default Header