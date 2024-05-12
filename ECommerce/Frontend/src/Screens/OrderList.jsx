import React, { useEffect, useState } from 'react';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowAlert from '../Components/ShowAlert';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderList = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [toggleAlert, setToggleAlert] = useState(false)
    const [successMsg, setSuccessMsg] = useState()
    const navigate = useNavigate()

    async function updateStatus(id, qty, orderID) {
        try {
            const alert = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            })
            if (alert.isConfirmed) {
                const token = localStorage.getItem('token');
                const response = await axios.put(`http://localhost:4000/api/v1/updateStock/${id}/${qty}/${orderID}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response) {
                    setToggleAlert(true)
                    setSuccessMsg('Order status updated successfully!!')
                    Swal.fire({
                        title: "Success",
                        text: "Order shipped successfully!!",
                        icon: "success"
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
                else {
                    setToggleAlert(false)
                }
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to ship order. Please try again later.",
                icon: "error"
            });
        }
    }

    async function getOrderDetails() {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.get("http://localhost:4000/api/v1/getOrderDetails", {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response.data.success) {
                console.log(response.data)
                setOrderDetails(response.data.orderDetails);
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    useEffect(() => {
        getOrderDetails();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: '1' }}>
                <Container className='mt-3'>
                    <Row>
                        <Col>
                            {
                                toggleAlert === true ? (
                                    <ShowAlert variant='success' message={successMsg} />
                                ) : null
                            }
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ORDER NO</th>
                                        <th>PRODUCT NAME</th>
                                        <th>QUANTITY</th>
                                        <th>TOTAL PRICE</th>
                                        <th>STATUS</th>
                                        <th>PLACED AT</th>
                                        <th>USER ID</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.map((order, index) => (
                                        order.orderItems.map((item, itemIndex) => (
                                            <tr key={itemIndex}>
                                                <td>{index + 1}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.quantity}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{item.status}</td>
                                                <td>{new Date(order.placedAt).toLocaleString()}</td>
                                                <td>{order.user}</td>
                                                <td style={{ display: "flex", justifyContent: "center" }}>
                                                    <Button style={{ whiteSpace: 'nowrap' }} variant="success" onClick={() => { updateStatus(item.productId, item.quantity, order._id) }}>Ship Order</Button>
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
    );
}

export default OrderList;
