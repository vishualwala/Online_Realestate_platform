import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../Images/image1.jpeg';
import image2 from '../../Images/image2.jpeg';
import image3 from '../../Images/image3.jpg';


const Poster = () => {
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1
  };

  return (
    <Carousel interval={5000}>
      {/* Image Slide 1 */}
      <Carousel.Item>
        <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
            style={{ height: '600px', objectFit: 'cover', objectPosition: 'top' }}
          />
          <div style={overlayStyle} />
           
          <Carousel.Caption style={{ zIndex: 2 }}>
            <h3>Embrace the Moment</h3>
            <p>Pause and savor the beauty of the present, where joy can be found in life’s simplest pleasures. <br /> Cherish each fleeting moment and create lasting memories.</p>
          </Carousel.Caption>
        </div>
       
      </Carousel.Item>

      {/* Image Slide 2 */}
      <Carousel.Item>
        <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
            style={{ height: '600px', objectFit: 'cover', objectPosition: 'top' }}
          />
          <div style={overlayStyle} />
          <Carousel.Caption style={{ zIndex: 2 }}>
            <h3>Nature's Splendor</h3>
            <p>Immerse yourself in the breathtaking artistry of nature, from vibrant sunsets to serene forests. <br /> Celebrate and protect the wonders that nourish our spirit.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      {/* Image Slide 3 */}
      <Carousel.Item>
        <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
          <img
            className="d-block w-100"
            src={image3}  
            alt="Third slide"
            style={{ height: '600px', objectFit: 'cover', objectPosition: 'top' }}
          />
          <div style={overlayStyle} />
          <Carousel.Caption style={{ zIndex: 2 }}>
            <h3>Chasing Dreams</h3>
            <p>Pursue your aspirations with passion and determination, knowing that every step counts. <br /> Embrace the journey, for it’s the chase that makes life extraordinary.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Poster;
