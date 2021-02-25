import React from "react";
import { Link } from 'react-router-dom';
import AllDayMenu from "../Components/all-daymenu";
import OptionsDouble from "../Components/optionsDouble";
import OptionsSimple from "../Components/optionsSimple";


const Orders = () =>{
  return(
      <div>
          <h1>Orders</h1>
          <p>{<OptionsSimple />}</p>
          <p>{<OptionsDouble />}</p>
      </div>
  )
  
  
};

export default Orders;