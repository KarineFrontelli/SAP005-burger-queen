import React , {useState}from "react";
import "../../App.css";
import Header from "../../Components/Header";
import MenuLunch from "../../Components/Burguer";
import Breakfast from "../../Components/Breakfast";
import TextField from '@material-ui/core/TextField';


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
  };
  function lunchClick() {
    setLunchMenu(!lunchMenu);
    sessionStorage.setItem("cliente", cliente);
    sessionStorage.setItem("mesa", mesa);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="input-client-table">
      <TextField
          id="outlined-primary"
          label="Cliente"
          variant="outlined"
          color="primary"
          placeholder="Nome do Cliente"
          value={cliente}
          onChange={(event) => setCliente(event.target.value)}
        />
        <TextField
          id="outlined-primary"
          label="Mesa"
          variant="outlined"
          color="primary"
          value={mesa}
          placeholder="N° mesa"
          onChange={(event) => setMesa(event.target.value)}
        />
      </div>

      <div className="App-cardapio-btns">
        <button type="submit" onClick={breakfastClick}>
          Café da manhã
        </button>

        <button type="submit" onClick={lunchClick}>
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
