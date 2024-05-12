import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Success = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: "CLEAR_CART"
        })
    }, [])

    return (
        <div className="success-container">
            <div className="success-icon">
                <FontAwesomeIcon icon={faCheckCircle} size="5x" color="#32CD32" />
            </div>
            <h2 className="success-heading">Payment Successful!</h2>
            <p className="success-message">Thank you for your purchase. Your order has been successfully processed.</p>
            <Link to={'/'}>
                <button className="continue-shopping-btn">Continue Shopping</button>
            </Link>
        </div>
    );
}

export default Success;
