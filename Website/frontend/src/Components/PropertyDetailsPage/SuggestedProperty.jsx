import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Sections/Loading';


const SuggestedProperty = ({ id }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedData = JSON.parse(localStorage.getItem('wishList'));
  const localStorageData = storedData ? storedData.find((property) => property._id === id) : null;
  const propertyFromRedux = useSelector((state) => state.propertyDetails.data);
  const PropID = localStorageData ? localStorageData.PROP_ID : propertyFromRedux ? propertyFromRedux.PROP_ID : null;

  useEffect(() => {
    const dataFetch = async () => {
      if (PropID) {
        try {
          // Sending request to django 
          const similarityResponse = await axios.post(`${process.env.REACT_APP_DJANGO_API_URL}recommend/recommendations/${PropID}/`);
          const similarityData = similarityResponse.data;

          // sending request to Node.js 
          const propertyIDs = similarityData.map(item => item.PropertyID);
          const fetchRecommendation = await axios.post(`${process.env.REACT_APP_NODE_API_URL}recommendations/${PropID}/`, propertyIDs);
          const propertyData = fetchRecommendation.data;

          const combinedData = propertyData.map((property) => {
            const matchedSimilarity = similarityData.find((simProp) => simProp.PropertyID === property.PROP_ID);
            return {
              ...property,
              Similarity: matchedSimilarity ? matchedSimilarity.Similarity : null,
            };
          });

          setResult(combinedData);
        } catch (err) {
          console.error('Error fetching recommendations or property details:', err);
          setError('Failed to fetch recommendations or property details.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('No property ID available.');
      }
    };

    dataFetch();
  }, [PropID]);

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
    return <p>{error}</p>;
  }

  return (
    <>
      <h4>Top 10 Similar Property:</h4>
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
        <div>
          
          <Loading />
        </div>
      )}
          
    </>
  );
};

export default SuggestedProperty;
