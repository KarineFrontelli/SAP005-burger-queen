import React, { useContext, createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { isAuthenticated } from "./auth";

import AppLogin from "./pages/login.js";
import App from "./pages/register.js";
import Orders from "./pages/orders.js";
import Salao from "./pages/salao.js";
import Cozinha from "./pages/cozinha.js";

function Routes() {
  const PrivateRoute = (props) => {
    const token = localStorage.getItem('token');
    return token ?
      (<Route {...props}/>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />)
};

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={AppLogin} />
          <Route path="/register" exact component={App} />
          <PrivateRoute path="/orders" exact component={Orders} />
          <PrivateRoute path="/salao" exact component={Salao} />
          <PrivateRoute path="/cozinha" exact component={Cozinha} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
