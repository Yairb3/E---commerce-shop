import React, { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import DataContext from "./usedb";
import { update_ratings } from "../databaseAPI";

const Items = () => {
  const {ratings, setRatings} = useContext(DataContext);
  // ratings is looks like: {id1: [currentRating, SumScoreOfItem],id2: [currentRating, SumScoreOfItem]...}
  const handleRatingChange = (productId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [productId]: [
        rating,
        (prevRatings[productId] ? prevRatings[productId][1] : 0) + rating
      ]

    }));
    console.log(rating[productId]);

   
    update_ratings(ratings); // pass the updated ratings instead of prevRatings
  };


  const { filter } = useContext(DataContext)
  return (
    filter.map((product) => {
      return (
        <>
          <div className="col-md-3 mb-4">
            <div className="card h-100 text-center p-4" key={product.id}>
              <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
              <div className="card-body">
                <h5 className="card-title mb-0">{product.title}</h5>
                <p className="card-text lead fw-bold">
                  ${product.price}
                </p>
                <div>
                  <span>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="fa fa-star"
                        style={{ color: i < ratings[product.id]?.[0] ? 'orange' : 'gray', cursor: 'pointer' }}

                        onClick={() => handleRatingChange(product.id, i + 1)}
                      />
                    ))}
                  </span>
                </div>
                <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        </>
      );
    }))
}

export default Items;
