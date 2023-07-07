import {createContext, useState, useEffect} from "react";
import { get_all_items, get_all_users, get_id_to_confidence_array_ratings} from "../databaseAPI";

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
    const [idToConfidenceVal, setIdToConfidenceVal] = useState([])

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
      const geConfidenceVals = async () => {
        setLoading(true)
        const idToConfidenceVal = await get_id_to_confidence_array_ratings()
        setIdToConfidenceVal(JSON.parse(idToConfidenceVal))
        setLoading(false)
      };
      geConfidenceVals();
    }, [])


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


useEffect(() => {
  const currentUser = JSON.parse(window.localStorage.getItem('CURRENT_USER'))
  if(currentUser){
    setCurrentName(currentUser.name)
    setCurrentAge(currentUser.age)
    setCurrentImage(currentUser.image)
  }
}, [])


    return (<DataContext.Provider value=
    {{data, setData,users, setUsers, idToConfidenceVal, loading,filter,currentAge, setCurrentAge,currentImage, setCurrentImage, setFilter, currentName,setCurrentName}}>
        {children}
        </DataContext.Provider>);
}

export default DataContext
