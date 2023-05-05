import React from 'react';
const Contact = () => {




    return (
        <div className="container blackbackground">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div className="topic">Address</div>
              <div className="text-one">Gergo Wise, Tel Aviv</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div className="topic">Phone</div>
              <div className="text-one">0543267377</div>
              <div className="text-two">+0096 3434 5678</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope"></i>
              <div className="topic">Email</div>
              <div className="text-one">yuvalramati@gmail.com</div>
              <div className="text-one">yairbenmichael@gmail.com</div>
              <div className="text-one">roeenegri@gmail.com</div>
              <div className="text-one">yuvalleibovich@gmail.com</div>
              <div className="text-one">shaharblitzer@gmail.com</div>
              
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Enter your name"></input>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your email"></input>
            </div>
            <div className="input-box message-box">
              
            </div>
            <div className="button">
              <input type="button" value="Send Now" ></input>
            </div>
          </form>
        </div>
        </div>
      </div>
    )


}




export default Contact;
