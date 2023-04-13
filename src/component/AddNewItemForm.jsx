import React, { useContext } from "react";
import "../App.css";
import DataContext from "./usedb";



const AddNewItemForm = (id) => {
    const {data, setData, userIdToProducts, productIdToUser} = useContext(DataContext)
    const closeForm = () => {
        document.getElementById("myForm").style.display = "none";
      }
    return (
        <div class="form-popup" id="myForm">
  <form action="/action_page.php" class="form-container">
    <h1>Add New Item</h1>
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required />

    <label for="psw"><b>Upload Image</b></label>
    <input type="file" className="filetype" id="group_image" accept="image/x-png,image/gif,image/jpeg"/>
    <label for="psw"><b>Item Description</b></label>
    <textarea rows="4" cols="50" name="comment" form="usrform" placeholder="Enter Your Description Here" />
    <label for="psw"><b>Price   </b></label>

    <input type="number" min="0" max="10000" step="1" name="Broker_Fees" id="broker_fees" required="required"></input>
    <button type="submit" className="btn" >Upload</button>
    <button type="button" className="btn cancel" onClick={() => closeForm()}>Close</button>
  </form>
</div>
    )
}


export default AddNewItemForm;
    
