import React, { useContext, createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { isAuthenticated } from "./auth";

import AppLogin from "./pages/login.js";
import App from "./pages/register.js";
import Orders from "./pages/orders.js";
import Salao from "./pages/salao.js";
import Cozinha from "./pages/cozinha.js";
import Breakfast from "./pages/breakfast.js";
import Lunch from "./pages/lunch.js";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//       )
//     }
//   />;
// };

function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={AppLogin} />
          <Route path="/register" exact component={App} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/salao" exact component={Salao} />
          <Route path="/cozinha" exact component={Cozinha} />
          <Route path="/breakfast" exact component={Breakfast} />
          <Route path="/lunch" exact component={Lunch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
