import React from 'react';
// import Tilt from 'react-tilt'; 
import Tilt from 'react-parallax-tilt';
import logo from '../images/nice2have.jpeg';
//import './Logo.css';
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    
      <div className='ma4 mt4'>
    <NavLink className="navbar-brand fw-bold fs-4" to="/">
      <Tilt className="Tilt br2 " options={{ max : 55 }} style={{ height: 70, width: 190 }} >
        <div className="Tilt-inner pa3">
          <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='logo' src={logo}/>
        </div>
      </Tilt>
    </NavLink> 
  </div>
  );
}

export default Logo;