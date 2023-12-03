import React from "react";
import Header from "./../components/layout/Header";
import Dashboard from "./../components/layout/tutor/Dashboard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ManageTutor from './../components/admin/ManageTutor';
import "./../styles/adminPage.css";

const Admin = ({ adminRoute }) => {
  let body;

  body = <>{adminRoute === "manage-tutor" && <ManageTutor />}</>;
  return (
    <div className="adminContainer">
      <Header />
      <Container>
        <Row className="mainContainer">
          <Col sm="3">
            <Dashboard />
          </Col>
          <Col sm="9">
            {body}
          </Col>
          </Row>
      </Container>
    </div>
  );
};

export default Admin;
