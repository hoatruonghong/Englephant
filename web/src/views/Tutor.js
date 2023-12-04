import React from "react";
import Header from "./../components/layout/Header";
import Dashboard from "./../components/layout/tutor/Dashboard";
import "./../styles/tutorPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoForm from "./../components/tutor/InfoForm";
import Chart from "./../components/tutor/Chart";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import WorkCalendar from './../components/tutor/WorkCalendar';

const Tutor = () => {
  let navigate = useNavigate();
  const goButtonHandle = () => {
    const path = "talkroom";
    navigate(path);
  };

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
                  {/* <Col sm="4">
                    <FontAwesomeIcon icon="fa-solid fa-pen" color="#397624" />
                  </Col> */}
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
                  <Col sm="12">
                    <h2 className="titleText">Work time registeration</h2>
                  </Col>
                  {/* <Col sm="4">
                    <FontAwesomeIcon icon="fa-solid fa-pen" color="#397624" />
                  </Col> */}
                </Row>
                <div className="infoWrap">
                  <WorkCalendar />
                </div>
              </Col>
              {/* Go to talkroom */}
              <Col>
                <h2 className="titleText">Communication Room</h2>
                <Button
                  className="goBtn"
                  variant="primary"
                  onClick={goButtonHandle}
                >
                  GO
                </Button>
                {""}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tutor;
