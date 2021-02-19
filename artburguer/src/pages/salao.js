import React from "react";
import "../App.css";
import logo from "../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";

const Salao = () => {
  const history = useHistory();
  const push = () => {
    history.push("/breakfast");
  };
  const lunch = () => {
    history.push("/lunch");
  };
  return (
    <div>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <div className="App-cardapio-salao">
        <h1>Cardapios</h1>
      </div>

      <button className="btn-cardapio-coffee" type="submit" onClick={push}>
        Café da manhã
      </button>

      <button className="btn-cardapio-coffee" type="submit" onClick={lunch}>
        Lanches e Bebidas
      </button>
    </div>
  );
};
export default Salao;
