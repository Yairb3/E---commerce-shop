import React, { useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import DataContext from "./usedb";
import Items from "./Items";
import "../App.css";
import AddNewItemForm from "./AddNewItemForm";

const Products = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("IS_LOGGED_IN"));
  const { data, setFilter, loading } = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProductByCategoryAndSubcategories = (category, colors, sizes, types) => {
    const updatedList = data.filter(
      (item) =>
        (colors.length === 0 || colors.includes(item.color)) &&
        (sizes.length === 0 || sizes.includes(item.size)) &&
        (types.length === 0 || types.includes(item.item))
    );
    setFilter(updatedList);
  };

  const filterProduct = (category) => {
    setSelectedCategory(category);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedTypes([]);
    const updatedList = data.filter((item) => item.category === category);
    setFilter(updatedList);
  };

  const handleColorChange = (color) => {
    const updatedColors = [...selectedColors];
    if (updatedColors.includes(color)) {
      const index = updatedColors.indexOf(color);
      updatedColors.splice(index, 1);
    } else {
      updatedColors.push(color);
    }
    setSelectedColors(updatedColors);
    filterProductByCategoryAndSubcategories(
      selectedCategory,
      updatedColors,
      selectedSizes,
      selectedTypes
    );
  };

  const handleSizeChange = (size) => {
    const updatedSizes = [...selectedSizes];
    if (updatedSizes.includes(size)) {
      const index = updatedSizes.indexOf(size);
      updatedSizes.splice(index, 1);
    } else {
      updatedSizes.push(size);
    }
    setSelectedSizes(updatedSizes);
    filterProductByCategoryAndSubcategories(
      selectedCategory,
      selectedColors,
      updatedSizes,
      selectedTypes
    );
  };

  const handleTypeChange = (type) => {
    const updatedTypes = [...selectedTypes];
    if (updatedTypes.includes(type)) {
      const index = updatedTypes.indexOf(type);
      updatedTypes.splice(index, 1);
    } else {
      updatedTypes.push(type);
    }
    setSelectedTypes(updatedTypes);
    filterProductByCategoryAndSubcategories(
      selectedCategory,
      selectedColors,
      selectedSizes,
      updatedTypes
    );
  };

  const openForm = () => {
    if (isLoggedIn) {
      document.getElementById("myForm").style.display = "block";
    } else {
      alert("Please log in to add a new item.");
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`men's clothing`)}>
            Men's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`women's clothing`)}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`jewelery`)}>
            Jewelery
          </button>
          
          <button className="btn btn-outline-dark me-2" onClick={() => openForm()}>
            Add New Item
          </button>
          <AddNewItemForm />
        </div>
        <div className="container">
      <div className="centered-checkbox-group">
        {selectedCategory && (
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("red")}
                onChange={() => handleColorChange("red")}
              />
              Red
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("blue")}
                onChange={() => handleColorChange("blue")}
              />
              Blue
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("purple")}
                onChange={() => handleColorChange("purple")}
              />
              Purple
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("black")}
                onChange={() => handleColorChange("black")}
              />
              Black
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("white")}
                onChange={() => handleColorChange("white")}
              />
              White
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("silver")}
                onChange={() => handleColorChange("silver")}
              />
              Silver
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes("S")}
                onChange={() => handleSizeChange("S")}
              />
              S
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes("M")}
                onChange={() => handleSizeChange("M")}
              />
              M
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes("L")}
                onChange={() => handleSizeChange("L")}
              />
              L
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes("OS")}
                onChange={() => handleSizeChange("OS")}
              />
              OS
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.includes("shirt")}
                onChange={() => handleTypeChange("shirt")}
              />
              Shirt
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.includes("jacket")}
                onChange={() => handleTypeChange("jacket")}
              />
              Jacket
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.includes("backpack")}
                onChange={() => handleTypeChange("backpack")}
              />
              Backpack
            </label>
          </div>
        )}
      </div>
    </div>
    <Items />
      </>

    );
  };

  return (
    <div className="blackbackground">
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="text-blk heading text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
