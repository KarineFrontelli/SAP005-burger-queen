import React from "react";
import { Link } from 'react-router-dom';
import AllDayMenu from "../Components/all-daymenu";
import Options from "../Components/options";


const Orders = () =>{
  return(
      <div>
          <header>
              <nav>
                  <Link to='/'>Login</Link>
                  <Link to='/register'>Cadastro</Link>
                  <Link to='/orders'>Pedidos</Link>
              </nav>
          </header>
          <h1>Orders</h1>
          <p>{<Options />}</p>
      </div>
  )
  
  
};

export default Orders;