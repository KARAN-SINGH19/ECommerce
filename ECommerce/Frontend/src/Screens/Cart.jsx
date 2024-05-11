import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cart = () => {

    const cartItems = useSelector(state => state.custom.cartItems);
    const countItems = cartItems.length
    const [state, setState] = useState(false)
    const [jwtToken, setJWTToken] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        const data = localStorage.getItem('items');
        if (data) {
            dispatch({
                type: 'SET_CART_FROM_LS',
                payload: JSON.parse(data)
            });
        }
    }, [dispatch]);

    function deleteItem(id) {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { id: id }
        })
    }

    function clearCart() {
        dispatch({
            type: 'CLEAR_CART'
        })
    }

    async function checkShippingDetails() {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post("http://localhost:4000/api/v1/checkShippingDetails", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Response message:", response.data.message); // Add this line to check the message received
            const trimmedMessage = response.data.message.trim();

            if (trimmedMessage === "Shipping details of the user already exist in the database") {
                navigate("/CheckShippingDetails")
            } else {
                navigate("/ShippingDetails")
            }
        } catch (error) {
            navigate('/Login')
        }
    }


    function checkLoginStatus() {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token && token != 'null') {
            setJWTToken(true)
        }
        else {
            setJWTToken(false)
        }
    }

    function toggleCheckout() {
        countItems > 0 ? setState(true) : setState(false)
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    useEffect(() => {
        toggleCheckout()
    }, [countItems])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <div style={{ flex: '1' }}>
                <Container className='mt-3'>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>PRODUCT NAME</th>
                                        <th>PRICE</th>
                                        <th>QUANTITY</th>
                                        <th>SUBTOTAL</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td style={{ textAlign: "justify" }}>{item.name}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>AED {item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>AED {item.subTotal}</td>
                                                    <td style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button  variant="danger" onClick={() => { deleteItem(item.id) }}>Remove Item</Button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                            <div style={{ display: "flex", justifyContent: "center" }}>

                                {/* // CHECKOUT BUTTON WILL ONLY APPEAR IF THE USER IS LOGGED IN AND THE COUNT OF ITEMS IN CART IS GREATER THAN 0 */}

                                <Button size='lg' variant="danger" onClick={() => { clearCart() }}>Clear Cart</Button>
                                {
                                    state === true && jwtToken === true ? (
                                        <Button size='lg' style={{ marginLeft: "10px" }} onClick={checkShippingDetails} variant="primary">Checkout</Button>
                                    ) : null
                                }
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </div>
    )
}

export default Cart;
