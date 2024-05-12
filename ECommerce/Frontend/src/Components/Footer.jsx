import React from 'react';
import { Link } from 'react-router-dom'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function App({ style }) {
  return (
    <div>
      <MDBFooter className='text-white text-center' style={{ backgroundColor: '#232F3E', marginTop: "50px", height: "auto", ...style }}>
        <MDBContainer className='p-4'>
          <MDBRow>
            <MDBCol lg="6" md="12" className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Footer Content</h5>
              <p style={{ textAlign: "justify" }}>
                Your one-stop e-commerce hub for seamless online shopping. Discover a diverse range of products, from electronics to fashion, all easily accessible through our intuitive platform. With secure payment options and speedy delivery, customer satisfaction is our priority. Utilize our smart search and personalized recommendations for a tailored shopping experience. Take advantage of exclusive deals and discounts to shop smart and save. Join our community of savvy shoppers and elevate your online retail experience with ShopSmart.
              </p>
            </MDBCol>
            <MDBCol lg="6" md="12" className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>
              <ul className='list-unstyled mb-4'> {/* Adjusted margin bottom to create space */}
                <li style={{ marginBottom: '10px' }}>
                  <Link style={{ textDecoration: 'none' }} to='/' className='text-white'>Home</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link style={{ textDecoration: 'none' }} to='/Orders' className='text-white'>Orders</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link style={{ textDecoration: 'none' }} to='/Profile' className='text-white'>Profile</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Link style={{ textDecoration: 'none' }} to='/Feedback' className='text-white'>Feedback</Link>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright:
          <Link className='text-white' to='/Home' style={{ textDecoration: 'none' }}>
            ShopSmart.com
          </Link>
        </div>
      </MDBFooter>
    </div>
  );
}
