import React from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowAlert from '../Components/ShowAlert';

const ResetPassword = () => {

    const [password, setPassword] = useState()
    const { userId } = useParams()
    const [errorAlert, setErrorAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const navigate = useNavigate()

    async function submitPass(password) {

        const data = { password: password }
        const response = await axios.post(`http://localhost:4000/api/v1/updatePassword/${userId}`, data)
        if (response) {
            if (response.data.message === 'Password changed successfully!!') {
                setSuccessAlert(true)
                setSuccessMsg(response.data.message)
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
            if (response.data.message === 'Please enter a password!!') {
                setErrorAlert(true)
                setErrMsg(response.data.message)
            }
            if (response.data.message === 'Password should have at least 8 characters!!') {
                setErrorAlert(true)
                setErrMsg(response.data.message)
            }
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Container>
                <Row>
                    <Col>
                        <Card className="p-4 mx-auto" style={{ width: "60%", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                            <h1 className="mb-4">Reset Password</h1>
                            {
                                errorAlert === true ? (
                                    <ShowAlert variant='danger' message={errMsg} />
                                ) : null
                            }
                            {
                                successAlert === true ? (
                                    <ShowAlert variant='success' message={successMsg} />
                                ) : null
                            }
                            <Form.Group className="mb-3 input-1">
                                <FloatingLabel controlId="floatingEmail" label="Password">
                                    <Form.Control type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </FloatingLabel>
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button size='lg' style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" onClick={() => { submitPass(password) }}>
                                    Reset
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResetPassword
