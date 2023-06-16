import React from "react";
import { useHistory } from "react-router-dom";



   


const Logout = () => {
    const history = useHistory();
    const handleLogout = (event) => {
      window.localStorage.setItem('IS_LOGGED_IN', false);
      window.localStorage.setItem('CURRENT_USER', null);
      history.push("/");
      
      }
  return (
    <button onClick={handleLogout} className="btn btn-primary">
    </button>
  );
};

export default Logout;