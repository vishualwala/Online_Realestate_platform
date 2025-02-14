import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../RTK/Slices/PropertyDetailsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import petFriendly from '../../Images/petFiendly.png';
import notfriendly from '../../Images/notfriendly.png';
import SuggestedProperty from './SuggestedProperty';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './card.css'
import Loading from '../Sections/Loading';
import mapImage from '../../Images/map.png'


const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);

  const propertyDetails = useSelector((state) => state.propertyDetails?.data);
  const loading = useSelector((state) => state.propertyDetails.loading);
  const error = useSelector((state) => state.propertyDetails.error);


  // Wishlist Handler
  const wishlistHandler = (flat) => {

    const existingData = JSON.parse(localStorage.getItem('wishList')) || []

    const flatExists = existingData.some((item) => item._id === flat._id)

    if (!flatExists)
      existingData.push(flat)
    localStorage.setItem('wishList', JSON.stringify(existingData))
  }


  // Ref for the slider
  const sliderRef = useRef(null);

  // UseEffect to fetch item details
  useEffect(() => {
    const fetchItemDetails = () => {
      const isExist = localStorage.getItem('wishList');
      if (isExist) {
        const wishList = JSON.parse(isExist);
        const foundItem = wishList.find((item) => item._id === id);
        if (foundItem) {
          setItem(foundItem);
        } else {
          dispatch(fetchData(id));
        }
      } else {
        dispatch(fetchData(id));
      }
    };

    fetchItemDetails();
  }, [id, dispatch]);

  // Update item when propertyDetails changes
  useEffect(() => {
    if (propertyDetails && propertyDetails._id === id) {
      setItem(propertyDetails);
    }
  }, [propertyDetails, id]);





  // Handle loading, error, and no item found states
  if (loading) return <Loading />

  if (error) return <div>Error: {error}</div>;
  if (!item) return <Loading />

  // Function to render nearby places
  const renderNearbyPlaces = (places, category, icon) => (
    <Card className="nearby-place-card" key={category}>

      <Card.Body>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>{icon}</span>
          <strong>{category}</strong>
        </div>
        {Object.entries(places).map(([placeName, distance]) => (
          <div key={placeName} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span>{placeName}</span>
            <span>{distance} km</span>
          </div>
        ))}
      </Card.Body>
    </Card>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      }
    ]
  };





  return (
    <Container className="mt-4">
      <Row>

        {/* Image and location */}
        <Col md={8}>
          <Card>
            <Image src={item.Image} alt="Property Image" fluid />
            <Card.Body>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card.Text>
                  <Card.Title>{item.SOCIETY_NAME}</Card.Title>

                  <i className="fa-solid fa-map-marker-alt"></i> {item.location}, {item.CITY}
                </Card.Text>

                <Button
                  onClick={() => window.location.href = `tel:${item.Contact}`}
                  style={{ height: '40px' }}
                >
                  📞 Contact Seller
                </Button>
              </div>



              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card.Title>RERA Reg. No : {item.RERA_Registration_Number}</Card.Title>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.Pet_Friendly ? (
                    <>
                      <Image
                        src={petFriendly}
                        alt='Pet Friendly'
                        style={{
                          height: '40px',
                          marginRight: '10px',
                          border: '2px solid purple',
                          borderRadius: '30px'
                        }}
                      />
                      <span>Pet Friendly</span>
                    </>
                  ) : (
                    <>
                      <Image
                        src={notfriendly}
                        alt='Not Pet Friendly'
                        style={{
                          height: '40px',
                          marginRight: '10px',
                          border: '2px solid purple',
                          borderRadius: '30px'
                        }}
                      />
                      <span>Not Pet Friendly</span>
                    </>
                  )}
                </div>

              </div>

              {/* Property Description  */}
              <Row>
                <Col >
                  <Card >
                    <Card.Body>
                      <Card.Title>Property Description</Card.Title>
                      <Card.Text>{item.DESCRIPTION}</Card.Text>

                      {/* Wishlist Button  */}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                          onClick={() => wishlistHandler(item)}
                          variant="outline-light"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1.2rem',
                          }}
                        >
                          ❤️ Add to Wish List
                        </Button>

                        <a href={`https://www.google.com/maps?q=${item.LATITUDE},${item.LONGITUDE}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src={mapImage}
                            alt="View on Google Maps"
                            style={{
                              height: '40px',
                              marginRight: '10px',
                              border: '2px solid purple',
                              borderRadius: '30px'
                            }}
                          />
                        </a>
                      </div>

                    </Card.Body>
                  </Card>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>


        {/* Right side Bar */}
        <Col md={4}>
          <Card className="mb-3" style={{ border: '1px solid purple' }}>
            <Card.Body >
              {/* Property Details: */}
              <Card.Title>Property Details :</Card.Title>
              <div>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-solid fa-building-wheat"></i> Property :</Col>
                  <Col xs={6} className="text-end">{item.PROPERTY_TYPE}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-regular fa-compass"></i> Facing :</Col>
                  <Col xs={6} className="text-end">{item.Facing_Direction}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i className="fa-solid fa-bed"></i> Bedrooms :</Col>
                  <Col xs={6} className="text-end">{item.BEDROOM_NUM}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-solid fa-tree"></i> Balcony :</Col>
                  <Col xs={6} className="text-end">{item.BALCONY_NUM}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-solid fa-chart-area"></i> Total Area :</Col>
                  <Col xs={6} className="text-end">{item.AREA} sq. ft.</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-solid fa-tags"></i> Price per sq.ft :</Col>
                  <Col xs={6} className="text-end">{item.Price_per_sqft} sq. ft.</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i className="fa-solid fa-building"></i> Floor :</Col>
                  <Col xs={6} className="text-end">{item.FLOOR_NUM} of {item.TOTAL_FLOOR}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-brands fa-pagelines"></i> Age :</Col>
                  <Col xs={6} className="text-end">{item.AGE}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i className="fa-solid fa-car"></i> Parking Available :</Col>
                  <Col xs={6} className="text-end">{item.Visitor_Parking ? 'Yes' : 'No'}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-solid fa-couch"></i> Furnish :</Col>
                  <Col xs={6} className="text-end">{item.FURNISH}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i class="fa-solid fa-person-digging"></i> Situation :</Col>
                  <Col xs={6} className="text-end">{item.Situation} </Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}><i className="fa-solid fa-money-bills"></i> Price :</Col>
                  <Col xs={6} className="text-end">₹{item.PRICE > 1 ? `${item.PRICE.toFixed(2)} Cr` : `${(item.PRICE * 100).toFixed(2)} Lakh`}</Col>
                </Row>

              </div>



              {/* Amenity Details: */}
              <hr style={{ marginTop: '2px' }} />
              <Card.Title>Amenity Details :</Card.Title>
              <div>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}> Luxury :</Col>
                  <Col xs={6} className="text-end">{item.amenity_luxury}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Swimming Pool :</Col>
                  <Col xs={6} className="text-end">{item.Swimming_Pool ? 'Available' : 'N/A'}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Playground :</Col>
                  <Col xs={6} className="text-end">{item.Playground ? 'Available' : 'N/A'}</Col>
                </Row>



                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}> Visitors Parking :</Col>
                  <Col xs={6} className="text-end">{item.Visitor_Parking ? 'Available' : 'N/A'} </Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Intercom Facility :</Col>
                  <Col xs={6} className="text-end">{item.Intercom_Facility ? 'Available' : 'N/A'} </Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Floor :</Col>
                  <Col xs={6} className="text-end">{item.FLOOR_NUM} of {item.TOTAL_FLOOR}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Power Backup :</Col>
                  <Col xs={6} className="text-end">{item.Power_Backup ? "Available" : 'N/A'}</Col>
                </Row>

                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Fire Safety Installed :</Col>
                  <Col xs={6} className="text-end">{item.Fire_Safety_Installed ? 'Yes' : 'No'}</Col>
                </Row>
              </div>




              {/* Loan Details */}
              <hr style={{ marginTop: '2px' }} />
              <Card.Title>Loan Details:</Card.Title>
              <div>
                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>EMI :</Col>
                  <Col xs={6} className="text-end">
                    {item.Estimated_Monthly_EMI ? `₹${item.Estimated_Monthly_EMI}` : 'N/A'}
                  </Col>
                </Row>
                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Maintenance Fees :</Col>
                  <Col xs={6} className="text-end">₹{item.Maintenance_Fees}</Col>
                </Row>
                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Property Tax:</Col>
                  <Col xs={6} className="text-end">₹{item.Property_Tax}</Col>
                </Row>
                <Row className="mb-2" style={{ justifyContent: 'space-between' }}>
                  <Col xs={6}>Stamp Duty & Registration:</Col>
                  <Col xs={6} className="text-end">
                    {item.Stamp_Duty_Registration_Costs}%
                  </Col>
                </Row>
              </div>



            </Card.Body>
          </Card>
        </Col>
      </Row>



      <Row>
        <div style={{ padding: '10px' }}>
          <h4>Neighborhood Perks :</h4>

          {/* Using React Slick Slider */}
          <Slider {...sliderSettings}>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Schools, "Schools", <i className="fa fa-school"></i>)}
            </div>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Colleges, "Colleges", <i className="fa-solid fa-graduation-cap"></i>)}
            </div>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Hospitals, "Hospitals", <i className="fa-regular fa-hospital"></i>)}
            </div>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Markets, "Markets", <i className="fa-solid fa-shop"></i>)}
            </div>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Public_Transport, "Public Transport", <i className="fa-solid fa-bus"></i>)}
            </div>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Restaurants, "Restaurants", <i className="fa-solid fa-utensils"></i>)}
            </div>
            <div style={{ marginRight: '20px' }}>
              {renderNearbyPlaces(item?.Nearest_Railway_Stations, "Railway Stations", <i className="fa-solid fa-train"></i>)}
            </div>
            <div>
              {renderNearbyPlaces(item?.Nearest_Malls, "Malls", <i className="fa-solid fa-cart-shopping"></i>)}
            </div>
          </Slider>
        </div>
      </Row>




      <Row className='mt-5'>
        <SuggestedProperty id={id} />

      </Row>

    </Container>
  )
}

export default Details

