import React from 'react';
import Header from '../Components/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {

    const [shipDetails, setShipDetails] = useState({})
    const navigate = useNavigate()

    const cartItems = useSelector(state => state.custom.cartItems);
    console.log(cartItems)
    console.log(cartItems.length)

    async function getShippingDetails() {
        try {
            const token = localStorage.getItem('token');
            const response2 = await axios.get(`http://localhost:4000/api/v1/getShippingdetails`, {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response2) {
                setShipDetails(response2.data.details.shippingAddress)
            }
        } catch (error) {
            navigate('/Login')
        }
    }


    useEffect(() => {
        getShippingDetails()
        console.log(shipDetails)
    }, [])


    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].subTotal;
    }

    let vat = total * (5 / 100)

    let finalAmount = total + vat // THIS AMOUNT IS HE TOTAL + VAT 


    let products = []
    for (let index = 0; index < cartItems.length; index++) {

        let product = {
            productId: cartItems[index].id,
            productName: cartItems[index].name,
            productPrice: cartItems[index].price,
            quantity: cartItems[index].quantity,
        }

        products.push(product)

    }


    const orderItems = {
        orderItems: products,
        vatPrice: vat,
        totalPrice: finalAmount
    }


    async function makePayment() {
        const stripe = await loadStripe('pk_test_51NxBhTEWwd2L3hVcnFaG21ry6gTBatxJHmbNyDIZtrcZl3AZMgsrr9Os3snhB49DKSBVo6OblZMH0wsPwkH3AGcu00nc7xQtFh');
        const token = localStorage.getItem('token');

        try {
            const body = {
                products: cartItems
            };
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };
            const response = await fetch("http://localhost:4000/api/v1/stripeGateway", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
            const sessionData = await response.json();

            const result = stripe.redirectToCheckout({
                sessionId: sessionData.id
            });

            if (result.error) {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    }


    async function confirmOrder() {
        const confirmationResult = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm order!"
        });

        if (confirmationResult.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:4000/api/v1/storeOrder', orderItems, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response) {
                    makePayment();
                    Swal.fire({
                        title: "Success",
                        text: "Order confirmed!!",
                        icon: "success"
                    });
                }
            } catch (error) {
                navigate('/Login')
            }
        }
    }



    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title className='title2'>Shipping Info</Card.Title>
                                <hr />
                                <Card.Text className='text'>
                                    Address: {shipDetails.address} <br />
                                    City: {shipDetails.city}<br />
                                    State: {shipDetails.state}<br />
                                    Contact No: {shipDetails.phoneNo}<br />
                                    Pin Code: {shipDetails.pinCode}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="mt-5">
                            <Card.Body>
                                <Card.Title className='title2'>Cart Items</Card.Title>
                                <hr />
                                {cartItems.map((values, index) => (
                                    <div key={index} className="cart-item">
                                        <span style={{ textAlign: 'justify', maxWidth: "80%" }}>{values.name}</span>
                                        <span>{values.price} x {values.quantity} = {values.subTotal}</span>
                                    </div> 
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    

                    {/* Column for payment details */}
                    <Col md={4}>
                        <Card style={{ width: "28rem" }}>
                            <Card.Body>
                                <Card.Title className='title2' style={{ textAlign: "center" }}>Order Summary</Card.Title>
                                <hr />
                                <Card.Text className='text'>
                                    <Row>
                                        <Col xs={6}>SubTotal:</Col>
                                        <Col xs={6} className="text-end">AED {total}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>Vat:</Col>
                                        <Col xs={6} className="text-end">AED {vat}.0</Col>
                                    </Row>
                                </Card.Text>
                                <hr />
                                <Card.Text>
                                    <Row>
                                        <Col xs={6}>Total:</Col>
                                        <Col xs={6} className="text-end">AED {total + vat}.0</Col>
                                    </Row>
                                </Card.Text>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button size='lg' onClick={confirmOrder} variant="primary">Pay Now</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default ConfirmOrder;
