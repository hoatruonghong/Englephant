import React, { useContext, useState } from "react";
import Header from "./../components/layout/Header";
import Dashboard from "./../components/layout/tutor/Dashboard";
import "./../styles/tutorPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoForm from "./../components/tutor/InfoForm";
import Chart from "./../components/tutor/Chart";
import WorkCalendar from "./../components/tutor/WorkCalendar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Tutor = () => {
  const {
    authState: { 
      authLoading, 
      isAuthenticated,
      user
    },
  } = useContext(AuthContext);
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  console.log("check",authLoading, isAuthenticated);
  // useEffect(()=>{
  //   if(!isAuthenticated) return navigate("/");
  // }, [isAuthenticated])
  if(!isAuthenticated) return navigate("/");

  const goButtonHandle = () => {
    const path = `talkroom/${user._id}`;
    return navigate(path);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="tutorContainer">
      <Header />
      <Container>
        <Row className="mainContainer">
          <Col sm="3">
            <Dashboard />
          </Col>
          {/* Main view */}
          <Col sm="9">
            <Row>
              {/* Edit personal information */}
              <Col sm="6" className="areaWrap">
                <Row>
                  <Col sm="12">
                    <h2 className="titleText">Personal information</h2>
                  </Col>                  
                </Row>
                <div className="infoWrap">
                  <InfoForm />
                </div>
              </Col>

              {/* Edit and view worktime */}
              <Col sm="6" className="areaWrap">
                <h2 className="titleText">Work time</h2>
                <div className="infoWrap">
                  <Chart
                    radius={120}
                    strokeWidth={30}
                    duration={500}
                    percentage={75}
                  />
                  <Row>
                    <Col>
                      <p>Total</p>
                      <p>Finished</p>
                      <p>Left</p>
                    </Col>
                    <Col>
                      <p>8 hrs</p>
                      <p>6 hrs</p>
                      <p>2 hrs</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              {/* Edit worktime calendar */}
              <Col>
                <Row>
                  <Col sm="10">
                    <h2 className="titleText">Work time registeration</h2>
                  </Col>
                  <Col sm='2'>
                    <FontAwesomeIcon icon="fa-solid fa-pen" onClick={handleShow}/>
                  </Col>
                </Row>
                <div className="infoWrap">
                  <WorkCalendar />
                </div>
              </Col>
              {/* Go to talkroom */}
              <Col>
                <h2 className="titleText">Communication Room</h2>                
                <button
                  className="joinButton" 
                  onClick={goButtonHandle}
                >
                  GO
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Workshift register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="data"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>StartTime</Form.Label>
              <Form.Control
                type="text"
                placeholder="data"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>EndTime</Form.Label>
              <Form.Control
                type="text"
                placeholder="data"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Tutor;
