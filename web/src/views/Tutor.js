import React from 'react'
import Header from './../components/layout/Header';
import Dashboard from './../components/layout/tutor/Dashboard';
import './../styles/tutorPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfoForm from './../components/tutor/InfoForm';
// import Chart from './../components/tutor/Chart';

const Tutor = () => {
  return (
    <div className='tutorContainer'>
    <Header />
    <Container>
      <Row className='mainContainer'>
      <Col sm="3">
        <Dashboard />      
      </Col>
      {/* Main view */}
      <Col sm="9">
        <Row>
          {/* Edit personal information */}
          <Col sm="6" className="areaWrap">
            <Row>
            <Col sm="8"><h2 className='titleText'>Personal information</h2></Col>
            <Col sm="4"><FontAwesomeIcon icon="fa-solid fa-pen" color="#397624"/></Col>
            </Row>
            <div className='infoWrap'>
            <InfoForm/>
            </div>
          </Col>

          {/* Edit and view worktime */}
          <Col sm="6" className="areaWrap">
            <h2 className='titleText'>Work time</h2>
            <div className='infoWrap'>
              {/* <Chart /> */}
            </div>

          </Col>
        </Row>
        <Row>
          {/* Edit worktime calendar */}
          <Col>
            <Row>
              <Col sm="8"><h2 className='titleText'>Work time registeration</h2></Col>
              <Col sm="4"><FontAwesomeIcon icon="fa-solid fa-pen" color="#397624"/></Col>
            </Row>
            <div className='infoWrap'>update</div>
          </Col>
          {/* Go to talkroom */}
          <Col>
          <h2 className='titleText'>Communication Room</h2>
          <div className='goBtn'>
            <a href='#join-room' className='btnText'>GO</a>
          </div>
          </Col>
        </Row>
      </Col>
      </Row>      
    </Container>
  </div>
  )
}

export default Tutor