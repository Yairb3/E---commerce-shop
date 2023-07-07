import React, {useContext} from 'react';
import DataContext from './usedb';
import { NavLink } from "react-router-dom";
import { add_new_log } from "../databaseAPI";
import Skeleton from "react-loading-skeleton";

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

const PopularItems = () => {
  const { data, idToConfidenceVal, loading } = useContext(DataContext);
  // const [idToConfidenceVal, setIdToConfidenceVal] = useState([])


  let topProductIds = []
  if(!loading){
    let items = Object.keys(idToConfidenceVal).map(function(key) {
      return [key, idToConfidenceVal[key]]; 
  });
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1].value - first[1].value;
    })
    if(items.length > 0){
      for (let i = 0; i < 5; i++){
        topProductIds.push(items[i][0]);
      }
    }

  }
  console.log(topProductIds)
  const newtopProductIds = topProductIds.map(str => parseInt(str, 10));
  const filteredData = data.filter(obj => newtopProductIds.includes(obj.id));

  return (
    <>
      <h3 className="text-blk heading text-center ">Popular Products</h3>
      <div className="img_container">
        {loading ? <Loading /> : filteredData.map((product) => (
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
                  onClick={() => add_new_log("view", product.id)}
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
