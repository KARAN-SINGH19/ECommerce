import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom'


const Home = () => {

    const [products, setProducts] = useState([]) //STATE VARIBALE TO HOLD ALL THE PRODUCTS
    const [keyword, setKeyword] = useState('')

    //SETTING THE CURRENT PAGE AND PRODUCTS PER PAGE WE WANT TO DISPLAY
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 6

    async function getProdcuts() {
        const token = localStorage.getItem('token');
        // console.log(token)
        const response = await axios.get('http://localhost:4000/api/v1/getProducts', {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token to the Authorization header
            }
        });
        // console.log(response)
        setProducts(response.data.products)
        // console.log(response.data)
    }

    useEffect(() => {
        getProdcuts();
    }, [])


    async function searchProduct(e) {
        e.preventDefault(); //WILL PREVENT THE PAGE TO REFRESH ON FORM SUBMISSION
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/searchProducts?keyword=${keyword}`);
            console.log('Response Data:', response.data);
            setProducts(response.data.result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    async function filterByCategory(category) {
        console.log(category)
        const response = await axios.get(`http://localhost:4000/api/v1/filterProducts?category=${category}`)
        if (response) {
            setProducts(response.data.result)
        }
    }

    //FINDIND 1ST AND LAST INDEX 
    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage

    //REMOVING ELEMENTS BEYOND THE LAST INDEX (INCLUDING LAST INDEX)
    const currentProducts = products.slice(firstIndex, lastIndex)

    //FINDING THE NO OF PAGES
    const totalProducts = products.length
    const noofPages = Math.ceil(totalProducts / productsPerPage)

    //ADDING THE NO OF PAGES INTO ARRAY ITEMS
    let items = [];
    for (let number = 1; number <= noofPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    return (
        <div>
            <Header />

            <Carousel fade data-bs-theme="dark" controls={false} indicators={false}>
                <Carousel.Item style={{ height: '600px' }} interval={2000}>
                    <img
                        className="d-block w-100"
                        src="/images/image2.jpg"
                        alt="First slide"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                    <Carousel.Caption style={{ marginBottom: '200px', color: 'white' }}>
                        <h1>Explore Our Exciting Collection</h1>
                        <h4>Discover a world of irresistible products and unbeatable deals.</h4>
                    </Carousel.Caption>

                </Carousel.Item>

                <Carousel.Item style={{ height: '600px' }} interval={2000}>
                    <img
                        className="d-block w-100"
                        src="/images/apparel-1850804.jpg"
                        alt="Second slide"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                    <Carousel.Caption style={{ marginBottom: '200px', color: 'white' }}>
                        <h1>Explore Our Exciting Collection</h1>
                        <h4>Discover a world of irresistible products and unbeatable deals.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ height: '600px' }} interval={2000}>
                    <img
                        className="d-block w-100"
                        src="/images/store-906722.jpg"
                        alt="Third slide"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                    <Carousel.Caption style={{ marginBottom: '200px', color: 'white' }}>
                        <h1>Explore Our Exciting Collection</h1>
                        <h4>Discover a world of irresistible products and unbeatable deals.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ height: '600px' }} interval={2000}>
                    <img
                        className="d-block w-100"
                        src="/images/girl-4181395.jpg"
                        alt="First slide"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                    <Carousel.Caption style={{ marginBottom: '200px', color: 'white' }}>
                        <h1>Explore Our Exciting Collection</h1>
                        <h4>Discover a world of irresistible products and unbeatable deals.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className='searchContainer' style={{ textAlign: "center", paddingTop: "30px" }}>
                <h1 style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.9)', padding: '20px 0px', width: "40%", margin: "auto", fontSize: "2.5rem", color: "#333" }}>Featured Products</h1>
                <Row className="justify-content-center mt-4" style={{ paddingTop: "15px" }}>
                    <Col xs={12} sm={8} md={8} lg={6}>
                        <Form className="w-100 d-flex">
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-2 flex-grow-1 rounded-pill py-2 px-4"
                                style={{ fontSize: "1.2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value) }}
                            />
                            <Button
                                size='lg'
                                onClick={(e) => { searchProduct(e) }}
                                variant="success"
                                type="submit"
                                style={{ fontSize: "1.2rem", borderRadius: "25px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                                className="ms-2 py-2 px-3" //px means padding from left right and py means top bottom
                            >
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>

            <Container style={{ marginTop: "70px" }}>

                <Row>
                    <Col xs={12} md={2}>
                        <div>
                            <h3>Categories</h3>
                            <ul>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Clothing') }}>Clothing</a></li>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Footwear') }}>Footwear</a></li>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Console') }}>Console</a></li>

                                <li className='linkStyle'><a onClick={() => { filterByCategory('Mobile') }}>Mobile</a></li>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Laptop') }}>Laptop</a></li>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Speakers') }}>Speakers</a></li>

                                <li className='linkStyle'><a onClick={() => { filterByCategory('Headsets') }}>Headsets</a></li>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Monitor') }}>Monitor</a></li>
                                <li className='linkStyle'><a onClick={() => { filterByCategory('Gaming') }}>Gaming</a></li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={12} md={10}>
                        <Row>
                            {
                                currentProducts.map((values) => {
                                    const { _id, name, price, ratings, images } = values;
                                    const filledStars = ratings;
                                    const finalRatings = new Array(filledStars).fill(filledStars)

                                    return (
                                        <Col key={_id} xs={12} md={4} style={{ marginBottom: '20px' }}>
                                            <Card style={{ background: 'transparent' }} className="product-card">
                                                <Card className="product-card">
                                                    <Card.Img
                                                        variant="top"
                                                        src={images[0].url}
                                                        className="card-image"
                                                        style={{ background: 'transparent', width: 'auto', height: 'auto', objectFit: 'cover' }}
                                                    />
                                                </Card>
                                                <Card.Body>
                                                    <Card.Title className="card-title">{name}</Card.Title>
                                                    <Card.Text className="card-text">
                                                        AED {price}
                                                        <div className="star-rating">
                                                            {[...Array(5)].map((_, index) => (
                                                                <FaStar
                                                                    key={index}
                                                                    className={index < filledStars ? "star-icon filled" : "star-icon empty"}
                                                                />
                                                            ))}
                                                        </div>
                                                    </Card.Text>

                                                    <Link to={`/GetProduct/${_id}`} className="btn-link">
                                                        <Button size='lg' variant="primary">View Product</Button>
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination>
                                {
                                    items.map((pages) => {
                                        return (
                                            pages
                                        )
                                    })
                                }
                            </Pagination>
                        </div>
                    </Col>

                </Row>
            </Container>



            <Footer />
        </div>
    )
}

export default Home
