import React, { useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./components/not-found/not-found";
import SongFeature from "./features/song/pages/list-page/list-page";
import productApi from "./api/productAPI";

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
      home page
      <p>
        <NavLink to="/song"> Song List </NavLink>
      </p>
      <Switch>
        <Route path="/song" component={SongFeature} exact />
        <Route path="/" component={SongFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
