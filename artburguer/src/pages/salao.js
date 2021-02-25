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
  const [cliente, setCliente] = useState("");
  const [mesa, setMesa] = useState("");

  function breakfastClick() {
    setBeakfastMenu(!breakfastMenu);
    sessionStorage.setItem("cliente", cliente);
    sessionStorage.setItem("mesa", mesa);
  }
  function lunchClick() {
    setLunchMenu(!lunchMenu);
    sessionStorage.setItem("cliente", cliente);
    sessionStorage.setItem("mesa", mesa);
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <input
        type="text"
        className="App-cliente"
        placeholder="Cliente:"
        value={cliente}
        onChange={(event) => setCliente(event.target.value)}
      ></input>
      <input
        type="text"
        className="App-mesa"
        placeholder="Mesa:"
        value={mesa}
        placeholder="N° mesa:"
        onChange={(event) => setMesa(event.target.value)}
      ></input>

      <div className="App-cardapio-salao">
        <h1>Cardapios</h1>
      </div>

      <button
        className="btn-cardapio-coffee"
        type="submit"
        onClick={breakfastClick}
      >
        Café da manhã
      </button>

      <button
        className="btn-cardapio-coffee"
        type="submit"
        onClick={lunchClick}
      >
        Lanches e Bebidas
      </button>
      <div className="container-cardapio">
        {breakfastMenu ? <Breakfast /> : null}
        {lunchMenu ? <MenuLunch /> : null}
      </div>
    </div>
  );
};
export default Salao;
