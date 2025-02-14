import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { locationSuggestions } from '../../others/Keywords';
import HistoryTable from './HistoryTable';
import Recommendation from './Recommendation';



import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';


const locationOptions = locationSuggestions;

const Predict = () => {
    // Predicted Result
    const [data, setData] = useState(null);

    const fetchData = async (sessionId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DJANGO_API_URL}fetchdata/?session_id=${sessionId}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);


    // State for location and suggestions
    const [location, setLocation] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Handle location input changes
    const handleChange = (e) => {
        const value = e.target.value;
        setLocation(value);

        if (value.length > 0) {
            const filtered = locationOptions.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    // Bedroom state and handler
    const [bedroom, setBedroom] = useState('');
    const selectBedroom = (e) => setBedroom(e.target.value);

    // Balcony state and handler
    const [balcony, setBalcony] = useState('');
    const selectBalcony = (e) => setBalcony(e.target.value);

    // Area state and handler
    const [area, setArea] = useState('');
    const selectArea = (e) => setArea(e.target.value);

    // Age state and handler
    const [age, setAge] = useState('');
    const selectAge = (e) => setAge(e.target.value);

    // Furnish state and handler
    const [furnish, setFurnish] = useState('');
    const selectFurnish = (e) => setFurnish(e.target.value);

    // Amenity state and handler
    const [amenity, setAmenity] = useState('');
    const selectAmenity = (e) => setAmenity(e.target.value);

    // Floor state and handler
    const [floor, setFloor] = useState('');
    const selectFloor = (e) => setFloor(e.target.value);


    // History data
    const [history, setHistory] = useState([]);

    const [FormData, setFormData] = useState({})

    // Form handler to submit data to backend
    const formHandler = async (e) => {
        e.preventDefault();

        const formData = { location, bedroom, balcony, area, age, furnish, amenity, floor };


        try {
            const response = await axios.post(`${process.env.REACT_APP_DJANGO_API_URL}submit/`, formData);
            const result = response.data;
            console.log(formData);
            console.log(result);

            setFormData({ ...formData, PRICE: result.prediction })
            console.log(FormData);


            fetchData(result.session_id);
            // Add to history
            const updatedHistory = [
                { query: formData, prediction: result.prediction },
                ...history
            ];
            setHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    // History delete
    const handleDelete = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    };

    const [predictedData, setPredictedData] = useState()
    // Recommendation function 
    const getSuggestion = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_DJANGO_API_URL}recommend/Prediction-recommendations/`, FormData);
            const result = response.data;
            // console.log(result)
            setPredictedData(result)


        } catch (error) {
            console.error(error)
        }
    }
    // Recommendation useEffect 
    useEffect(() => {
        getSuggestion();

    }, [FormData]);

    return (
        <>

            <Container>
                <Row className=" mb-4">
                    <h1 className="text-center mt-4" style={{ fontWeight: 600 }} >Welcome Back Chief!</h1>
                    <p className="text-center mb-4">
                        (<span style={{ color: 'red' }}> <strong>MERN Stack, Django</strong> </span> based kolkata flat price prediction app. Fill the form to get approximate price range)
                    </p>
                </Row>

                <Row>
                    <Col md={6}>
                        <Card
                            style={{
                                border: '2px solid purple',
                                borderRadius: '20px',
                                padding: '10px',
                                // margin: '20px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                            }}
                            className="shadow-lg"
                        >
                            <Card.Body className="p-4 justify-content-center">
                                <h2 className="text-center mb-4" style={{
                                    fontWeight: '800',
                                    background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent'
                                }}>
                                    <strong>Query Form</strong>
                                </h2>



                                <form onSubmit={formHandler}>
                                    <Row className="justify-content-center">
                                        <Col className="mb-3">

                                            <Row>
                                                <Col md={5}>
                                                    {/* Location Field */}
                                                    <label className="mb-2">Select Location:</label>
                                                    <input
                                                        className="form-control mb-3"
                                                        type="text"
                                                        value={location}
                                                        onChange={handleChange}
                                                        placeholder="Type Location..."
                                                        required
                                                        style={{
                                                            backgroundColor: '#f0f0f0',
                                                            border: '2px solid #833ab4',
                                                            borderRadius: '8px',
                                                            padding: '8px',
                                                            fontSize: '16px',
                                                            color: '#333',
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                            transition: 'border-color 0.3s ease',
                                                        }}
                                                    />

                                                    {showSuggestions && location && (
                                                        <ListGroup className="mb-3">
                                                            {filteredSuggestions.map((suggestion, index) => (
                                                                <ListGroup.Item
                                                                    key={index}
                                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                                    action
                                                                >
                                                                    {suggestion}
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    )}
                                                </Col>

                                                <Col md={7}>
                                                    {/* Bedroom Field */}
                                                    <label className="mb-2">Select Bedroom Number:</label>
                                                    <div className="mb-3">
                                                        <Form.Check inline label="1" type="radio" name="bedroom" value="1" onChange={selectBedroom} checked={bedroom === '1'} required />
                                                        <Form.Check inline label="2" type="radio" name="bedroom" value="2" onChange={selectBedroom} checked={bedroom === '2'} required />
                                                        <Form.Check inline label="3" type="radio" name="bedroom" value="3" onChange={selectBedroom} checked={bedroom === '3'} required />
                                                        <Form.Check inline label="4" type="radio" name="bedroom" value="4" onChange={selectBedroom} checked={bedroom === '4'} required />
                                                        <Form.Check inline label="5" type="radio" name="bedroom" value="5" onChange={selectBedroom} checked={bedroom === '5'} required />
                                                        <Form.Check inline label="6" type="radio" name="bedroom" value="6" onChange={selectBedroom} checked={bedroom === '6'} required />
                                                    </div>
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col md={6}>

                                                    {/* Area Field */}
                                                    <label className="mb-2">Select Built-up Area (Sq.ft.):</label>
                                                    <input
                                                        className="form-control mb-3"
                                                        type="number"
                                                        value={area}
                                                        onChange={selectArea}
                                                        placeholder="Enter Buildup Area..."
                                                        required
                                                        style={{
                                                            backgroundColor: '#f0f0f0',
                                                            border: '2px solid #833ab4',
                                                            borderRadius: '8px',
                                                            padding: '8px',
                                                            fontSize: '16px',
                                                            color: '#333',
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                            transition: 'border-color 0.3s ease',
                                                        }}
                                                    />

                                                </Col>
                                                <Col md={6}>
                                                    {/* Balcony Field */}
                                                    <label className="mb-2">Select Balcony Number:</label>
                                                    <div className="mb-3">
                                                        <Form.Check inline label="0" type="radio" name="balcony" value="0" onChange={selectBalcony} checked={balcony === '0'} required />
                                                        <Form.Check inline label="1" type="radio" name="balcony" value="1" onChange={selectBalcony} checked={balcony === '1'} required />
                                                        <Form.Check inline label="2" type="radio" name="balcony" value="2" onChange={selectBalcony} checked={balcony === '2'} required />
                                                        <Form.Check inline label="3" type="radio" name="balcony" value="3" onChange={selectBalcony} checked={balcony === '3'} required />
                                                        <Form.Check inline label="4" type="radio" name="balcony" value="4" onChange={selectBalcony} checked={balcony === '4'} required />
                                                    </div>
                                                </Col>


                                            </Row>





                                            {/* Age Field */}
                                            <label className="mb-2">Select Age Type:</label>
                                            <div className="mb-3">
                                                <Form.Check inline label="New" type="radio" name="age" value="New Property" onChange={selectAge} checked={age === 'New Property'} required />
                                                <Form.Check inline label="Relatively New" type="radio" name="age" value="Relatively New Property" onChange={selectAge} checked={age === 'Relatively New Property'} required />
                                                <Form.Check inline label="Moderately Old" type="radio" name="age" value="Moderately Old" onChange={selectAge} checked={age === 'Moderately Old'} required />
                                                <Form.Check inline label="Old" type="radio" name="age" value="Old Property" onChange={selectAge} checked={age === 'Old Property'} required />
                                            </div>

                                            {/* Furnish Field */}
                                            <label className="mb-2">Select Furnishing Type:</label>
                                            <div className="mb-3">

                                                <Form.Check inline label="Unfurnished" type="radio" name="furnish" value="Unfurnished" onChange={selectFurnish} checked={furnish === 'Unfurnished'} required />

                                                <Form.Check inline label="Semi-Furnished" type="radio" name="furnish" value="Semi-furnished" onChange={selectFurnish} checked={furnish === 'Semi-furnished'} required />


                                                <Form.Check inline label="Luxury" type="radio" name="furnish" value="Luxury furnished" onChange={selectFurnish} checked={furnish === 'Luxury furnished'} required />

                                                <Form.Check inline label="Full" type="radio" name="furnish" value="Fully furnished" onChange={selectFurnish} checked={furnish === 'Fully furnished'} required />

                                            </div>


                                            <Row>
                                                <Col md={6}>
                                                    {/* Amenity Field */}
                                                    <label className="mb-2">Select Amenity Type:</label>
                                                    <div className="mb-3">
                                                        <Form.Check inline label="Low" type="radio" name="amenity" value="Low" onChange={selectAmenity} checked={amenity === 'Low'} required />
                                                        <Form.Check inline label="Medium" type="radio" name="amenity" value="Medium" onChange={selectAmenity} checked={amenity === 'Medium'} required />
                                                        <Form.Check inline label="High" type="radio" name="amenity" value="High" onChange={selectAmenity} checked={amenity === 'High'} required />
                                                    </div>
                                                </Col>

                                                <Col md={6}>
                                                    {/* Floor Field */}
                                                    <label className="mb-2">Select Floor Type:</label>
                                                    <div className="mb-3">
                                                        <Form.Check inline label="Low" type="radio" name="floor" value="Low Floor" onChange={selectFloor} checked={floor === 'Low Floor'} required />
                                                        <Form.Check inline label="Middle" type="radio" name="floor" value="Mid Floor" onChange={selectFloor} checked={floor === 'Mid Floor'} required />
                                                        <Form.Check inline label="High" type="radio" name="floor" value="High Floor" onChange={selectFloor} checked={floor === 'High Floor'} required />
                                                    </div>
                                                </Col>
                                            </Row>


                                            {/* Submit Button */}
                                            <div className="text-center">
                                                <Button type="submit" className='custom-button w-100' >Get Prediction</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>

                            </Card.Body>

                        </Card>
                    </Col>


                    {/* 2nd column */}
                    <Col md={6}>
                        {/* Prediction section */}
                        {data ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                <Card style={{ borderColor: 'purple', borderWidth: '1px', padding: '20px', width: '100%', maxWidth: '600px' }}>
                                    <>
                                        {data.prediction !== null && data.prediction !== undefined ? (
                                            <div>
                                                <p className="text-center mt-4">
                                                    <strong>Approx Price Range</strong>
                                                    <span style={{ margin: '0 10px' }}>:</span>
                                                    <span>
                                                        {(data.prediction) > 1
                                                            ? `${(data.prediction - 0.13).toFixed(2)} to ${(data.prediction + 0.13).toFixed(2)} Cr`
                                                            : data.prediction + 0.13 > 1
                                                                ? `${(data.prediction - 0.13).toFixed(2)} to ${(data.prediction + 0.13).toFixed(2)} Cr`
                                                                : `${((data.prediction - 0.13) * 100).toFixed(2)} to ${((data.prediction + 0.13) * 100).toFixed(2)} Lakh`}
                                                    </span>
                                                </p>

                                                {/* Price/Sq.ft */}
                                                {area && !isNaN(area) && area > 0 ? (
                                                    <p className="text-center">
                                                        <strong>Approx Price/ sq.ft.</strong>
                                                        <span style={{ margin: '0 10px' }}>:</span>
                                                        <span>Rs. {Math.round((data.prediction * 10000000) / area)}/-</span>
                                                    </p>
                                                ) : (
                                                    <p className="text-center text-danger">
                                                        <strong>Fill the Form to Get the Result</strong>
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-center text-danger">
                                                <strong>No prediction available</strong>
                                            </p>
                                        )}
                                    </>
                                </Card>
                            </div>


                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                <h3 className="text-center text-success">
                                    <strong>Fill query form to get prediction!</strong>
                                </h3>
                            </div>

                        )}

                        {/* Suggested flat 
                        {data ? (
                            <Card className='d-flex justify-content-center mt-3' style={{ borderColor: 'purple', borderWidth: '1px' }}>
                                <h3 className='text-center mt-0'><strong>Suggested flats</strong></h3>
                                <hr className="my-0" />


                               
                            </Card>) : null} */}


                    </Col>

                </Row>



            </Container>

            {/* Suggestion based on Prediction  */}
            <div>
                <Recommendation data={predictedData} />
            </div>

            {/* Search History */}
            <div>
                <HistoryTable history={history} onDelete={handleDelete} />
            </div>






        </>
    );
}

export default Predict;
