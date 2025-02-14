import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from './FetchData';
import Loading from '../../Components/Sections/Loading';
import { Container, Row, Col } from 'react-bootstrap';
import LocationInput from './LocationInput'; // Make sure to import LocationInput

const BoxPlot = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [xAxis, setXAxis] = useState('BEDROOM_NUM'); // Default to BHK
    const [yAxis, setYAxis] = useState('PRICE'); // Default to Price
    const [locationInput, setLocationInput] = useState(''); // Location input state
    const [noMatches, setNoMatches] = useState(false); // New state to track no matches

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

    // Group data for box plot based on the selected X-axis and Y-axis
    const groupedData = data.reduce((acc, property) => {
        if (matchesLocationInput(property.location)) {
            const groupKey = property[xAxis] || 'Unknown';
            const yValue = parseFloat(property[yAxis]);

            if (!acc[groupKey]) acc[groupKey] = [];
            if (!isNaN(yValue)) acc[groupKey].push(yValue);
        }
        return acc;
    }, {});

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

    // Define a custom color palette
    const colorPalette = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF1',
        '#F1FF33', '#FF8C33', '#33FFD1', '#D133FF', '#FF5733',
    ];

    // Prepare the box plot data by grouping the Y values for each X category
    const boxPlotData = Object.keys(groupedData).map((group, index) => ({
        x: Array(groupedData[group].length).fill(group), // X-axis for grouping
        y: groupedData[group], // Y values for the boxplot
        type: 'box',
        name: group, // Label for the group
        boxpoints: 'outliers', // Show only outliers
        marker: {
          color: colorPalette[index % colorPalette.length],
          size: 5,
        },
    }));

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={12} className="justify-content-center">
                    <h3 style={{ color: '#00ff00' }}>Box Plot :</h3>

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
                        <h4>Select Y-axis :</h4>
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
                                        data={boxPlotData}
                                        layout={{
                                            title: {
                                                text: `Box Plot: ${categoryLabels[yAxis]} by ${categoryLabels[xAxis]}`,
                                                font: { color: 'white' },
                                            },
                                            xaxis: {
                                                title: {
                                                    text: categoryLabels[xAxis],
                                                    font: { color: 'white' },
                                                },
                                                color: 'white',
                                            },
                                            yaxis: {
                                                title: {
                                                    text: `Distribution of ${categoryLabels[yAxis]}`,
                                                    font: { color: 'white' },
                                                },
                                                color: 'white',
                                            },
                                            paper_bgcolor: '#0e1117',
                                            plot_bgcolor: '#0e1117',
                                            font: { color: 'white' },
                                            margin: {
                                                l: 50,
                                                r: 50,
                                                t: 50,
                                                b: 50,
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

export default BoxPlot;
