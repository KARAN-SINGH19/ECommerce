import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ShowAlert from '../Components/ShowAlert';

const Regsiteration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [pass, setPass] = useState('');

    const [errorAlert, setErrorAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [erroMsg, setErrMsg] = useState('')

    const navigate = useNavigate();

    const details = { name, email, password: pass, age };

    async function submitDetails() {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/registerUser', details);
            if (response) {
                localStorage.setItem('token', response.data.jwtToken)
                setSuccessAlert(true)
                setTimeout(() => {
                    navigate('/')
                }, 1000);
                setErrorAlert(false)
            }
        } catch (error) {
            setErrorAlert(true)
            setErrMsg(error.response.data.error.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div style={{ width: "50%" }}>
                <Card className="p-4 mx-auto" style={{  background: 'transparent',border: 'none' }}>
                    <img src='/images/shopping-bags.png' alt="Logo" style={{ margin: 'auto', marginBottom: '20px', width: '130px', height: '115px', borderRadius: '10px', border: '0px solid #555', }} />
                    <h1 className="mb-4">Registration</h1>
                    {
                        errorAlert === true ? (
                            <ShowAlert variant="danger" message={erroMsg} />
                        ) : null
                    }
                    {
                        successAlert === true ? (
                            <ShowAlert variant='success' message={'User registered successfully!!'} />
                        ) : null
                    }
                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingName" label="Name">
                            <Form.Control placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingEmail" label="Email">
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingAge" label="Age">
                            <Form.Control type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button size='lg' style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" onClick={submitDetails}>Register</Button>
                    </div>
                </Card>
            </div>
        </Container>
    );
}

export default Regsiteration;
