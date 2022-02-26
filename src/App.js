import React, { useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./components/not-found/not-found";
import SongFeature from "./features/song/pages/list-page/list-page";
import productApi from "./api/productAPI";
import CounterFeature from "./features/counter";
import styled from "styled-components";

import headerzzz from "components/header/header";
import Header from "components/header/header";







function App() {

  useEffect(() => {
    const fetchProducts = async() => {
      const productList = await productApi.getAll();
      console.log(productList);
    }

    fetchProducts();
  }, []);



  return (
    <div className="App">

     <Header/>
      
      <Switch>
        <Route path="/song" component={SongFeature} exact />
        <Route path="/" component={CounterFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
