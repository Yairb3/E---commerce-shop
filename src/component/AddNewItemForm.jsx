import React, { useState, useContext } from "react";
import "../App.css";
import DataContext, { Category }from "./usedb";
import emailjs from "emailjs-com";
import { add_item } from "../databaseAPI";

const AddNewItemForm = () => {
  const { data } = useContext(
    DataContext
  );

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  };

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

  const validateFields = () => {
    const isValid = email && description && price && image;
    if (!isValid) {
      alert("Please fill in all fields before uploading.");
    }
    return isValid;
  };

  const getNewId = () => {
    const currId = data[data.length - 1].id
    return currId + 1
    }

  const handleUploadClick = () => {
    if (validateFields()) {
      const id = getNewId()
      const newItem = {
        email,
        image,
        title,
        description,
        price,
        category: itemCategory,
        rating: {count: 0, rate: 0},
        id,
      };
      add_item(newItem)
      const idToProduct = JSON.parse(window.localStorage.getItem('ID_TO_PRODUCT'))
      idToProduct[id] = newItem;
      window.localStorage.setItem('ID_TO_PRODUCT', JSON.stringify(idToProduct));
      emailjs.send(
        "service_pq206ba",
        "template_wgr42dq",
        newItem,
        "7EL9yGfRLnRx5EzQ8",
      )
      closeForm();
    }
  };

  return (
<div>
  <div className="form-popup" id="myForm"  >
    <form className="form-container" style={{ width: "100%" }}>
      <h1>Add New Item</h1>
      <label htmlFor="email">
        <b>Email: </b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="title">
        <b>Title: </b>
      </label>
      <textarea
        rows="1"
        cols="30"
        name="title"
        form="usrform"
        placeholder="Enter Title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">
        <b>Item Description: </b>
      </label>
      <textarea
        rows="4"
        cols="30"
        name="description"
        form="usrform"
        placeholder="Enter Your Description Here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>
        <b>Price: </b>
      </label>
      <input
        id="number"
        type="number"
        min="0"
        max="10000"
        step="1"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label htmlFor="category" style={{ width: "100%" }}>
        <b>Category: </b>
      </label>
      <select
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      >
        <option value={Category.All}>All</option>
        <option value={Category.MensClothing}>Men's Clothing</option>
        <option value={Category.WomensClothing}>Women's Clothing</option>
        <option value={Category.Jewelery}>Jewelry</option>
      </select>

      <label htmlFor="image" style={{ width: "100%" }}>
        <b>Upload Imag: </b>
      </label>
      <input
        type="file"
        className="filetype"
        id="group_image"
        name="image"
        accept="image/x-png,image/gif,image/jpeg"
        onChange={handleImageChange}
      />

      <button type="button" className="btn" onClick={handleUploadClick}>
        Upload
      </button>
      <button type="button" className="btn cancel" onClick={closeForm}>
        Close
      </button>
    </form>
  </div>
</div>
);

};

export default AddNewItemForm;