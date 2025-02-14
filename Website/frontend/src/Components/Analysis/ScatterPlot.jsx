import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from './FetchData';
import Loading from '../../Components/Sections/Loading';
import { Container, Row, Col } from 'react-bootstrap';
import LocationInput from './LocationInput';

const ScatterPlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [xAxis, setXAxis] = useState('AREA');
  const [yAxis, setYAxis] = useState('PRICE');
  const [colorParameter, setColorParameter] = useState('BEDROOM_NUM');

  const [locationInput, setLocationInput] = useState('');

  const categoryLabels = {
    BEDROOM_NUM: 'BHK',
    AREA: 'Area (sqft)',
    PRICE: 'Price (Crores)',
    Price_per_sqft: 'Price/ Sqft',
    AGE: 'Age of Property',
    FURNISH: 'Furnishing',
    FLOOR_NUM: 'Floor Number',
    TOTAL_FLOOR: 'Total Floors',
    CITY: 'City',
    location: 'Location',
    Facing_Direction: 'Facing Direction',
    amenity_luxury: 'Luxury Category',
  };

  const availableOptions = ['AREA', 'PRICE', 'BEDROOM_NUM', 'Price_per_sqft', 'AGE', 'FURNISH', 'FLOOR_NUM', 'CITY', 'Facing_Direction', 'amenity_luxury'];
  const colorOptions = ['None', ...availableOptions];

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  // Single pass to group data
  const groupedData = data.reduce((acc, property) => {
    const groupKey = colorParameter === 'None' ? 'All' : (property[colorParameter] || 'Unknown');

    if (!acc[groupKey]) {
      acc[groupKey] = { x: [], y: [], text: [] };
    }

    // Filter data based on selected location
    if (!locationInput || property.location.toLowerCase() === locationInput.toLowerCase()) {
      acc[groupKey].x.push(property[xAxis]);
      acc[groupKey].y.push(property[yAxis]);
      acc[groupKey].text.push(`City: ${property.CITY}, Price: ${property.PRICE}`);
    }

    return acc;
  }, {});

  // Prepare data for Plotly
  const plotData = Object.keys(groupedData).map(group => ({
    x: groupedData[group].x,
    y: groupedData[group].y,
    mode: 'markers',
    type: 'scatter',
    name: group,
    marker: {
      size: 5,
    },
    text: groupedData[group].text,
    hovertemplate: `%{text}<extra></extra>`,
  }));

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={12} className="justify-content-center">
          <h3 style={{ color: '#00ff00' }}>Scatter Plot:</h3>

          {/* Render X-axis options */}
          <div className='mt-3'>
            <h4>Select X-axis:</h4>
            {availableOptions.map(option => (
              <label key={option} style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  value={option}
                  checked={xAxis === option}
                  onChange={() => setXAxis(option)}
                />
                {categoryLabels[option] || option}
              </label>
            ))}
          </div>

          {/* Render Y-axis options */}
          <div className='mt-3'>
            <h4>Select Y-axis:</h4>
            {availableOptions.map(option => (
              <label key={option} style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  value={option}
                  checked={yAxis === option}
                  onChange={() => setYAxis(option)}
                />
                {categoryLabels[option] || option}
              </label>
            ))}
          </div>
          <Row className="mt-5">
          <Col md={3} className=" d-flex flex-column justify-content-center">
              {/* 3rd parameter options */}
          <div className='mt-3'>
            <h4>Select Color Parameter :</h4>
            {colorOptions.map(option => (
              <label key={option} style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  value={option}
                  checked={colorParameter === option}
                  onChange={() => setColorParameter(option)}
                />
                {categoryLabels[option] || option}
              </label>
            ))}
          </div>

          {/* Use LocationInput Component */}
          <LocationInput
            locationInput={locationInput}
            setLocationInput={setLocationInput}
          />
            </Col>
            <Col md = {9}>
            {/* Render the Plot */}
          <div style={{ width: '100%', height: '500px' }} className='mt-5'>
            <Plot
              data={plotData}
              layout={{
                title: {
                  text: `Scatter Plot ${categoryLabels[xAxis]} vs ${categoryLabels[yAxis]}`,
                  font: {
                    color: 'white',
                  },
                },
                xaxis: {
                  title: {
                    text: categoryLabels[xAxis],
                    font: {
                      color: 'white',
                    },
                  },
                  color: 'white',
                },
                yaxis: {
                  title: {
                    text: categoryLabels[yAxis],
                    font: {
                      color: 'white',
                    },
                  },
                  color: 'white',
                },
                margin: {
                  l: 60,
                  r: 40,
                  t: 50,
                  b: 60,
                },
                paper_bgcolor: '#0e1117',
                plot_bgcolor: '#0e1117',
                font: {
                  color: 'white',
                },
              }}
              useResizeHandler={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
            </Col>

          </Row>
          

          
        </Col>
      </Row>
    </Container>
  );
};

export default ScatterPlot;



