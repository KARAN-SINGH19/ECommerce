import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const [order, setOrder] = useState([])
    const [orderStatus, setOrderStatus] = useState()
    const navigate = useNavigate()

    async function getOrderDetails() {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.get("http://localhost:4000/api/v1/getOrderDetail", {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setOrder(response.data.details)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [])


    async function deleteOrder(id) {
        console.log(id)
        const alert = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        })

        if (alert.isConfirmed) { // isConfirmed is a property used by sweetalert to check wheather the user confirmed the action.
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`http://localhost:4000/api/v1/cancelOrder/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                    }
                })
                if (response) {
                    Swal.fire({
                        title: "Cancelled!",
                        text: "Your order has been cancelled.",
                        icon: "success"
                    });
                }
                getOrderDetails();
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to cancel order. Please try again later.",
                    icon: "error"
                });
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: '1' }}>
                <Container>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ORDER</th>
                                        <th>TOTAL AMOUNT</th>
                                        <th>PLACED AT</th>
                                        <th>STATUS</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.map((order, index) => (
                                        order.orderItems.map((item, itemIndex) => (
                                            <tr key={itemIndex}>
                                                <td>{index + 1}</td>
                                                <td>{item.productName}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{new Date(order.placedAt).toLocaleString()}</td>
                                                <td>{item.status}</td>
                                                <td style={{ whiteSpace: 'nowrap', display: "flex", justifyContent: "center" }}>
                                                    <Button onClick={() => { deleteOrder(order._id) }} variant="danger">Cancel Order</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default Orders



