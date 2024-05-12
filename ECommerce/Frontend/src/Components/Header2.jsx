import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header2 = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState(false)

    function clearCart() {
        dispatch({
            type: 'CLEAR_CART'
        })
    }

    function checkLoginStatus() {
        const token = localStorage.getItem('token')
        if (token && token !== null) {
            setLogin(true)
        }
        else {
            setLogin(false)
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('token')
        const response = await axios.get('http://localhost:4000/api/v1/logoutUser')
        if (response) {
            navigate('/');
            clearCart()
        }
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <div>
            <Navbar className="main white nav-margins" expand="lg" style={{ maxHeight: "9VH" }}>
                <Container fluid>
                    <Navbar.Brand href="#home" style={{ display: 'flex', alignItems: "center" }}>
                        <img
                            src="/images/shopping-bags.png"
                            width="40px"
                            height="40px"
                            style={{ marginBottom: "10px" }}
                            className="d-inline-block align-top"
                        />
                        <span style={{ padding: "10px 0px 10px 10px", fontSize: "1.5rem", fontWeight: "500" }}>ShopSmart</span>
                    </Navbar.Brand>
                    <Nav className="mx-auto parent">

                        {
                            login === true && (
                                <>
                                    <Nav.Link>
                                        <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/AdminPanel">
                                            Dashboard
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/OrderList">
                                            Orders
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/Users">
                                            Users
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/AddProducts">
                                            Add Products
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/Products">
                                            View Products
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/ViewFeedback">
                                            User Feedback
                                        </Link>
                                    </Nav.Link>
                                </>
                            )
                        }

                    </Nav>

                    {
                        login === true && (
                            <Button size='lg' variant="danger" style={{ marginRight: "10px" }} onClick={handleLogout} className="logout-btn">Logout</Button>
                        )
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default Header2



