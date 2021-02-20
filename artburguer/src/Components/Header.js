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
    <header className="App-header">
      <nav className="nav">
        <div className="App-logo-header">
          <button className="App-btn-back" onClick={back}>
            Sair
          </button>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
