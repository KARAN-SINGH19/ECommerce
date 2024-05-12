import React from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowAlert from '../Components/ShowAlert';

const ForgetPassword = () => {

    const [email, setEmail] = useState()

    async function sendEmail(email) {
        const data = { email: email }
        const response = await axios.post('http://localhost:4000/api/v1/sendVerificationEmail', data)
        if (response) {
            console.log(response)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Container>
                <Row>
                    <Col>
                        <Card className="p-4 mx-auto" style={{ width: "60%", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                            <h1 className="mb-4">Change Password</h1>
                            <Form.Group className="mb-3 input-1">
                                <FloatingLabel controlId="floatingEmail" label="Email">
                                    <Form.Control placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </FloatingLabel>
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button size='lg' style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" onClick={() => { sendEmail(email) }}>
                                    Submit
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ForgetPassword
