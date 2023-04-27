import {createContext, useState, useEffect} from "react";

const DataContext = createContext();
export const Category = {
    All: 'all',
    MensClothing: `men's clothing`,
    WomensClothing: `women's clothing`,
    Jewelery: 'jewelery',
}

export function DataProvider({children}) {
    const [id, setId] = useState(0)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const userIdToProducts = {}
    const productIdToUser = {}
    const [idToProduct, setIdToProduct] = useState({})

    useEffect(() => {
      const getProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
          setData(await response.clone().json());
          setFilter(await response.json());
      };
      getProducts();
    }, []);

useEffect(() => {
  const myData = window.localStorage.getItem('DATA')
  if(myData){
    setData(JSON.parse(myData))
  }
}, [])

useEffect(() => {
    window.localStorage.setItem('DATA', JSON.stringify(data))
}, [data])


    // useEffect(() => {
    //     window.localStorage.setItem('FILTER', filter)
    // }, [filter])

    // useEffect(() => {
    //     const myFilter = window.localStorage.getItem('FILTER')
    //     setData(myFilter)
    // }, [data])



    return (<DataContext.Provider value=
    {{idToProduct, data, setData,filter, setFilter, userIdToProducts, productIdToUser, isLoggedIn, setIsLoggedIn, id, setId}}>
        {children}
        </DataContext.Provider>);
}

export default DataContext
