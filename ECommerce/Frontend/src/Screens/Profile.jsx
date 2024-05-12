import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ShowAlert from '../Components/ShowAlert';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate()

    //Toggle Alert Visibility
    const [successAlert, setSuccessAlert] = useState(false)
    const [successAlert2, setSuccessAlert2] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    // NEW SHIPPING DETAILS
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [pinCode, setPinCode] = useState('')

    // EXISTING SHIPPING DETAILS
    const [oldAddress, setOldAddress] = useState('')
    const [oldCity, setOldCity] = useState('')
    const [oldState, setOldState] = useState('')
    const [oldPhoneNo, setOldPhoneNo] = useState('')
    const [oldPinCode, setOldPinCode] = useState('')


    // NEW USER DETAILS
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')

    // EXISTING USER DETAILS
    const [oldName, setOldName] = useState('')
    const [oldAge, setOldAge] = useState('')
    const [oldEmail, setOldEmail] = useState('')

    // CREATING NEW USER PROFILE DATA FOR USER
    let newUserData = {
        name: name !== "" ? name : oldName,
        email: email !== "" ? email : oldEmail,
        age: age !== "" ? age : oldAge
    };


    // CREATING NEW SHIPPING DETAILS FOR THE USER
    let newShippingDetails = {
        address: address !== '' ? address : oldAddress,
        city: city !== '' ? city : oldCity,
        state: state !== '' ? state : oldState,
        phoneNo: phoneNo !== '' ? phoneNo : oldPhoneNo,
        pinCode: pinCode !== '' ? pinCode : oldPinCode
    }

    // UPDATING THE USER DETAILS
    async function updateUserDetails() {
        try {
            const token = localStorage.getItem('token');
            console.log(newUserData)
            const response = await axios.post("http://localhost:4000/api/v1/updateUserDetails", newUserData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response) {
                setName('')
                setAge('')
                setEmail('')
                setSuccessAlert(true)
                setSuccessMsg('Details updated sucessfully!!')
            }
            else {
                setSuccessAlert(false)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    //UPDATING SHIPPING DETAILS
    async function updateShippingDetails() {
        try {
            const token = localStorage.getItem('token');
            console.log(newShippingDetails)
            const response = axios.put("http://localhost:4000/api/v1/updateShippingDetails", newShippingDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                setAddress('')
                setCity('')
                setState('')
                setPhoneNo('')
                setPinCode('')
                setSuccessAlert2(true)
                setSuccessMsg('Details updated sucessfully!!')
            }
            else {
                setSuccessAlert(false)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    // RETRIEVING THE USER DETAILS (EXISTING DETAILS)
    async function getExistingDetails() {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:4000/api/v1/getUserDetails", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                setOldName(response.data.user.name)
                setOldAge(response.data.user.age)
                setOldEmail(response.data.user.email)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    // RETRIEVING THE SHIPPING DETAILS (EXISTING DETAILS)
    async function getShippingDetails() {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:4000/api/v1/getShippingdetails", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                setOldAddress(response.data.details.shippingAddress.address)
                setOldCity(response.data.details.shippingAddress.city)
                setOldState(response.data.details.shippingAddress.state)
                setOldPhoneNo(response.data.details.shippingAddress.phoneNo)
                setOldPinCode(response.data.details.shippingAddress.pinCode)
            }
        } catch (error) {
            navigate('/Login')
        }
    }

    // CALL THE FUNCTIONS ON PAGE RELOAD
    useEffect(() => {
        getExistingDetails()
        getShippingDetails()
    }, [])


    return (
        <div>
            <Header />
            <Container className="mt-5 mb-5 rounded">
                <Row>

                    <Col md={1} style={{ marginBottom: "50px" }}>
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-2"
                                width="150px"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                alt="User Avatar"
                            />
                            <span className="font-weight-bold" style={{ fontWeight: 'normal', textAlign: 'center', color: '#555', whiteSpace: "nowrap" }}>John Doe</span>
                            <span style={{ fontWeight: 'normal', textAlign: 'center', color: '#555' }}>john@example.com</span>
                        </div>
                    </Col>

                    <Col md={5}>
                        <div className="p-3 py-5">
                            <div>
                                <h4 className='heading1' style={{ textTransform: 'uppercase', textAlign: 'center' }}>Update Profile</h4>
                            </div>
                            {
                                successAlert === true ? (
                                    <ShowAlert variant='success' message={successMsg} />
                                ) : null
                            }
                            <Form style={{ marginLeft: '30px' }} onSubmit={(e) => { e.preventDefault(); updateUserDetails(); }}>
                                <div className="input-field mt-2">
                                    <i className="fas fa-user" style={{ position: 'absolute', top: '35%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                    <i className="fas fa-user" style={{ position: 'absolute', top: '35%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="text" placeholder="Age" value={age} onChange={(e) => { setAge(e.target.value) }} />
                                    <i className="fas fa-envelope" style={{ position: 'absolute', top: '38%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    <div className='mt-3' style={{ display: "flex", justifyContent: "center" }}>
                                        <Button size='lg' variant="primary" className="profile-button" type="submit">
                                            <i className="fas fa-save"></i> Update Profile
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="p-3 py-5">
                            <div>
                                <h4 className='heading2' style={{ textTransform: 'uppercase', textAlign: 'center' }}>Update Shipping Details</h4>
                            </div>
                            {
                                successAlert2 === true ? (
                                    <ShowAlert variant='success' message={successMsg} />
                                ) : null
                            }
                            <Form style={{ marginLeft: '30px' }} onSubmit={(e) => { e.preventDefault(); updateShippingDetails(); }} >
                                <div className="input-field">
                                    <i className="fas fa-user" style={{ position: 'absolute', top: '35%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="text" placeholder="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                    <i className="fas fa-user" style={{ position: 'absolute', top: '35%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="text" placeholder="City" value={city} onChange={(e) => { setCity(e.target.value) }} />
                                    <i className="fas fa-envelope" style={{ position: 'absolute', top: '38%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="text" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} />
                                    <i className="fas fa-envelope" style={{ position: 'absolute', top: '38%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="number" placeholder="Phone Number" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
                                    <i className="fas fa-envelope" style={{ position: 'absolute', top: '38%', marginLeft: '5px', color: 'white' }}></i>
                                    <Form.Control className='mt-3' type="number" placeholder="Pin Code" value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} />
                                    <div className='mt-3' style={{ display: "flex", justifyContent: "center" }}>
                                        <Button size='lg' variant="primary" className="profile-button" type="submit">
                                            <i className="fas fa-save"></i> Update Details
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Col>

                </Row>
            </Container>
            <Footer />
        </div >
    );
}

export default Profile;
