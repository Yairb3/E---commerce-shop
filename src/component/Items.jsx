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
              <div className="card h-100 text-center p-4" key={product.id}>
                <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                <div className="card-body">
                  <h5 className="card-title mb-0">{product.title}</h5>
                  <p className="card-text lead fw-bold">
                    ${product.price}
                  </p>
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