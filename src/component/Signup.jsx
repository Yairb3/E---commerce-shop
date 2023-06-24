import React, { useState, useContext } from "react";
import DataContext from "./usedb";
import { Link, useHistory } from "react-router-dom";
import Validation from "./Signupvalidation";
import { add_user } from "../databaseAPI";

function Signup ({ onSignup }) {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const [age, setAge] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [phone, setPhone] = useState(""); // New phone state
    const { users, setUsers } = useContext(DataContext);

    function handleImageChange(event) {
        const image = event.target.files[0];
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.addEventListener('load', () => {
            setImage(reader.result);
          })
        }
      }


    const handleSubmit = (event) => {
        event.preventDefault();
        
        const err = Validation(name, email, password,age, location);
        if (!image){
            err.image = "Please upload a profile image"
        }
        if (Object.keys(err).length > 0){
            setErrors(err);
            console.log(err);
        }
        else {
            const newUser = {
                products: 1,
                location: location,
                name: name,
                email: email,
                password: password,
                age: age,
                phone: phone,
                image: image
            };
            if (Array.isArray(users)){
                add_user(newUser)
                setUsers(users.push(newUser));
                setEmail("");
                setName("");
                setPassword("");
                setPhone("");
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
                        <label htmlFor="name"><strong>Location</strong></label>
                        <input type="text" placeholder="Enter your location" value={location}
                            onChange={(event)=> setLocation(event.target.value)} className="form-control rounded-0" />
                        {errors.location && <span className="text-danger"> {errors.name}</span>}
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
                    <div className="mb-3">
                        <label htmlFor="phone"><strong>Phone Number</strong></label>
                        <input
                            type="tel"
                            placeholder="Enter Phone Number"
                            name="phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            className="form-control rounded-0"
                        />
                        {errors.phone && <span className="text-danger"> {errors.phone}</span>}
                        </div>
                    <div className="mb-3">
                        <label htmlFor="age"><strong>Age</strong></label>
                        <input type="number" placeholder="Enter Age" name="age" value={age} onChange={(event) => setAge(event.target.value)} className="form-control rounded-0" />
                        {errors.age && <span className="text-danger"> {errors.age}</span>}
                    </div>
                    <label htmlFor="image">
                        <b>Upload Profile Image</b>
                    </label>
                    <input
                        type="file"
                        className="filetype"
                        id="group_image"
                        name="image"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={handleImageChange}
                        
                    />
                    {errors.image && <span className="text-danger"> {errors.image}</span>}
                    <button type='submit' className="btn btn-success w-100"><strong>Sign up</strong> </button>
                    <p> You are agree to our terms and policies</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"> Log in</Link>

                </form>
            </div>
        </div>
    )
}

export default Signup;