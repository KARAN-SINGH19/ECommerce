import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Card from 'react-bootstrap/Card';

const CheckShippingDetails = () => {

    const navigate = useNavigate()

    // OLD SHIPPING DETAILS
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [phoneNo, setPhoneNo] = useState()
    const [pinCode, setPinCode] = useState()


    async function getShippingDetails() {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:4000/api/v1/getShippingdetails", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                setAddress(response.data.details.shippingAddress.address)
                setCity(response.data.details.shippingAddress.city)
                setState(response.data.details.shippingAddress.state)
                setPhoneNo(response.data.details.shippingAddress.phoneNo)
                setPinCode(response.data.details.shippingAddress.pinCode)
            }
        } catch (error) {
            navigate('/Login')
        }
    }


    useEffect(() => {
        getShippingDetails()
    }, [])


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
                                        <Form.Control type="text" placeholder="Address" readOnly value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="City">
                                        <Form.Control type="text" placeholder="City" readOnly value={city} onChange={(e) => { setCity(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="State">
                                        <Form.Control type="text" placeholder="State" readOnly value={state} onChange={(e) => { setState(e.target.value) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Contact Number">
                                        <Form.Control type="number" placeholder="Contact Number" readOnly value={phoneNo} onChange={(e) => { setPhoneNo(parseInt(e.target.value)) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Pin Code">
                                        <Form.Control type="number" placeholder="Pin Code" readOnly value={pinCode} onChange={(e) => { setPinCode(parseInt(e.target.value)) }} />
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <FloatingLabel controlId="floatingPassword" label="Country">
                                        <Form.Control type="text" placeholder="Country" readOnly defaultValue={"United Arab Emirates"} />
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>

                            <Link style={{ display: 'flex', justifyContent: "center" }} to={'/ConfirmOrder'}>
                                <Button style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" size="lg">
                                    Proceed
                                </Button>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default CheckShippingDetails
