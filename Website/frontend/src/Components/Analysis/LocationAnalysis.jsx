

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from './FetchData';
import LocationInput from './LocationInput'; 
import { Container, Row, Col, Form } from 'react-bootstrap';

const LocationAnalysis = () => {
  const [mapData, setMapData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Price (Crores)');
  const categoryOptions = [
    'Area (sqft)',
    'Price (Crores)',
    'BHK',
    'Price/Sqft',
  ];

  const categoryLabels = {
    'Area (sqft)': 'Area (sqft)',
    'Price (Crores)': 'Price (Crores)',
    'BHK': 'BHK',
    'Price/Sqft': 'Price/Sqft',
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setMapData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (locationInput) {
      const filtered = mapData.filter(item =>
        item.location.toLowerCase().includes(locationInput.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(mapData); 
    }
  }, [locationInput, mapData]);

  const getColor = (item) => {
    switch (selectedCategory) {
      case 'Area (sqft)':
        return item.AREA;
      case 'Price (Crores)':
        return item.PRICE;
      case 'BHK':
        return item.BEDROOM_NUM;
      case 'Price/Sqft':
        return item.Price_per_sqft;
      default:
        return 0;
    }
  };

  return (
    <Container className='mt-5'>
      <h3  style={{ color: '#00ff00' }}>Map Box:</h3>
      <Row className="mt-2">
        <Col md={3} className=" d-flex flex-column justify-content-center">
          <h4>Select Category:</h4>
          <Form>
            {categoryOptions.map(option => (
              <Form.Check 
                key={option}
                type="radio"
                label={categoryLabels[option] || option}
                value={option}
                checked={selectedCategory === option}
                onChange={() => setSelectedCategory(option)}
                className="mb-2"
              />
            ))}
          </Form>
          <LocationInput locationInput={locationInput} setLocationInput={setLocationInput} />
        </Col>
        <Col md={9} className="p-0">
          <div style={{ width: '100%', height: '100vh' }}>
            <Plot
              data={[{
                type: 'scattermap',
                lat: filteredData.map(item => item.LATITUDE),
                lon: filteredData.map(item => item.LONGITUDE),
                mode: 'markers',
                marker: {
                  size: 10,
                  color: filteredData.map(item => getColor(item)),
                  colorscale: 'Viridis',
                  colorbar: {
                    title: {
                      text: categoryLabels[selectedCategory],
                      font: { color: '#ffffff' },
                    },
                  },
                },
                text: filteredData.map(item => `${item.location}, Price: ₹${item.PRICE} Cr`),
              }]}
              layout={{
                autosize: true,
                map: {
                  style: 'open-street-map',
                  zoom: 10,
                  center: { lat: 22.5726, lon: 88.3639 }, 
                },
                title: {
                  text: 'Property Analysis in Kolkata',
                  font: { color: '#ffffff' },
                },
                font: { color: '#ffffff' },
                paper_bgcolor: '#0e1117',
                plot_bgcolor: '#0e1117',
              }}
              style={{ width: '100%', height: '100vh' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LocationAnalysis;



