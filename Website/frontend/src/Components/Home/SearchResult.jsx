import React from 'react';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const SearchResult = () => {
  // Get the search result data from Redux store
  const { data } = useSelector((state) => state.searchResult || { data: { result: [] } });


// Wishlist Handler
const wishlistHandler = (flat) => {
    
  const existingData = JSON.parse(localStorage.getItem('wishList')) || []

  const flatExists = existingData.some((item) => item._id === flat._id)
  
  if (!flatExists) 
  existingData.push(flat)
  localStorage.setItem('wishList', JSON.stringify(existingData))
}


  return (
    <Container>
      <Row className="justify-content-center mt-2">
        <Col md={9}>
          {(!data || !Array.isArray(data.result) || data.result.length === 0) ? (
            null
          ) : (
            <div style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: '20px' }}>Search Result for {data.result[0].location} :</h4>
              <Row>
                {data.result.map((flat) => (
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
                        {/* Property Image */}
                        <Col md={4}>
                          <Card.Img
                            src={flat.Image}
                            alt="Property Image"
                            style={{
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '10px 0 0 10px',
                            }}
                          />
                        </Col>

                        {/* Property Details */}
                        <Col md={8}>
                          <Card.Body style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                {/* Society and Location */}
                                <Card.Title style={{ marginBottom: '5px' }}>
                                  {flat.SOCIETY_NAME}, {flat.CITY}
                                </Card.Title>
                                <Card.Subtitle style={{ marginBottom: '10px', color: '#aaa' }}>
                                  {flat.BEDROOM_NUM} BHK {flat.PROPERTY_TYPE} in {flat.location}
                                </Card.Subtitle>
                              </div>
                              <Button
                                variant="outline-light"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  fontSize: '1.2rem',
                                }}
                                onClick={()=> wishlistHandler(flat)}
                              >
                                ❤️
                              </Button>
                            </div>

                            {/* Price and Property Details */}
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
                              {/* Action Buttons */}
                              
                              <Link
                                  to={`/flats/${flat._id}`}
                                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                  View Details <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </Link>
                              <Button onClick={() => window.location.href = `tel:${flat.Contact}`}>
                                <i className="fa-solid fa-phone" style={{  color: ' #00FF00', fontSize: '1.2rem', padding: '5px' }}></i>
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
  );
};

export default SearchResult;
