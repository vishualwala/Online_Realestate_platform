import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../RTK/Slices/PredictionRecommendationSlice';
import Loading from '../../Components/Sections/Loading';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Recommendation = ({ data }) => {
  const dispatch = useDispatch();
  const { data: result, loading, error } = useSelector((state) => state.predictionSuggestion);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      dispatch(fetchData(data)); 
    }
  }, [data, dispatch]);

    
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
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


  if (loading) {
    (<div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', marginTop: '20px' }}>
        <div>
          <Loading />
        </div>
      </div>
    </div>
    );
  }

  if (error) {
    return <p>Error fetching recommendations: {error}</p>;
  }

  if (!result || result.length === 0) {
    return 
  }

  return (
    <Container className="my-5">
     <>
      <h4>Top 10 similar property based on your latest query :</h4>
      {result.length > 0 ? (
        <Slider {...sliderSettings}>
          {result.map((item, index) => (
            <div key={index}>
              <Card style={{ margin: '10px', width: '300px', border: '1px solid purple' }}>
                <Card.Img
                  variant="top"
                  src={item.Image || 'https://via.placeholder.com/300x200'}
                  alt="Property Image"
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <Card.Body>
                 
                  <Card.Title style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.SOCIETY_NAME}
                  </Card.Title>

                  <Card.Text>
                    <strong>Property Type:</strong> {item.PROPERTY_TYPE || 'N/A'} <br />
                    <strong>Location:</strong> {item.location || 'N/A'} <br />
                    <strong>Bedrooms:</strong> {item.BEDROOM_NUM || 'N/A'} <br />
                    <strong>Area:</strong> {item.AREA ? `${item.AREA} sq ft` : 'N/A'} <br />
                    <strong>Price:</strong> ₹{item.PRICE >= 1 ? `${item.PRICE} Cr` : `${(item.PRICE * 100).toFixed(2)} Lakh`} <br />

                    {/* New Row for Similarity and View Details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <span style={{ marginRight: '10px' }}>
                        <strong>Similarity:</strong> <span style={{ color: '#00ff00' }}>{item.Similarity !== null ? `${item.Similarity} %` : 'Not available'}</span>
                      </span>
                      <Link
                        to={`/flats/${item._id}`}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        View Details <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </Link>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No similar properties found.</p>
      )}
    </>
    </Container>
  );
};

export default Recommendation;
