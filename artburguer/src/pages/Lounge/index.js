import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import Header from "../../Components/Header";
import MenuLunch from "../../Components/Burguer";
import Breakfast from "../../Components/Breakfast";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Salao = () => {
  const token = localStorage.getItem("token");
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

  const back = useHistory();
  function BackPage() {
    back.push("/salao");
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div className="btn-back">
          <p onClick={BackPage}> Voltar</p>
        </div>
        <div className="input-client-table">
          <TextField
            label="Cliente"
            variant="filled"
            color="secundary"
            placeholder="Nome do Cliente"
            value={cliente}
            onChange={(event) => setCliente(event.target.value)}
          />
          <TextField
            label="Mesa"
            variant="filled"
            color="secundary"
            value={mesa}
            placeholder="N° mesa"
            onChange={(event) => setMesa(event.target.value)}
          />
        </div>

        <div className="App-cardapio-btns">
          <button
            className="btn-cardapio"
            type="submit"
            onClick={breakfastClick}
          >
            Café da manhã
          </button>

          <button className="btn-cardapio" type="submit" onClick={lunchClick}>
            Dia Inteiro
          </button>
        </div>
      </div>

      <div className="container-cardapio">
        {breakfastMenu ? <Breakfast /> : null}
        {lunchMenu ? <MenuLunch /> : null}
      </div>
    </>
  );
};
export default Salao;
