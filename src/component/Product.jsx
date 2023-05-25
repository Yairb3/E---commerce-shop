import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ProfileCard from './ProfileCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp } from 'react-icons/fa';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const success = () => toast.success('Item was added to cart!');
  const dispatch = useDispatch();

  const addProduct = (product) => {
    success();
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const idToProduct = JSON.parse(
        window.localStorage.getItem('ID_TO_PRODUCT')
      );
      setProduct(idToProduct[id]);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const initiateWhatsAppConversation = () => {
    const phoneNumber = '+972525688627'; 
    const message = `Hi, I'm interested in " ${product.title}" you posted in Nice2Have! Can you give me more details please?`; // Customize the initial message if needed
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, '_blank');
  };

  const ShowProduct = () => {
    return (
      <div className="wrapper">
        <div className="box2">
          <img
            src={product.image}
            alt={product.title}
            height="300px"
            width="300px"
            className="boxImage"
          />
        </div>
        <div className="box3">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn
                      btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
            <ToastContainer />
          </button>
          <button
            className="btn btn-outline-dark px-4 py-2 ms-2"
            onClick={initiateWhatsAppConversation}
          >
            <FaWhatsapp className="me-2" />
            WhatsApp
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
        <div overflow="none">
          <ProfileCard />
        </div>
      </div>
    );
  };

  return <div>{loading ? <Loading /> : <ShowProduct />}</div>;
};

export default Product;

