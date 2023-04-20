import "./App.css";
import React, { useState } from "react";

import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { Switch, Route} from "react-router-dom";
import Products from "./component/Products";
import Logo from './component/Logo';
import Product from "./component/Product";
import Cart from "./component/Cart";
import About from "./component/About";
import Contact from "./component/Contact";
import Login  from "./component/Login";
import Logout  from "./component/Logout";
import  Signup  from "./component/Signup";
import { BrowserRouter} from "react-router-dom";
import { DataProvider } from "./component/usedb";



function App() {
 
  return (
 
    
    
    
  <>
  
  
    
    <BrowserRouter>
    
        
    </BrowserRouter>
    
    
    <DataProvider>
    
      <Navbar/>
    
      
      <Switch>

        
        <Route exact path="/" component={Home} />
        
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />
      

      </Switch>
      
    </DataProvider>
  </>
  
  );
}

export default App;
