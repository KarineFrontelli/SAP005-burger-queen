import React from "react";
import logo from "../../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";
import "../../App.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = () => {
  const back = useHistory();
  const backLogin = () => {
    back.push("/");
  };

  const logout = () => {
    const token = localStorage.getItem("token");
    localStorage.clear();
    backLogin();
  };

  return (
    <header className="App-header">
      <div className="App-logo-header">
        <button className="App-btn-back" onClick={logout}>
          {<ExitToAppIcon fontSize="large" className="btn-logout" />}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </header>
  );
};

export default Header;
