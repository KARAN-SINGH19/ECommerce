import React, { useState } from 'react'
import Header from '../Components/Header'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ShippingDetails = () => {

    const navigate = useNavigate()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [phoneNo, setPhoneNo] = useState(''); // Changed variable name to match the backend
    const [pinCode, setPinCode] = useState(''); // Changed variable name to match the backend


    const details = {

        shippingAddress: {
            address: address,
            city: city,
            state: state,
            phoneNo: phoneNo,
            pinCode: pinCode
        }

    };

    async function submitDetails() {
        const alert = await Swal.fire({
            title: "Review Your Shipping Details Before Proceeding",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit"
        })

        if (alert.isConfirmed) {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post('http://localhost:4000/api/v1/addShippingDetails', details, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    Swal.fire({
                        title: "Submitted!",
                        text: "Your details has been deleted.",
                        icon: "success"
                    });
                    navigate('/ConfirmOrder')
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to submit the details. Please try again later.",
                        icon: "error"
                    });
                    console.error("Failed to add details:", response.data.message);
                }
            } catch (error) {
                navigate('/Login')
            }
        }
    }


    return (
        <div>
            <Header />

            <Container className='mt-3'>
                <Row>
                    <Col>

                        <Card className="p-4 mx-auto" style={{ width: "60%", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                            <h2>Shipping Details</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Address">
                                        <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="City">
                                        <Form.Control type="text" placeholder="City" value={city} onChange={(e) => { setCity(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="State">
                                        <Form.Control type="text" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Contact Number">
                                        <Form.Control type="number" placeholder="Contact Number" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Pin Code">
                                        <Form.Control type="number" placeholder="Pin Code" value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Country">
                                        <Form.Control type="text" placeholder="Country" readOnly defaultValue={"United Arab Emirates"} />
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>


                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button style={{ width: "25%", display: "flex", justifyContent: "center" }} onClick={submitDetails} variant="primary" size="lg">
                                    Add Details
                                </Button>
                            </div>
                        </Card>

                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default ShippingDetails
