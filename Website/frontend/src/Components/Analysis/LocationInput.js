import React, { useEffect, useState } from 'react';
import { locationSuggestions } from '../../others/Keywords.js';

const LocationInput = ({ locationInput, setLocationInput }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocationInput(value); 

    if (value.length > 0) {
      const filtered = locationSuggestions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocationInput(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className='mt-5'>
      <h4>Enter Location :</h4>
      <input 
        className="form-control mb-3"
        type="text" 
        value={locationInput} 
        onChange={handleChange}
        placeholder="Location wise filtering..."
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
          width: '100%',
        }}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul role="listbox" style={{
          listStyleType: 'none', 
          padding: '0', 
          marginTop: '10px', 
          width: '100%', 
          border: '2px solid #303030',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          backgroundColor: '#303030'
        }}>
          {filteredSuggestions.map((suggestion) => (
            <li 
              key={suggestion} 
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                cursor: 'pointer', 
                padding: '8px', 
                backgroundColor: '#303030',
                color: 'white',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'purple'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#303030'}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
