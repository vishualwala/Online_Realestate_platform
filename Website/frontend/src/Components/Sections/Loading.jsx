import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', variant: 'success', marginTop: '20px' }}>

    <Spinner animation="grow" style={{ width: '30px', height: '30px', color: '#FF9933' }} />

    <Spinner animation="grow" style={{ width: '60px', height: '60px', color: '#FFFFFF' }} />
    
    <Spinner animation="grow"  style={{ width: '100px', height: '100px', color: '#4CAF50' }} />
  
    <p>Loading data...</p>
  </div>
  )
}

export default Loading