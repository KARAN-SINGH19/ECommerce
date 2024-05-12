import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.custom.cartItems)
    const countOfItems = cartItems.length
    const [toggleLoginLogout, setToggleLoginLogout] = useState(false)


    function clearCart() {
        dispatch({
            type: 'CLEAR_CART'
        })
    }

    const checkLoginStatus = async () => {
        const token = localStorage.getItem('token')
        if (token && token !== 'null') {
            setToggleLoginLogout(true)
        }
        else {
            setToggleLoginLogout(false)
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('token')
        const response = await axios.get('http://localhost:4000/api/v1/logoutUser');
        if (response) {
            navigate('/');
            checkLoginStatus()
            clearCart()
        }
    };

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <Navbar className="main white nav-margins" expand="lg" style={{ maxHeight: "9VH" }}>
            <Container fluid>
                <Navbar.Brand style={{ display: 'flex', alignItems: "center" }}>
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
                        toggleLoginLogout === true && (
                            <>
                                <Nav.Link>
                                    <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/">
                                        Home
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/Orders">
                                        Orders
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/Profile">
                                        Profile
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link className="nav-link" style={{ paddingTop: "10px", fontSize: "1.2rem" }} to="/Feedback">
                                        Feedback
                                    </Link>
                                </Nav.Link>
                            </>
                        )
                    }
                </Nav>
                {
                    toggleLoginLogout === true ? (
                        <>
                            <Button size='lg' variant="danger" style={{ marginRight: "10px" }} onClick={handleLogout} className="logout-btn">Logout</Button>
                        </>
                    ) : (
                        <Link to={'/Login'}>
                            <Button size='lg' variant="primary" style={{ marginRight: "10px" }} className="logout-btn">Login</Button>
                        </Link>
                    )
                }
                <Link to="/Cart" className="nav-link" style={{ marginRight: "10px" }}>
                    <FaShoppingCart size={45} color="black" />
                    {
                        countOfItems > 0 ? (
                            <span style={{ position: 'absolute', top: '2px', right: '12px', backgroundColor: 'red', borderRadius: '50%', color: 'white', padding: '2px 10px', fontSize: '1rem' }}>{cartItems.length}</span>
                        ) : null
                    }
                </Link>
            </Container>
        </Navbar>
    );
};

export default Header;


