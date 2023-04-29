import React from "react";
import background from '../images/image.jpg';


const Home = () => {
  return (
    <div className="hero">
      
      <div className="card  text-white border-0">
        <img src={background} className="card-img" alt="Background" height="450px" />
        <div className=" card-img-overlay d-flex flex-column justify-content-center">
            <div className="container">
          <h5 className="responsive-container-block bigContainercard-title display-3 fw-bolder mb-0">Welcome to the best<br></br> second 
          hand selling platform!</h5>
          <p className="card-text lead fs-2">
            CHECK OUT ALL THE TRENDS
          </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
