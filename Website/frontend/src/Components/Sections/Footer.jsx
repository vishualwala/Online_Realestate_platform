import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css' 

const Footer = () => {
  const currentYear = new Date().getFullYear() 

  return (
    <footer style={{ backgroundColor: '#0e1117', color: '#fff', padding: '20px 0', marginTop:'20px'}}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={12}>
            <p> &copy; {currentYear} @Flat AI. All rights reserved.</p>
          </Col>
        </Row>

        <Row className="justify-content-center text-center">
          <Col md={12}>
            <a href="https://www.linkedin.com/in/dipanjan-pathak/" className="text-white mx-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/dipanjanpathak" className="text-white mx-2">
              <i className="fab fa-github"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
