import React from "react";
import logo from "../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";
import "../App.css";

const Header = () => {
  const history = useHistory();
  const back = () => {
    history.push("/");
  };

  return (
    <header className="App-logo-header">
      <div>
        <button onClick={back}>Sair</button>
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  );
};

export default Header;
