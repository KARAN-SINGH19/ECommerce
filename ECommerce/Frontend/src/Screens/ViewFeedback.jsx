import React, { useEffect, useState } from 'react';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewFeedback = () => {

    const [feedbacks, setFeedbacks] = useState([])

    async function getFeedback() {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:4000/api/v1/fetchFeedback', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                console.log(response.data)
                setFeedbacks(response.data.feedbackList)

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeedback()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: '1' }}>
                <Container className='mt-3'>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>SNO</th>
                                        <th>USER</th>
                                        <th>FEEDBACK</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.map((feedback, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{feedback.user}</td>
                                            <td>{feedback.feedback}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div >
    )
}

export default ViewFeedback
