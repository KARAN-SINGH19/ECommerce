import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Products = () => {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])


    async function viewProducts() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:4000/api/v1/getProductList", {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                console.log(response.data.productList)
                setProducts(response.data.productList)
            }
        } catch (error) {
            navigate('/Login')
        }
    }


    useEffect(() => {
        viewProducts()
    }, [])


    async function deleteProduct(id) {
        const alert = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        if (alert.isConfirmed) {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:4000/api/v1/deleteProducts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted.",
                    icon: "success"
                });
                viewProducts();
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete product. Please try again later.",
                    icon: "error"
                });
            }
        }
    }




    return (
        <div>
            <Header />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>NAME</th>
                                    <th>CATEGORY</th>
                                    <th>PRICE</th>
                                    <th>STATUS</th>
                                    <th>RATINGS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.status}</td>
                                        <td>{product.ratings}</td>
                                        <td style={{ display: 'flex', gap: '10px', justifyContent: "center" }}>
                                            <Button variant="danger" onClick={() => deleteProduct(product._id)}>DELETE</Button>
                                            <Link to={`/UpdateProduct/${product._id}`}>
                                                <Button variant="success">UPDATE</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Products
