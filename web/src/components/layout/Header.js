import React, { useContext } from "react";
import Navbar from 'react-bootstrap/Navbar'
import './../../styles/header.css'
import EnglephantLogo from './../../assets/images/mascot-logo.svg'
import { AuthContext } from "./../../contexts/AuthContext";
import Button from 'react-bootstrap/Button';

const Header = () => {
  	const {
		logoutUser
	} = useContext(AuthContext)

	const logout = () => logoutUser()
	return (
		<Navbar expand='lg' variant='dark' className='shadow headerContainer'>
			<img
				src={EnglephantLogo}
				alt='EnglephantLogo'
				width='50'
				height='50'
				className='mr-2'
			/>
			<Button variant="link" className='logoutBtn' onClick={logout}>Logout</Button>
		</Navbar>
  	)
}

export default Header