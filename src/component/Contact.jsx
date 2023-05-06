import React from 'react';
import './Contact.css';
const Contact = () => {




    return (
      <div class="containerr">
      <div class="content">
        <div class="left-side">
          <div class="address details">
            <i class="fas fa-map-marker-alt"></i>
            <div class="topic">Address</div>
            <div class="text-one">George Wise, Tel Aviv</div>
          </div>
          <div class="phone details">
            <i class="fas fa-phone-alt"></i>
            <div class="topic">Phone</div>
            <div class="text-one">0543267377</div>
          </div>
          <div class="email details">
            <div class="topic">Email</div>
            <div class="text-one">yuval.leibovici@gmail.com</div>
          </div>
        </div>
        <div class="right-side">
          <div class="topic-text">Send us a message</div>
          <p>It's our pleasure to help you!</p>
        <form action="#">
          <div class="input-box">
            <input type="text" placeholder="Enter your name"></input>
          </div>
          <div class="input-box">
            <input type="text" placeholder="Enter your email"></input>
          </div>
          <div class="input-box message-box">
            
          </div>
          <div class="button">
            <input type="button" value="Send Now" ></input>
          </div>
        </form>
      </div>
      </div>
    </div>
    )


}




export default Contact;
