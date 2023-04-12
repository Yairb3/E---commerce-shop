import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import DataContext from "./usedb";



const Items = () => {
    const { filter } = useContext(DataContext)
    return (
    filter.map((product) => {
        return (
          <>
            <div className="col-md-3 mb-4">
              <div class="card h-100 text-center p-4" key={product.id}>
                <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                <div class="card-body">
                  <h5 class="card-title mb-0">{product.title.substring(0,12)}...</h5>
                  <p class="card-text lead fw-bold">
                    ${product.price}
                  </p>
                  <NavLink to={`/products/${product.id}`} class="btn btn-outline-dark">
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