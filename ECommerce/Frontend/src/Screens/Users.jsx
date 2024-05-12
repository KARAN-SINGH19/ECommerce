import React, { useEffect, useState } from 'react';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {

    const [users, getUsers] = useState([])
    const navigate = useNavigate()

    async function getUserDetails() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:4000/api/v1/getUsers", {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token to the Authorization header
                }
            })
            if (response) {
                console.log(response.data.result)
                getUsers(response.data.result)
            }
        } catch (error) {
            console.log(error)
            navigate('/Login')
        }
    }

    useEffect(() => {
        getUserDetails()
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
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ROLE</th>
                                        <th>AGE</th>
                                        <th>USER ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.age}</td>
                                            <td>{user._id}</td>
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

export default Users
