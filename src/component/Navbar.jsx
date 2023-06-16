import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from './Logo';
import DataContext from "./usedb";
import { updateReco } from '../databaseAPI';


const Navbar = () => {
  
    const state = useSelector((state)=> state.handleCart)
    const isLoggedIn = JSON.parse(window.localStorage.getItem('IS_LOGGED_IN'));
    const { currentName } = useContext(DataContext)
    const history = useHistory();
    function handleLogout() {
      updateReco();
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout){
        window.localStorage.setItem('IS_LOGGED_IN', false);
        window.localStorage.setItem('CURRENT_USER', null);
        // Redirect to the home page
        history.push('/');
      }
    }

  return (
    
    <div>
      
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
      <Logo />
        <div className="container">
          
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
            {isLoggedIn ? (
                <>
                  <NavLink to="/profile"   className="btn btn-outline-dark ">
                    <i className="fa fa-sign-in me-1"></i> Hello {currentName} !    
                  </NavLink>
                  
                  <NavLink to="/cart" className="btn btn-outline-dark ms-2">  
                    <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
                  </NavLink>
                  <NavLink to="/" activeClassName="active" onClick={handleLogout} className="btn btn-outline-dark">
                  <i className="fa fa-sign-in me-1"></i> Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/Login" className="btn btn-outline-dark">
                    <i className="fa fa-sign-in me-1"></i> Login
                  </NavLink>
                  <NavLink to="/Signup" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </NavLink>
                  <NavLink to={"#"} className="btn btn-outline-dark ms-2" onClick={() => {alert("Please log in to view your cart.");  }}>
                     <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;