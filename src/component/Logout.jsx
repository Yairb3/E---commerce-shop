import React, { useState, useContext } from "react";
import DataContext from "./usedb";
import { Link, useHistory } from "react-router-dom";



   


const Logout = () => {
    const history = useHistory();

    const { isLoggedIn, setIsLoggedIn,currentUser, setCurrentUser} = useContext(DataContext)

    const handleLogout = (event) => {
    isLoggedIn=false;
    history.push("/");

        }
  return (
    <button onClick={handleLogout} className="btn btn-primary">
    </button>
  );
};

export default Logout;