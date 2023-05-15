import {createContext, useState, useEffect} from "react";
import { get_all_items, get_all_users , get_ratings} from "../databaseAPI";

const DataContext = createContext();
export const Category = {
    All: 'all',
    MensClothing: `men's clothing`,
    WomensClothing: `women's clothing`,
    Jewelery: 'jewelery',
}

export function DataProvider({children}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState([])
    const userIdToProducts = {}
    const productIdToUser = {}



    useEffect(() => {
      const getProducts = async () => {
        setLoading(true)
        const all_products = await get_all_items();
        setData(all_products);
        setLoading(false)
      };
      getProducts();
    }, []);

    useEffect(() => {
      const getUsers = async () => {
        const all_users = await get_all_users()
        setUsers(all_users);
      };
      getUsers();
    }, []);
    



useEffect(() => {
  if(!(window.localStorage.getItem('ID_TO_PRODUCT')) && data.length > 0){
    const idToProduct = {}
    data.forEach(item => idToProduct[item.id] = item)
    window.localStorage.setItem('ID_TO_PRODUCT', JSON.stringify(idToProduct))
  }
  if(!(window.localStorage.getItem('IS_LOGGED_IN'))){
    window.localStorage.setItem('IS_LOGGED_IN', false)
  }
  if(!(window.localStorage.getItem('CURRENT_USER'))){
    window.localStorage.setItem('CURRENT_USER', null)
  }
}, [data, loading])

const [currentName, setCurrentName, ] = useState("")
const [currentAge, setCurrentAge ] = useState("")
const [currentImage, setCurrentImage ] = useState("")
const [ratings, setRatings] = useState({});

useEffect(() => {
  const getRatings = async () => {
    const ratings = await get_ratings()
    setRatings(ratings);
  };
  getRatings();
}, []);

useEffect(() => {
  const currentUser = JSON.parse(window.localStorage.getItem('CURRENT_USER'))
  if(currentUser){
    setCurrentName(currentUser.name)
    setCurrentAge(currentUser.age)
    setCurrentImage(currentUser.image)
  }
}, [])



    return (<DataContext.Provider value=
    {{data, setData,users, setUsers,ratings, setRatings,loading,filter,currentAge, setCurrentAge,currentImage, setCurrentImage, setFilter, userIdToProducts, productIdToUser, currentName,setCurrentName}}>
        {children}
        </DataContext.Provider>);
}

export default DataContext
