import React from 'react'
import "./../../styles/tutorPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CamButton() {
  return (
    <FontAwesomeIcon icon="fa-solid fa-video" className="btn white-btn"  style={{
      borderRadius: '50%',      
    }}/>
    // <div className="btn white-btn" style={{
    //   borderRadius: '50%',
    // }}><FontAwesomeIcon icon="fa-solid fa-video" /></div>
  )
}
export function EndButton() {
  return (
    <FontAwesomeIcon icon="fa-solid fa-phone-slash" className="btn red-btn"  style={{
      borderRadius: '50%',      
    }}/>
  )
}
export function MicButton() {
  return (
    <FontAwesomeIcon icon="fa-solid fa-microphone" className="btn white-btn"  style={{
      borderRadius: '50%',      
    }}/>
    // <div className="btn white-btn" style={{
    //   borderRadius: '50%',
    // }}><FontAwesomeIcon icon="fa-solid fa-microphone" /></div>
  )
}
