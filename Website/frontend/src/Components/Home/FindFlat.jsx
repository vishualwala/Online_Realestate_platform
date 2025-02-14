import React, { useState } from 'react'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  DropdownButton,
  ListGroup,
} from 'react-bootstrap'
import { locationSuggestions } from '../../others/Keywords'
import { useDispatch, useSelector } from 'react-redux'
import { searchFlatSlice } from '../../RTK/Slices/SearchSlice'



const FindFlat = () => {
  const locationOptions = locationSuggestions
  const [location, setLocation] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [bedroom, setBedroom] = useState('')
  const [property, setProperty] = useState('')



  const dispatch = useDispatch()

  // const { data} = useSelector((state) => state.searchResult || {})

  // Handle location input changes
  const handleChange = (e) => {
    const value = e.target.value

    setLocation(value)

    if (value.length > 0) {
      const filtered = locationOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion)
    setFilteredSuggestions([])
    setShowSuggestions(false)
  }

  // Handle bedroom selection
  const selectBedroom = (e) => {
    setBedroom(e.target.value)
  }

  // Handle property type selection
  const selectProperty = (e) => {
    setProperty(e.target.value)
  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const clientData = {
      location,
      bedroom,
      property,
    }

    // Dispatch the Redux action with clientData
    dispatch(searchFlatSlice(clientData))

  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={9}>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center mb-3">
              {/* Dropdown for selecting BHK */}
              <Col md={2}>
                <DropdownButton title={`BHK: ${bedroom ? bedroom + ' BHK' : 'Select'}`} variant="success" id="dropdown-basic" className="w-100">
                  <div className="p-3">
                    <label>Select Bedroom Number:</label>
                    <Form.Check
                      inline
                      label="1 BHK"
                      type="radio"
                      name="bedroom"
                      value="1"
                      onChange={selectBedroom}
                      checked={bedroom === '1'}
                    />
                    <Form.Check
                      inline
                      label="2 BHK"
                      type="radio"
                      name="bedroom"
                      value="2"
                      onChange={selectBedroom}
                      checked={bedroom === '2'}
                    />
                    <Form.Check
                      inline
                      label="3 BHK"
                      type="radio"
                      name="bedroom"
                      value="3"
                      onChange={selectBedroom}
                      checked={bedroom === '3'}
                    />
                    <Form.Check
                      inline
                      label="4 BHK"
                      type="radio"
                      name="bedroom"
                      value="4"
                      onChange={selectBedroom}
                      checked={bedroom === '4'}
                    />
                    <Form.Check
                      inline
                      label="5 BHK"
                      type="radio"
                      name="bedroom"
                      value="5"
                      onChange={selectBedroom}
                      checked={bedroom === '5'}
                    />
                    <Form.Check
                      inline
                      label="6 BHK"
                      type="radio"
                      name="bedroom"
                      value="6"
                      onChange={selectBedroom}
                      checked={bedroom === '6'}
                    />
                  </div>
                </DropdownButton>
              </Col>

              {/* Dropdown for selecting property type */}
              <Col md={3}>
                <DropdownButton title={`Looking For: ${property || 'Select'}`} variant="success" id="dropdown-basic" className="w-100">
                  <div className="p-3">
                    <label>Select Property Type:</label>
                    <Form.Check
                      inline
                      label="Flat/Apartment"
                      type="radio"
                      name="property"
                      value="Flat/Apartment"
                      onChange={selectProperty}
                      checked={property === 'Flat/Apartment'}
                    />
                    <Form.Check
                      inline
                      label="Farm House"
                      type="radio"
                      name="property"
                      value="Farm House"
                      onChange={selectProperty}
                      checked={property === 'Farm House'}
                    />
                    <Form.Check
                      inline
                      label="House/Villa"
                      type="radio"
                      name="property"
                      value="House/Villa"
                      onChange={selectProperty}
                      checked={property === 'House/Villa'}
                    />
                    <Form.Check
                      inline
                      label="Residential Land"
                      type="radio"
                      name="property"
                      value="Residential Land"
                      onChange={selectProperty}
                      checked={property === 'Residential Land'}
                    />
                  </div>
                </DropdownButton>
              </Col>
            </Row>

            {/* Input Field for location */}
            <Row className="mb-3">
              <Col md={10}>
                <input
                  className="form-control"
                  type="text"
                  value={location}
                  onChange={handleChange}
                  placeholder="Type Location to Search properties..."
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

              {/* Search Button */}
              <Col md={2}>
                <Button type="submit" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
            <p style={{ color: 'red' }}>(Note: Only Flat data is available)</p>

          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default FindFlat
