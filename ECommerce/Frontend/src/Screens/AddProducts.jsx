import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ShowAlert from '../Components/ShowAlert';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [price, setPrice] = useState('')
    const [ratings, setRatings] = useState('')

    const [toggleAlert, setToggleAlert] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const data = {
        name: name,
        category: category,
        status: status,
        description: description,
        price: price,
        ratings: ratings,
        stock: stock
    }


    async function submitDetails() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:4000/api/v1/addProduct", data, {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setName('')
                setStatus('')
                setDescription('')
                setStock('')
                setPrice('')
                setRatings('')

                setToggleAlert(true)
                setSuccessMsg('Product added successfully')
            }
            else {
                setToggleAlert(false)
            }
        } catch (error) {
            console.log(error)
            navigate('/Login')
        }
    }

    return (
        <div>
            <Header />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <Card className="p-4 mx-auto" style={{ width: "60%", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                            <h2>Product Details</h2>
                            {
                                toggleAlert === true ? (
                                    <ShowAlert variant='success' message={successMsg} />
                                ) : null
                            }
                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Name">
                                    <Form.Control id='name' placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" onChange={handleCategoryChange}>
                                <Form.Select id='select'>
                                    <option id='Clothing'>Clothing</option>
                                    <option id='Footwear'>Footwear</option>
                                    <option id='Console'>Console</option>
                                    <option id='Mobile'>Mobile</option>
                                    <option id='Laptop'>Laptop</option>
                                    <option id='Speakers'>Speakers</option>
                                    <option id='Headsets'>Headsets</option>
                                    <option id='Monitor'>Monitor</option>
                                    <option id='Gaming'>Gaming</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Status">
                                    <Form.Control id='status' placeholder="Status" value={status} onChange={(e) => { setStatus(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Description">
                                    <Form.Control id='desc' as="textarea" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Stock">
                                    <Form.Control id='stock' type="number" placeholder="Stock" value={stock} onChange={(e) => { setStock(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Price">
                                    <Form.Control id='price' type="number" placeholder="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Rating">
                                    <Form.Control id='rating' placeholder="Rating" value={ratings} onChange={(e) => { setRatings(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <div style={{ display: 'flex', justifyContent: "center" }}>
                                <Button id='btn' style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" size="lg" onClick={submitDetails}>Create</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default AddProducts
