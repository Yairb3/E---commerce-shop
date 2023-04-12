import {createContext, useState} from "react";

const DataContext = createContext();
export const Category = {
    All: 'all',
    Mens: 'mens',
    Womens: 'womens',
    Jewelery: 'jewelery',
}

export function DataProvider({children}) {
    const [data, setData] = useState([])
    const userIdToProducts = {}
    const productIdToUser = {}

    return (<DataContext.Provider value={{data, setData, userIdToProducts, productIdToUser}}>
        {children}
        </DataContext.Provider>);
}

export default DataContext
