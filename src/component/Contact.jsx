import React from 'react';
const Contact = () => {




    return (
        <div class="container blackbackground">
        <div class="content">
          <div class="left-side">
            <div class="address details">
              <i class="fas fa-map-marker-alt"></i>
              <div class="topic">Address</div>
              <div class="text-one">Gergo Wise, Tel Aviv</div>
            </div>
            <div class="phone details">
              <i class="fas fa-phone-alt"></i>
              <div class="topic">Phone</div>
              <div class="text-one">0543267377</div>
              <div class="text-two">+0096 3434 5678</div>
            </div>
            <div class="email details">
              <i class="fas fa-envelope"></i>
              <div class="topic">Email</div>
              <div class="text-one">yuvalramati@gmail.com</div>
              <div class="text-one">yairbenmichael@gmail.com</div>
              <div class="text-one">roeenegri@gmail.com</div>
              <div class="text-one">yuvalleibovich@gmail.com</div>
              <div class="text-one">shaharblitzer@gmail.com</div>
              
            </div>
          </div>
          <div class="right-side">
            <div class="topic-text">Send us a message</div>
            <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>
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
