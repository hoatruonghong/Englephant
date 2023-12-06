import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./../../styles/tutorPage.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TimeCounter(props) {
    const [timer, countdown] = useState(props.time);//s
    const [timerContent, setTimerContent] = useState(Math.floor(timer / 60)+":"+timer % 60);

    useEffect(() => {
        const interval = setInterval(() => {
        startTimer();
        }, 1000);
        return () => clearInterval(interval);
    });

    function startTimer() {
        countdown(timer - 1);
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        if (timer < 0) {
        setTimerContent("00:00");
        return;
        }        
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
        seconds = "0" + seconds;
        }

        setTimerContent(minutes + ":" + seconds);
    }
    return (
        <Container className="timeContainer">
            <Row>
            <Col className="icon-clock" xs="6" sm="3" md="5">
            <FontAwesomeIcon icon="fa-solid fa-clock" color="#10401B" />
            </Col>
            <Col className="timer" xs="6" sm="8" md="7">
            {timerContent}
            </Col>
            </Row>
        </Container>
    );
}

export default TimeCounter;
