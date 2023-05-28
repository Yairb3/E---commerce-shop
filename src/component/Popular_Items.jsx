import React, { useContext } from 'react';
import DataContext from './usedb';
import { NavLink } from "react-router-dom";

const PopularItems = () => {
  const { ratings, data } = useContext(DataContext);

  // Create an array of objects that represent each item, including its id and sum score
  const items = Object.keys(ratings).map((id) => ({
    id: id,
    sumScore: ratings[id][0],
  }));

  // Sort the array by sum score in descending order
  items.sort((a, b) => b.sumScore - a.sumScore);

  // Get the top 5 items by taking the first 5 items in the sorted array
  const topItems = items.slice(0, 5);
  // Filter the products array to include only the top 5 items
  const topProductIds = topItems.map(item => item.id);
  const newtopProductIds = topProductIds.map(str => parseInt(str, 10));
  const filteredData = data.filter(obj => newtopProductIds.includes(obj.id));

  return (
    <>
      <h3 className="text-blk heading text-center ">Popular Products</h3>
      <div className="img_container">
        {filteredData.map((product) => (
          <div className="col-md-2 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                height="250px"
              />
              <div className="card-body">
                <h5 className="card-title mb-0">{product.title}</h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <div></div>
                <NavLink
                  to={`/products/${product.id}`}
                  className="btn btn-outline-dark"
                >
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
};

export default PopularItems;
