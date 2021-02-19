import React, { useState } from "react";
import "../App.css";
import logo from "../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";
import MenuLunch from "../Components/lunch";
import Breakfast from "../Components/breakfast";


const Salao = () => {
  const [breakfastMenu, setBeakfastMenu] = useState(false);
  const [lunchMenu, setLunchMenu] = useState(false);
  
  function breakfastClick (){
    setBeakfastMenu(!breakfastMenu)
  };
  function lunchClick (){
    setLunchMenu(!lunchMenu)
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="App-cardapio-salao">
        <h1>Cardapios</h1>
      </div>

      <button className="btn-cardapio-coffee" type="submit" onClick={breakfastClick}>
       Café da manhã
      </button> 
      
      <button className="btn-cardapio-coffee" type="submit" onClick={lunchClick}>
        Lanches e Bebidas
      </button>
      <div className="container-cardapio">
        {breakfastMenu ? <Breakfast/> : null} 
        {lunchMenu ? <MenuLunch /> : null} 
      </div>
      
    </div>
  );
};
export default Salao;
