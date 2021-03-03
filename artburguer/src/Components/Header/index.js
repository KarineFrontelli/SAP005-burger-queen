import React from "react";
import logo from "../../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";
import "../../App.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from '@material-ui/core/IconButton';

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
        <img src={logo} className="logo-header" alt="logo" />
        <IconButton className="App-btn-back" onClick={logout}>
          <ExitToAppIcon fontSize="large"  />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
