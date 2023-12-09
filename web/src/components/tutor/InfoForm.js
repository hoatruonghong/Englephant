import React from 'react'
import Button from 'react-bootstrap/Button';
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
                <Form.Control className="inputLine" type="email" placeholder="FullName" />
                <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Container fluid>
                <Row>
                    <Col><Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="email" placeholder="FullName" />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group></Col>
                    <Col><Form.Group className="mb-3" controlId="formBasicNation">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control type="email" placeholder="FullName" />
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
                />
            </Form.Group>
            
            <Button variant="primary" className="updateBtn" type="submit">
                Update
            </Button>
        </Form>
    );
}

export default InfoForm