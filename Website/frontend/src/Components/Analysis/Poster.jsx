import React from 'react'
import { Container} from 'react-bootstrap'
import statistics from '../../Images/statistics.png'

const Poster = () => {
    const posterStyle = {
        backgroundImage: `url(${statistics})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)', 
        borderRadius: '10px',
    }

    const contentStyle = {
        zIndex: 1,
        marginTop: '20%',
        padding: '0 20px', 
    }

    return (
        <Container fluid style={posterStyle}>
            <div style={overlayStyle}></div>
            <div style={contentStyle}>
                <h1>Unlock The Insights</h1>
                <p>Explore key statistics that can help you make informed real estate decisions.</p>

                
            </div>
        </Container>
    )
}

export default Poster
