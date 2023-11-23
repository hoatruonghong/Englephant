import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import './../../styles/header.css'
import EnglephantLogo from './../../assets/images/mascot-logo.svg'

const Header = () => {
  return (
    <Navbar expand='lg' variant='dark' className='shadow headerContainer'>
        <img
			src={EnglephantLogo}
			alt='EnglephantLogo'
			width='50'
			height='50'
			className='mr-2'
		/>
        <a href="logout" className='logoutBtn'>Log out</a>
    </Navbar>
  )
}

export default Header