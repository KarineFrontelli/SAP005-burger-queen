import React , {useState, useEffect}from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../App.css";
import Header from "../../Components/Header";
import MenuLunch from "../../Components/Burguer";
import Breakfast from "../../Components/Breakfast";
import IconButton from '@material-ui/core/IconButton';
import ButtonBases from "../../Components/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const Salao = () => {
  const token = localStorage.getItem("token");
  const [breakfastMenu, setBeakfastMenu] = useState(false);
  const [lunchMenu, setLunchMenu] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [cliente, setCliente] = useState("");
  const [mesa, setMesa] = useState("");
  const [side,setSide] = useState("");
  const [burguer,setBurguer] = useState("");


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
    <>
      <div>
        <Header />
      </div>
      <div className="input-client-table">
      <TextField
          id="outlined-secondary"
          label="Cliente"
          variant="outlined"
          color="secondary"
          
          placeholder="Nome do Cliente"
          value={cliente}
          onChange={(event) => setCliente(event.target.value)}
        />

        <TextField
          id="outlined-secondary"
          label="Mesa"
          variant="outlined"
          color="secondary"
          value={mesa}
          placeholder="N° mesa"
          onChange={(event) => setMesa(event.target.value)}
        />
      </div>
      

      
      <div className="App-cardapio-btns">
       
        <button
          
          type="submit"
          onClick={breakfastClick}
          
        >
        Café da manhã
          
        </button>

        <button
          
          type="submit"
          onClick={lunchClick}
        >
          Dia Inteiro
          
        </button>

       
      </div>
      

      <div className="container-cardapio">
        {breakfastMenu ? <Breakfast /> : null}
        {lunchMenu ? <MenuLunch /> : null}
      </div>

      
    </>
  );
};
export default Salao;
