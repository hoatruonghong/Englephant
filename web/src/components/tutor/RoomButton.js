import React from 'react'
import "./../../styles/tutorPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CamButton(props) {
  return (
    <button onClick={props.onClick}>
    <FontAwesomeIcon icon="fa-solid fa-video" className="btn white-btn"  style={{
      borderRadius: '50%',      
    }}/>
    </button>
  )
}
export function EndButton(props) {
  return (
    <button onClick={props.onClick}>
    <FontAwesomeIcon icon="fa-solid fa-phone-slash" className="btn red-btn"  style={{
      borderRadius: '50%',      
    }}/>
    </button>
  )
}
export function MicButton(props) {
  return (
    <button onClick={props.onClick}>
    <FontAwesomeIcon icon="fa-solid fa-microphone" className="btn white-btn"  style={{
      borderRadius: '50%',      
    }}/>
    </button>
  )
}
