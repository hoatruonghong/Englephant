import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./../../styles/formTutor.css";

const InfoForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control className="inputLine" type="email" placeholder="FullName" value="Jane Horris" />
                <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Container fluid>
                <Row>
                    <Col style={{padding:0, paddingRight: 5}}><Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Age" value="28" />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group></Col>
                    <Col style={{padding:0, paddingLeft: 5}}><Form.Group className="mb-3" controlId="formBasicNation">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control type="email" placeholder="Nationality" value="America"/>
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group></Col>
                </Row>
            </Container>
            <Form.Group className="mb-3" controlId="formBasicIntroduction">
                <Form.Label>Introduction</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    value="Nice to see you. I'm glad to help you with English."
                />
            </Form.Group>
            <button className="updateBtn" type="submit">
                Update
            </button>            
        </Form>
    );
}

export default InfoForm