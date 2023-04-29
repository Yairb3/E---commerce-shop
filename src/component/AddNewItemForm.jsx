import React, { useState, useContext } from "react";
import "../App.css";
import DataContext, { Category }from "./usedb";

const AddNewItemForm = () => {
  const { data, setData, id, setId, idToProduct} = useContext(
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
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const validateFields = () => {
    const isValid = email && image && description && price;
    if (!isValid) {
      alert("Please fill in all fields before uploading.");
    }
    return isValid;
  };

  const handleUploadClick = () => {
    if (validateFields()) {
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
      idToProduct[id] = newItem;
      console.log("%o", {idToProduct})
      setId(id + 1)
      data.push(newItem)
      setData(data)
      console.log("%o", {data})
      closeForm();
    }
  };

  return (
    <div>
      <div className="form-popup" id="myForm">
        <form
          className="form-container"
          style={{ width: "100%" }}
        >
          <h1>Add New Item</h1>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="image">
            <b>Upload Image</b>
          </label>
          <input
            type="file"
            className="filetype"
            id="group_image"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={handleImageChange}
          />
            <label htmlFor="description">
            <b>Title</b>
          </label>
          <textarea
            rows="1"
            cols="30"
            name="description"
            form="usrform"
            placeholder="Enter Title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">
            <b>Item Description</b>
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

          <label htmlFor="price">
            <b>Price</b>
          </label>
          <input
            type="number"
            min="0"
            max="10000"
            step="1"
            name="price"

            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="category">
            <b>Category</b>
          </label>
          <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
            <option value={Category.All}>All</option>
            <option value={Category.MensClothing}>Men's Clothing</option>
            <option value={Category.WomensClothing}>Women's Clothing</option>
            <option value={Category.Jewelery}>Jewelry</option>
          </select>

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