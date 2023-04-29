import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import DataContext from "./usedb";
import Items from "./Items";
import "../App.css";
import AddNewItemForm from "./AddNewItemForm";



const Products = () => {
  const {data, setFilter, isLoggedIn} = useContext(DataContext)
  const [loading, setLoading] = useState(false);

  const Loading = () => {
    return (
    <>
        <div className="col-md-3">
            <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
            <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
            <Skeleton height={350}/>
        </div>
        <div className="col-md-3">
            <Skeleton height={350}/>
        </div>
    </>
    );
  };

  const filterProduct = (cat) => {
      const updatedList = data.filter((x)=>x.category === cat);
      setFilter(updatedList);
  }
  const openForm = () => {
    if (isLoggedIn) {
      document.getElementById("myForm").style.display = "block";
    }
    else{
      alert("Please log in to add new item.");
    }
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct(`men's clothing`)}>Men's Clothing</button>
          <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct(`women's clothing`)}>
            Women's Clothing
          </button>
           <button className="btn btn-outline-dark me-2" onClick={() => openForm()}>Add New Item</button> 
        <AddNewItemForm />
        </div>
        <Items />
      </>
    );
  };
  return (
    <div className="blackbackground" >
      <div className="container my-5 py-5 ">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center ">Latest Products</h1>
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
