import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ShowAlert from '../Components/ShowAlert';
import { useNavigate } from 'react-router-dom';


const Feedback = () => {

  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const [toggleAlert, setToggleAlert] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')


  async function submitFeedback() {
    try {
      const token = localStorage.getItem('token')
      const data = { feedback }
      const response = await axios.post('http://localhost:4000/api/v1/userFeedback', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response) {
        setToggleAlert(true)
        setSuccessMsg('Feedback received successfully!!')
      }
      else {
        setToggleAlert(false)
      }
    } catch (error) {
      navigate('/Login')
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: '1' }}>
        <Container className='mt-3'>
          <Row>
            <Col>
              <Card className="p-4 mx-auto" style={{ width: "60%", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                <h2>Feedback</h2>
                {
                  toggleAlert === true ? (
                    <ShowAlert variant='success' message={successMsg} />
                  ) : null
                }

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingEmail" label="Feedback">
                    <Form.Control as='textarea' placeholder="Feedback" value={feedback} onChange={(e) => { setFeedback(e.target.value) }} />
                  </FloatingLabel>
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: "center" }}>
                  <Button style={{ width: "25%", display: "flex", justifyContent: "center" }} variant="primary" size="lg" onClick={submitFeedback}>Submit</Button>
                </div>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default Feedback
