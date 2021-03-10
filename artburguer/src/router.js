/*import React, { useContext, createContext, useState } from "react";*/
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AppLogin from "./pages/Login/index";
import App from "./pages/Register/index";
import Orders from "./pages/Orders/index";
import Salao from "./pages/Lounge/index";
import Cozinha from "./pages/Kitchen/index.js";
import WelcomePage from "./pages/Transition/index";

function Routes() {
  const PrivateRoute = (props) => {
    const token = localStorage.getItem("token");
    return token ? (
      <Route {...props} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={AppLogin} />
          <Route path="/register" exact component={App} />
          <PrivateRoute path="/orders" exact component={Orders} />
          <PrivateRoute path="/salao" exact component={WelcomePage} />
          <PrivateRoute path="/lounge" exact component={Salao} />
          <PrivateRoute path="/cozinha" exact component={Cozinha} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
