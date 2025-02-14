import React from 'react'
import { Card, Row, Col, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'



const WishList = () => {

  const [data, setData] = useState([])


  // Fetch data from local storage
  const fetchData = () => { 
  const storedData = localStorage.getItem('wishList')
  setData(storedData ? JSON.parse(storedData) : null)
}
  // Deleteing data
  const deleteElement = (id) => {
    const existingData = JSON.parse(localStorage.getItem('wishList')) || []
    const updatedData = existingData.filter((item) => item._id !== id)
    localStorage.setItem('wishList', JSON.stringify(updatedData))
    setData(updatedData)
  }

  // Imidiate updating the frontend 
  useEffect(()=> {
    fetchData()
},[])



  return (
    <>
      <Container>
        <Row className="justify-content-center mt-2">
          <Col md={9}>
            {(!data || !Array.isArray(data) || data.length === 0) ?
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                // padding: '20px' 
              }}>
                <h3>Wish List is empty!</h3>
              </div>

              : (
                <div style={{ padding: '20px' }}>
                  <h4 style={{ marginBottom: '20px' }}>My Wishlists :</h4>
                  <Row>
                    {data.map((flat) => (
                      <Col md={12} key={flat._id} style={{ marginBottom: '20px' }}>
                        <Card
                          style={{
                            backgroundColor: '#222',
                            color: '#fff',
                            borderRadius: '10px',
                            border: '1px solid white',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Row noGutters>
                            <Col md={4}>
                              <Card.Img
                                src={flat.Image}
                                alt={`Image of ${flat.SOCIETY_NAME}, ${flat.CITY}`}
                                style={{
                                  height: '100%',
                                  objectFit: 'cover',
                                  borderRadius: '10px 0 0 10px',
                                }}
                              />
                            </Col>
                            <Col md={8}>
                              <Card.Body style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div>
                                    <Card.Title style={{ marginBottom: '5px' }}>
                                      {flat.SOCIETY_NAME}, {flat.CITY}
                                    </Card.Title>
                                    <Card.Subtitle style={{ marginBottom: '10px', color: '#aaa' }}>
                                      {flat.BEDROOM_NUM} BHK {flat.PROPERTY_TYPE} in {flat.location}
                                    </Card.Subtitle>
                                  </div>



                                  <Button onClick={() => deleteElement(flat._id)}
                                    variant="outline-light"
                                    style={{
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      fontSize: '1.2rem',
                                    }}
                                  >
                                    💔
                                  </Button>


                                </div>
                                <div style={{ marginTop: '15px' }}>
                                  <h5 style={{ fontSize: '1.5rem', color: '#e0e0e0' }}>
                                    ₹{flat.PRICE > 1 ? `${flat.PRICE.toFixed(2)} Cr` : `${(flat.PRICE * 100).toFixed(2)} Lakh`}
                                  </h5>
                                  <span style={{ color: '#aaa' }}>
                                    {flat.AREA} sqft | ₹{flat.Price_per_sqft} / sqft
                                  </span>
                                </div>
                                <p style={{ marginTop: '10px', color: '#bbb' }}>
                                  <span>Age: {flat.AGE}</span>
                                  <br />
                                  <strong>{flat.BEDROOM_NUM} BHK</strong>, {flat.BALCONY_NUM} Balconies | {flat.Situation}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                  <Link
                                    to={`/flats/${flat._id}`}
                                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                  >
                                    View Details <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                  </Link>
                                  <Button onClick={() => window.location.href = `tel:${flat.Contact}`}>
                                    <i className="fa-solid fa-phone" style={{ color: '#00FF00', fontSize: '1.2rem', padding: '5px' }}></i>
                                  </Button>
                                </div>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
          </Col>
        </Row>
      </Container>


    </>
  );
}

export default WishList