import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Validation from "./Loginvalidation";
import users from "./Users"; // Import the users array1!
import DataContext from "./usedb";

const Login = () => {
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setCurrentAge, setCurrentImage, setCurrentName} = useContext(DataContext)
  const history = useHistory();


  
  

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(email , password);
    console.log("error is " + err.email + err.password);
   
    if (Object.keys(err).length > 0){
      setErrors(err);
    }
    else {
      if (Array.isArray(users)){
          const matchedUser = users.find(
              (user) => user.email === email && user.password === password
            );
            if (matchedUser) {
              console.log("Logged in as", matchedUser.name);
              window.localStorage.setItem('IS_LOGGED_IN', true);
                window.localStorage.setItem('CURRENT_USER', JSON.stringify(matchedUser))
              setCurrentName( matchedUser.name);
              setCurrentImage(matchedUser.image);
              setCurrentAge(matchedUser.age);
              history.push("/"); // Redirect to cart page if the user is authenticated
            } else {
              setErrors({ email: "Incorrect email or password" });
            }
          };
    }

    }
   

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 blackbackground">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              name="email"
              onChange={ (event)=> setEmail(event.target.value)}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              name="password"
              onChange={(event)=> setPassword(event.target.value)}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
            
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Log in</strong>{" "}
          </button>
          <p>By logged in you are agree to our terms and policies</p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            {" "}
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
