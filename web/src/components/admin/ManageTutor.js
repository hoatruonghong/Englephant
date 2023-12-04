import React from "react";
import { useState } from "react";
import "../../styles/adminPage.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddTutorModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm chuyên viên giao tiếp
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Tên tài khoản" required />            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" required />            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Số điện thoại"  required/>            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBornYear">
            <Form.Label>Year of Birth</Form.Label>
            <Form.Control type="text" placeholder="Năm sinh"  required/>            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNation">
            <Form.Label>Nationality</Form.Label>
            <Form.Control type="text" placeholder="Quốc tịch" required/>            
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const ManageTutor = () => {
  const [modalShow, setModalShow] = useState(false);

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="bodyContainer">
        <div className="buttonView">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Thêm chuyên viên
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Tuổi</th>
              <th>Quốc tịch</th>
              <th>Đánh giá</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>mark@gmail.com</td>
              <td>35</td>
              <td>American</td>
              <td>4.7</td>
              <td>Xóa</td>
            </tr>
          </tbody>
        </Table>
        <div>
          <Pagination>{items}</Pagination>
        </div>

        <AddTutorModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default ManageTutor;
