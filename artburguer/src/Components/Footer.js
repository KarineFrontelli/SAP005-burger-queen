import React from "react";
import styles from "./Footer.module.css";
import "../App.css";

const Footer = () => {
  return (
    <div className="App-footer">
      &copy; {new Date().getFullYear()} Projeto desenvolvido por:{" "}
      <a href="https://github.com/KarineFrontelli/" target="_blank">
        Karine Frontelli{" "}
      </a>
      e
      <a href="https://github.com/rebecaCanesin" target="_blank">
        {" "}
        Rebeca Canesin
      </a>
    </div>
  );
};

export default Footer;
