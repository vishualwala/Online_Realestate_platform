import React from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './building.png'
function NavBar() {
  return (
    <Navbar expand="lg" variant="dark" collapseOnSelect sticky="top" style={{ backgroundColor: '#0e1117' }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="Logo" style={{ height: '30px' }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ alignItems: 'center' }}>
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fa-solid fa-home"></i>&nbsp; Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/predict">
              <Nav.Link>
                <i className="fa-solid fa-cloud"></i>&nbsp; Predict
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/analysis">
              <Nav.Link>
                <i className="fa-solid fa-chart-simple"></i>&nbsp; Analysis
              </Nav.Link>
            </LinkContainer>


            <LinkContainer to="/wishlist">
              <Nav.Link>
              <i class="fa-solid fa-heart"></i>&nbsp; Wishlists
              </Nav.Link>
            </LinkContainer>

            


            <LinkContainer to="/Project_DEtails">
              <Nav.Link>
                <i className="fa-solid fa-clipboard-question"></i>&nbsp; Project Details
              </Nav.Link>
            </LinkContainer>



            <Nav.Link href="https://github.com/dipanjanpathak/MERN_Movie_Recomendation" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>&nbsp; Project Code
            </Nav.Link>

           
          </Nav>

          <Nav>
            <Nav.Link href="https://github.com/dipanjanpathak" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>&nbsp; Github
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/dipanjan-pathak/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
