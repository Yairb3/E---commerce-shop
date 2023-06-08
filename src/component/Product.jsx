import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ProfileCard from './ProfileCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataContext from "./usedb";
import { add_new_log, get_user_by_mail, get_item_by_id } from '../databaseAPI';
import { FaWhatsapp } from 'react-icons/fa';


const getSimilarProducts = (data, productId) => {
    let item_similarity = 0;
    let item1_similarity1 = 0;
    let item1_similarity2 = 0;
    let item1_similarity3 = 0;
    let itemId1 = 0;
    let itemId2 = 0;
    let itemId3 = 0;
    const idToProduct = JSON.parse(window.localStorage.getItem('ID_TO_PRODUCT'))
    data.forEach(product => {
        if (!!product) {
            item_similarity = get_Jaccard_similarity(productId, product.id, idToProduct);
            if (item_similarity > item1_similarity1) {
                item1_similarity3 = item1_similarity2;
                item1_similarity2 = item1_similarity1;
                item1_similarity1 = item_similarity;
                itemId3 = itemId2;
                itemId2 = itemId1;
                itemId1 = product.id;
            }
            else if (item_similarity > item1_similarity2){
                item1_similarity3 = item1_similarity2;
                item1_similarity2 = item_similarity;
                itemId3 = itemId2;
                itemId2 = product.id;
            }
            else if (item_similarity > item1_similarity3){
                item1_similarity3 = item_similarity;
                itemId3 = product.id;
            }
    }});
    return [itemId1, itemId2, itemId3]
  };

function get_Jaccard_similarity(productId1,productId2, idToProduct){
  // Check were not checking similarity with ourselfs.
  if (productId1 === productId2) {
    return -1;
  }
  const product1 = idToProduct[productId1];
  const product2 = idToProduct[productId2];

  //comparison begins, we try to normalize each value of similarity to make sure each catgeroy of comparison gets the weight we want.
  //most important is category followed by price and lastly similarity between titles.
  let jaccard_value = 0;
  
  // category comparison
  if (product1["category"] === product2["category"]) {
    jaccard_value = jaccard_value + 1;
  }; 

  // price comparison
  let diff_price = Math.abs(product1["price"] - product2["price"]);
  // we convert it to a fraction because otherwise it will influence on the result much more than the category.
  let diff_price_fraction = 1 / diff_price;
  
  // titles comparison end result is num of shared words divided by num of all total unique words in our product.
  let title1 = product1["title"];
  let title2 = product2["title"];
  let words1 = title1.split(' ');
  let words2 = title2.split(' ');
  let sharedWords = words1.filter(word => words2.includes(word));
  let totalSharedWords = sharedWords.length;
  let allWords = [...words1];
  let uniqueWords = [...new Set(allWords)];
  let totalUniqueWords = uniqueWords.length;
  jaccard_value = jaccard_value + (totalSharedWords/totalUniqueWords) + diff_price_fraction;
  return jaccard_value;
}; 

const Product = () => {
    const {id} = useParams();
    const {data} = useContext(DataContext);
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [similarProduct1, setSimilarProduct1] = useState([]);
    const [similarProduct2, setSimilarProduct2] = useState([]);
    const [similarProduct3, setSimilarProduct3] = useState([]);
    const [loading, setLoading] = useState(false);
    const success = () => toast.success("Item was added to cart!");
    const dispatch = useDispatch();
    const addProduct = (product) => {
        add_new_log("cart", product.id)
        success();
        dispatch(addCart(product));
    }
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const idToProduct = JSON.parse(window.localStorage.getItem('ID_TO_PRODUCT'))
            const product = await get_item_by_id(id);
            const similarProductIds = getSimilarProducts(data, product.id);
            setSimilarProduct1(idToProduct[similarProductIds[0]]);
            setSimilarProduct2(idToProduct[similarProductIds[1]]);
            setSimilarProduct3(idToProduct[similarProductIds[2]]);
            const currentUser = await get_user_by_mail(product.email)
            setUser(currentUser);
            setProduct(product);
            setLoading(false);
        }
        getProduct();
    }, [id, data]);

    const Loading = () => {
        return(
            <>
                <div className="col-md-6">
                    <Skeleton height={400}/>
                </div>
                <div className="col-md-6" style={{lineHeight:2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{marginLeft:6}} />
                </div>
            </>
        )
    }
    const ShowProduct = () => {
        const initiateWhatsAppConversation = () => {
            add_new_log("purchase", product.id)
            const phoneNumber = user.phone; 
            const message = `Hi, I'm interested in " ${product.title}" you posted in Nice2Have! Can you give me more details please?`; // Customize the initial message if needed
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`;
        
            window.open(whatsappLink, '_blank');
          };
        return(
        <div className="wrapper">
                <div className='imageDiv'>
                    <img src={product.image} alt={product.title} height="300px" width="300px" className='boxImage'/>
                </div>
                <div className='detailsDiv'>
                    <div className='itemDetails'>
                        <h4 className="text-uppercase text-black-50">
                            {product.category}
                        </h4>
                        <h1 className="display-5">{product.title}</h1>
                        <p className="lead fw-bolder">
                            Rating {product.rating && product.rating.rate} 
                            <i className="fa fa-star"></i>
                        </p>
                        <h3 className="display-6 fw-bold my-4">
                            $ {product.price}
                        </h3>
                        <p className="lead">{product.description}</p>
                        <button className="btn btn-outline-dark px-4 py-2" onClick={()=>addProduct(product)}>
                            Add to Cart
                        <ToastContainer />
                        </button>
                        <button className="btn btn-outline-success px-4 py-2 ms-2" onClick={initiateWhatsAppConversation}>
                            <FaWhatsapp className="me-2" />
                            WhatsApp
                        </button>
                        <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                            Go to Cart
                        </NavLink>    
                    </div>
                    <br />
                    <h4 className="similar-products-title">Similar Products:</h4>
                    <div className='similarProductsDiv' style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div className='similarProduct1'>
                            <div className="similarProductImage1">
                            <a href={`http://localhost:3000/products/${similarProduct1?.id}`}>
                                <img src={similarProduct1?.image} alt={similarProduct1?.title} height="80px" width="80px" className='similarProductImage1'/>
                            </a>
                            </div>
                            <div className="similarProductDetails1">
                                <p>
                                    <h6>
                                        {similarProduct1?.title}
                                    </h6>
                                </p>
                                <p>
                                    {similarProduct1?.price}
                                </p>
                            </div>
                        </div>
                        <div className='similarProduct2'>
                            <div className="similarProductImage2">
                                <a href={`http://localhost:3000/products/${similarProduct2?.id}`}>
                                    <img src={similarProduct2?.image} alt={similarProduct2?.title} height="80px" width="80px" 
                                    className='similarProductImage2'/>
                                </a>
                            </div>
                            <div className="similarProductDetails2">
                                <p>
                                    <h6>
                                        {similarProduct2?.title}
                                    </h6>
                                </p>
                                <p>
                                    {similarProduct2?.price}
                                </p>
                            </div>
                        </div>
                        <div className='similarProduct3'>
                            <div className="similarProductImage3">
                                <a href={`http://localhost:3000/products/${similarProduct3?.id}`}>
                                    <img src={similarProduct3?.image} alt={similarProduct3?.title} height="80px" width="80px" className='similarProductImage3'/>
                                </a>                                    
                            </div>
                            <div className="similarProductDetails3">
                                <p>
                                    <h6>
                                        {similarProduct3?.title}
                                    </h6>
                                </p>
                                <p>
                                    {similarProduct3?.price}
                                </p>
                            </div>
                        </div>
                </div>
                </div>
                <div overflow="none">
                    <ProfileCard user={user}/>
                </div>
            </div>
        )
    }

  return <div>{loading ? <Loading /> : <ShowProduct />}</div>;
};

export default Product;

