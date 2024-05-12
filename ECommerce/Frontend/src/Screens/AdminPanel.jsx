import React from 'react'
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, CartesianGrid, PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, YAxis, XAxis } from 'recharts';


const AdminPanel = () => {

    const navigate = useNavigate()
    const [prodCount, setProdCount] = useState('')
    const [orderCount, setOrderCount] = useState('')
    const [userCount, setUserCount] = useState('')

    //PIE CHART
    const [inStock, setInStock] = useState({ name: "In Stock", value: 0 });
    const [outStock, setOutStock] = useState({ name: "Out Stock", value: 0 });

    //BAR CHART
    const [countCategory, setCountCategory] = useState({})

    const [sale, setSale] = useState('')

    async function getProductCount() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/v1/countProducts', {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setProdCount(response.data.productCount)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    async function getOrderCount() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4000/api/v1/countOrders', {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setOrderCount(response.data.orderCount)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    async function getUserCount() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4000/api/v1/countUsers', {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setUserCount(response.data.userCount)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    async function getProductStock() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get("http://localhost:4000/api/v1/countStock", {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setInStock({ name: "In Stock", value: response.data.inStockCount })
                setOutStock({ name: "Out Stock", value: response.data.outOfStockCount })
            }
        } catch (error) {
            navigate('/Login')
        }
    }


    async function getTotalSale() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4000/api/v1/totalSale', {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setSale(response.data.totalSaleAmt)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    async function getProdCategory() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4000/api/v1/countCategoryProduct', {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                setCountCategory(response.data.counts)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    useEffect(() => {
        getProductCount()
        getOrderCount()
        getUserCount()
        getProdCategory()
        getProductStock()
    }, [])

    useEffect(() => {
        getTotalSale()
    }, [sale])

    return (
        <div>
            <Header />

            <Container>
                <h1>Dashboard</h1>
                <Row>
                    <Col>
                        <div className="dashboardSummary">
                            <div>
                                <p>
                                    Total Sale <br /> AED {sale > 0 ? sale : 0}
                                </p>
                            </div>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="">
                                <p>Product</p>
                                <p>{prodCount > 0 ? prodCount : 0}</p>
                            </Link>
                            <Link to="">
                                <p>Orders</p>
                                <p>{orderCount > 0 ? orderCount : 0}</p>
                            </Link>
                            <Link to="">
                                <p>Users</p>
                                <p>{userCount > 0 ? userCount : 0}</p>
                            </Link>
                        </div>
                    </Col>
                </Row>


                <Row className="mt-4">
                    <Col>
                        <h3 className="mb-4">Stock Overview</h3>
                        <ResponsiveContainer width="100%" height={500}>
                            <PieChart>
                                <Pie dataKey="value" data={[inStock, outStock]} label>
                                    <Cell fill="#3f8f29" />
                                    <Cell fill="#de1a24" />
                                </Pie>
                                <Legend verticalAlign="top" height={1} />
                                <Tooltip
                                    itemStyle={{ color: 'white', fontSize: '16px' }} // Customize item style
                                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '5px', padding: '10px' }} // Customize tooltip content style
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <h3 className="mb-4">Product Overview</h3>
                        <ResponsiveContainer width="100%" height={600}>
                            {/* OBJECT.ENTRIES WILL CONVERT THE OBJECT INTO ARRAY OF OBJECTS IF THERE ARE 8 KEY VALUE PAIRS INSIDE AN OBJECT THEN THERE WILL BE 8 ARRAYS  */}
                            <BarChart data={Object.entries(countCategory).map(([name, value]) => ({ categoryName: name, count: value }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="categoryName" />
                                <YAxis dataKey="count" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>

            </Container>

            <Footer />
        </div>
    )
}

export default AdminPanel
