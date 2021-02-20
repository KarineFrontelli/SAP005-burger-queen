import React from "react";
import "../App.css";
import logo from "../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";

const Salao = () => {
  const history = useHistory();
  const push = () => {
    history.push("/breakfast");
  };
  const lunch = () => {
    history.push("/lunch");
  };

  const cliente = "";
  const Mesa = "";
  return (
    <div>
      <div>
        <Header />
      </div>
      <input placeholder="Cliente:"></input>
      <input placeholder="N° mesa:"></input>

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
