import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const UpdateProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [oldname, setOldName] = useState('')
    const [oldcategory, setOldCategory] = useState('')
    const [oldstatus, setOldtatus] = useState('')
    const [olddescription, setOldDescription] = useState('')
    const [oldprice, setOldPrice] = useState('')
    const [oldratings, setOldRatings] = useState('')

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [ratings, setRatings] = useState('')


    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };


    async function getDetails() {
        const response = await axios.get(`http://localhost:4000/api/v1/getProductdetails/${id}`)
        if (response) {
            setOldName(response.data.product.name)
            setOldCategory(response.data.product.category)
            setOldtatus(response.data.product.status)
            setOldDescription(response.data.product.description)
            setOldPrice(response.data.product.price)
            setOldRatings(response.data.product.ratings)
        }
    }

    useEffect(() => {
        getDetails()
    }, [])



    const data = {
        name: name !== "" ? name : oldname,
        category: category !== "" ? category : oldcategory,
        status: status !== "" ? status : oldstatus,
        description: description !== "" ? description : olddescription,
        price: price !== "" ? price : oldprice,
        ratings: ratings !== "" ? ratings : oldratings,
    }


    async function updateDetails() {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:4000/api/v1/updateProduct/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token to the Authorization header
            }
        })
        if (response) {
            navigate('/Products')
        }

    }

    return (
        <div>
            <Header />

            <Container>
                <Row>
                    <Col>
                        <Card className="p-4 mx-auto" style={{ width: "60%", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                            <h2>Product Details</h2>
                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Name">
                                    <Form.Control placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Select onChange={handleCategoryChange}>
                                    <option>Clothing</option>
                                    <option>Footwear</option>
                                    <option>Console</option>
                                    <option>Mobile</option>
                                    <option>Laptop</option>
                                    <option>Speakers</option>
                                    <option>Headsets</option>
                                    <option>Monitor</option>
                                    <option>Gaming</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Status">
                                    <Form.Control placeholder="Status" value={status} onChange={(e) => { setStatus(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Description">
                                    <Form.Control as="textarea" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Price">
                                    <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FloatingLabel controlId="floatingEmail" label="Rating">
                                    <Form.Control placeholder="Rating" value={ratings} onChange={(e) => { setRatings(e.target.value) }} />
                                </FloatingLabel>
                            </Form.Group>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button size="lg" style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" onClick={updateDetails}>Update</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default UpdateProduct
