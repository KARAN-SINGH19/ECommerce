import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Components/Footer';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsPlus, BsDash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

//useParams is a hook that allows you to have access to dynamic parameters in the URL(Uniform Resource Locator).

const GetProduct = () => {

    const dispatch = useDispatch();

    const [prodDetails, setProdDetails] = useState([])
    const { id } = useParams()
    const [intialQty, setIntialQty] = useState(1)
    const [toggleToast, setToggleToast] = useState(false)
    const [toastMsg, setToastMsg] = useState('')
    const [inStock, setInStock] = useState(false)
    const [outStock, setOutStock] = useState(false)

    async function updateStockStatus(id) {
        const response = await axios.get(`http://localhost:4000/api/v1/updateStockStatus/${id}`)
    }

    async function updateStockStatus2(id) {
        const response = await axios.get(`http://localhost:4000/api/v1/updateStockStatus2/${id}`)
    }

    async function getProduct() {

        const token = localStorage.getItem('token')
        if (token && token !== 'null') {
            setToastMsg('Cart updated!')
        }
        else {
            setToastMsg('Cart updated! Login now to complete your order.');
        }

        const response = await axios.get(`http://localhost:4000/api/v1/getProductdetails/${id}`)
        if (response) {
            if (response.data.product.stock === 0) {
                updateStockStatus(response.data.product._id)
                setOutStock(true)
            }
            if (response.data.product.stock > 0) {
                updateStockStatus2(response.data.product._id)
                setInStock(true)
            }
            setProdDetails(response.data.product)
        }
    }


    function handleIncrement() {
        intialQty < prodDetails.stock ? setIntialQty(intialQty + 1) : setIntialQty(prodDetails.stock)
    }

    function handleDecrement() {
        if (intialQty === 1) {
            setIntialQty(intialQty)
        }
        else {
            const newQty = intialQty - 1
            setIntialQty(newQty)
        }
    }


    const subTotal = prodDetails.price * intialQty


    function addToCart() {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { id: prodDetails._id, name: prodDetails.name, price: prodDetails.price, quantity: intialQty, subTotal: subTotal }
        });
        setToggleToast(true)
    }

    function closeToast() {
        setToggleToast(false)
    }


    useEffect(() => {
        getProduct();
    }, [prodDetails])



    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col xs={12} sm={8} md={12} lg={12}>
                        <Card className="productCard">
                            <div className="cardContent">
                                <Card.Img variant="top" src={prodDetails.images?.[0]?.url} className="productImage" style={{ width: 'auto', height: '50vh', objectFit: 'cover' }} />
                                <Card.Body className="productDetails">
                                    <Card.Title className='title'>{prodDetails.name}</Card.Title>
                                    <hr />
                                    <Card.Text className='price'> AED {prodDetails.price}</Card.Text>
                                    <div className="quantity">
                                        <Button size='lg' variant="light" onClick={handleDecrement}><BsDash /></Button>
                                        <span>{intialQty}</span>
                                        <Button size='lg' variant="light" onClick={handleIncrement}><BsPlus /></Button>
                                    </div>
                                    <hr />
                                    <Card.Text className="status">Status: {inStock === true ? (<span style={{ fontWeight: '800', color: "green" }} className='prodStatus'>{prodDetails.status}</span>) : (<span style={{ fontWeight: '800', color: "red" }} className='prodStatus'>{prodDetails.status}</span>)} | {prodDetails.stock}</Card.Text>
                                    <h5 style={{ color: '#555', fontWeight: '800', textAlign: "left" }}>Description:</h5>
                                    <Card.Text className='desc'>{prodDetails.description}</Card.Text>
                                    {inStock === true ? (<Button size='lg' className='btn' style={{ margin: "20px 0px" }} variant="primary" onClick={addToCart}>Add To Cart</Button>) : (<Button size='lg' className='btn' style={{ margin: "20px 0px" }} variant="primary" disabled onClick={addToCart}>Add To Cart</Button>)}
                                </Card.Body>
                            </div>
                            <Link to={"/Cart"} className="cartLink"></Link>
                            {
                                toggleToast === true ? (
                                    <ToastContainer position="middle-end">
                                        <Toast bg='success' animation={true} onClose={closeToast}>
                                            <Toast.Header>
                                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                                <strong className="me-auto" style={{ fontSize: "20px" }}>ShopSmart</strong>
                                                <strong>1 mins ago</strong>
                                            </Toast.Header>
                                            <Toast.Body style={{ color: "white", fontSize: "18px" }}>{toastMsg}</Toast.Body>
                                        </Toast>
                                    </ToastContainer>
                                ) : null
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default GetProduct
