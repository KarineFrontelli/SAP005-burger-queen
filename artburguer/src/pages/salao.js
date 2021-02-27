import React , {useState, useEffect}from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "../App.css";
import logo from "../img/hamburgernovo.png";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";
import MenuLunch from "../Components/lunch";
import Breakfast from "../Components/breakfast";
import OptionsBurguer from "../Components/burguer";
import OptionsSide from "../Components/side";
import AllDayMenu from "../Components/all-daymenu";

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

  function sideClick() {
    setSideMenu(!sideMenu);
    sessionStorage.setItem("cliente", cliente);
    sessionStorage.setItem("mesa", mesa);
  }


  const [produto, setProduto] = useState([]);
  const [total, setTotal] = useState(0);
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");

  const handleRemoveItem = (indice) => {
    const ItensFiltrados = produto.filter((_, index) => indice != index);
    setProduto(ItensFiltrados);
    console.log(indice);
  };

  const handleAdicionaItem = (index) => {
    let newArrayProduto = [...produto];
    newArrayProduto[index].qtd++;
    newArrayProduto[index].price =
      newArrayProduto[index].initialPrice * newArrayProduto[index].qtd;
    setProduto(newArrayProduto);
  };

  const handleRemoverItem = (index) => {
    let newArrayProduto = [...produto];
    newArrayProduto[index].qtd--;
    newArrayProduto[index].price =
      newArrayProduto[index].initialPrice * newArrayProduto[index].qtd;
    setProduto(newArrayProduto);
  };

  // useEffect(() => {
  //   const soma = produto.reduce(
  //     (valorAnterior, valorAtual) => valorAnterior + valorAtual.price,
  //     0
  //   );
  //   setTotal(soma);
  // }, [produto]);

  const handleEnviar = () => {
    setTotal(produto.reduce((prevTotal, total) => prevTotal + total.price, 0));
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        client: nomeCliente,
        table: numeroMesa,
        products: produto.map((item) => ({
          id: Number(item.id),
          qtd: 1,
        })),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
    return total;
  };

  function handleItem(item) {
    setProduto((prevProduto) => [...prevProduto, item]);

    console.log(produto);
  }

  

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <input
          type="text"
          className="App-cliente"
          placeholder="Cliente:"
          value={cliente}
          onChange={(event) => setCliente(event.target.value)}
        ></input>
        <input
          type="text"
          className="App-mesa"
          placeholder="Mesa:"
          value={mesa}
          placeholder="N° mesa:"
          onChange={(event) => setMesa(event.target.value)}
        ></input>
      </div>
      

      <div className="App-cardapio-salao">
        <h1>Cardápios</h1>
      </div>

      <button
        className="btn-cardapio"
        type="submit"
        onClick={breakfastClick}
      >
        Café da manhã
      </button>

      <button
        className="btn-cardapio"
        type="submit"
        onClick={lunchClick}
      >
        Hambúrgueres
      </button>

      <button
        className="btn-cardapio"
        type="submit"
        onClick={sideClick}
      >
        Acompanhamentos e Bebidas
      </button>

      <div className="container-cardapio">
        {breakfastMenu ? <Breakfast /> : null}
        {lunchMenu ? <MenuLunch /> : null}
        {sideMenu ? <OptionsSide /> : null}
      </div>

      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map((item, index) => (
            <div className="pedido" key={index}>
              <h2>{item.name}</h2>
              <h2>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </h2>
              <button
                className="btn-adicionar"
                type="submit"
                onClick={() => handleAdicionaItem(index)}
              >
                +
              </button>
              <button
                className="btn-remover"
                type="submit"
                onClick={() => handleRemoverItem(index)}
              >
                -
              </button>

              <button
                className="btn-deletar"
                type="submit"
                onClick={() => handleRemoveItem(index)}
              >
                {<DeleteIcon />}
              </button>
            </div>
          ))}
        <p className="App-valor-total">
          Valor Total:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </p>
      </div>
      <button
        className="btn-enviar-cozinha"
        type="submit"
        onClick={handleEnviar}
      >
        Enviar para cozinha
      </button>
    </div>
  );
};
export default Salao;
