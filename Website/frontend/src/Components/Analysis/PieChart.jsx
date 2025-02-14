import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from './FetchData';
import Loading from '../../Components/Sections/Loading';
import { Container, Row, Col } from 'react-bootstrap';
import LocationInput from './LocationInput';

const PieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [xAxis, setXAxis] = useState('BEDROOM_NUM'); 
  const [locationInput, setLocationInput] = useState('');
  const [noMatches, setNoMatches] = useState(false); 

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

  const availableXOptions = ['BEDROOM_NUM', 'AGE', 'FURNISH', 'TOTAL_FLOOR', 'CITY', 'Facing_Direction', 'amenity_luxury'];

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

  const matchesLocationInput = (location) => {
    if (!locationInput) return true; 
    const normalizedInput = locationInput.toLowerCase();
    return location.toLowerCase().includes(normalizedInput);
  };

  const groupedData = data.reduce((acc, property) => {
    if (matchesLocationInput(property.location)) {
      const groupKey = property[xAxis] || 'Unknown';

      if (!acc[groupKey]) {
        acc[groupKey] = 0;
      }
      acc[groupKey] += 1;
    }
    return acc;
  }, {});

  const totalCount = Object.values(groupedData).reduce((sum, value) => sum + value, 0);
  const pieData = [{
    labels: Object.keys(groupedData),
    values: Object.values(groupedData).map(count => (totalCount ? (count / totalCount) * 100 : 0)), 
    type: 'pie',
    marker: {
      colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF1', '#F1FF33', '#FF8C33', '#33FFD1', '#D133FF', '#FF5733'],
    },
    hoverinfo: 'label+percent',
    textinfo: 'label+percent', 
    textposition: 'outside',
    automargin: true,
  }];

  // Handle no matches case
  useEffect(() => {
    if (Object.keys(groupedData).length === 0) {
      setNoMatches(true);
    } else {
      setNoMatches(false);
    }
  }, [groupedData]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={12} className="justify-content-center">
          <h3 style={{ color: '#00ff00' }}>Pie Chart:</h3>

          <div className='mt-3'>
            <h4>Select Category :</h4>
            {availableXOptions.map(option => (
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

          <Row className="mt-5">
            <Col md={3} className="d-flex flex-column justify-content-center">
              <LocationInput
                locationInput={locationInput}
                setLocationInput={setLocationInput}
              />
            </Col>

            <Col md={9}>
              {noMatches ? (
                <Row className="justify-content-center align-items-center h-100">
                  <Col className="text-center">
                    <h2 style={{ color: 'red' }}>
                      No matching location found. Please check your input.
                    </h2>
                  </Col>
                </Row>
              ) : (
                <div style={{ width: '100%', height: '500px' }} className='mt-5'>
                  <Plot
                    data={pieData}
                    layout={{
                      title: {
                        text: `Pie Chart: Distribution of ${categoryLabels[xAxis]}`,
                        font: {
                          color: 'white',
                        },
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
                      showlegend: true,
                    }}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChart;
