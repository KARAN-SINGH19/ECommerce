import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Error = () => {
    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} md={6} sm={12}>
                        <div className="success-card">
                            <div className="success-animation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="#f00" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm0-5.5c-.69 0-1.25-.56-1.25-1.25V7.75c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v5.25c0 .69-.56 1.25-1.25 1.25z" />
                                </svg>
                                <h3 style={{ marginTop: '-300px' }}>Something went wrong!</h3>
                            </div>
                            <div className="text-center mt-3">
                                <Button variant="primary" className="submit">
                                    <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Error
