import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const Success = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: "CLEAR_CART"
        })
    }, [])

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={12} md={12} sm={12}>
                        <div className="success-card">
                            <div className="success-animation">
                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                                <h2 style={{ marginTop: '30px', color: '#555' }}>Successfull Payment!</h2>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Link to="/" className='mt-3'>
                                    <Button size="lg" variant="primary">Home</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Success;
