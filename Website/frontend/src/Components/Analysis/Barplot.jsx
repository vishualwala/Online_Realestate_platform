import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from './FetchData';
import Loading from '../../Components/Sections/Loading';
import { Container, Row, Col } from 'react-bootstrap';
import LocationInput from './LocationInput';

const BarPlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [xAxis, setXAxis] = useState('BEDROOM_NUM')
  const [yAxis, setYAxis] = useState('PRICE');
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
  const numericalOptions = ['AREA', 'PRICE', 'Price_per_sqft', 'FLOOR_NUM'];

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

  // Flexible matching logic
  const matchesLocationInput = (location) => {
    if (!locationInput) return true; // If input is empty, return all
    const normalizedInput = locationInput.toLowerCase();
    return location.toLowerCase().includes(normalizedInput);
  };

  const groupedData = data.reduce((acc, property) => {
    if (matchesLocationInput(property.location)) {
      const groupKey = property[xAxis] || 'Unknown';

      if (!acc[groupKey]) {
        acc[groupKey] = { total: 0, count: 0 };
      }

      const yValue = parseFloat(property[yAxis]);
      if (!isNaN(yValue)) {
        acc[groupKey].total += yValue;
        acc[groupKey].count += 1;
      }
    }
    return acc;
  }, {});

  const colorPalette = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF1', '#F1FF33', '#FF8C33', '#33FFD1', '#D133FF', '#FF5733',
  ];

  const averagedData = Object.keys(groupedData).map((group, index) => {
    const groupData = groupedData[group];
    const avgValue = groupData.count > 0 ? groupData.total / groupData.count : 0;

    return {
      x: [group],
      y: [avgValue],
      type: 'bar',
      name: group,
      marker: {
        color: colorPalette[index % colorPalette.length], // Assign different colors from the palette
      },
      text: '',
      hoverinfo: 'skip',
      hovertemplate: '',
    };
  });

  // Handle no matches case
  useEffect(() => {
    if (averagedData.length === 0) {
      setNoMatches(true);
    } else {
      setNoMatches(false);
    }
  }, [averagedData]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={12} className="justify-content-center">
          <h3 style={{ color: '#00ff00' }}>Bar Plot :</h3>

          <div className='mt-3'>
            <h4>Select X-axis:</h4>
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

          <div className='mt-3'>
            <h4>Select Y-axis (Numerical only):</h4>
            {numericalOptions.map(option => (
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
                    data={averagedData}
                    layout={{
                      title: {
                        text: `Bar Plot: Average ${categoryLabels[yAxis]} by ${categoryLabels[xAxis]}`,
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
                          text: `Average ${categoryLabels[yAxis]}`,
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
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BarPlot;
