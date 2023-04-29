import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Validation from "./Signupvalidation";
import users from "./Users"; // Import the users array


function Signup ({ onSignup }) {

    const history = useHistory();

    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     password: ''
    // });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [errors, setErrors] = useState({});

    // const handleInput = (event) => {
    //     setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(name, email, password);
        if (Object.keys(err).length > 0){
            setErrors(err);
            console.log(err);
        }
        else {

            const newUser = {
                name: name,
                email: email,
                password: password
            };
            if (Array.isArray(users)){
                users.push(newUser);
                /*onSignup(newUser);
                */
                //setValues({ name: "", email: "", password: "" });
                setEmail("");
                setName("");
                setPassword("");
                history.push("/login");

            }
    }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center  vh-100 blackbackground">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" name='name' value={name}
                            onChange={(event)=> setName(event.target.value)} className="form-control rounded-0" />
                        {errors.name && <span className="text-danger"> {errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name='email' value={email}
                            onChange={ (event)=> setEmail(event.target.value)} className="form-control rounded-0" />
                        {errors.email && <span className="text-danger"> {errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name='password' value={password}
                            onChange={(event)=> setPassword(event.target.value)} className="form-control rounded-0" />
                        {errors.password && <span className="text-danger"> {errors.password}</span>}
                    </div>
                    <button type='submit' className="btn btn-success w-100"><strong>Sign up</strong> </button>
                    <p> You are agree to our terms and policies</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"> Log in</Link>

                </form>
            </div>
        </div>
    )
}

export default Signup;
