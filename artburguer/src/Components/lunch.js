import React, { useEffect, useState } from "react";
import OptionsDouble from "./optionsDouble";
import OptionsSimple from "./optionsSimple";

function MenuLunch() {
  const token = localStorage.getItem("token");
  const [menuAllday, setMenuAllday] = useState("");
  const [produto, setProduto] = useState([]);
  const [total, setTotal] = useState(0);
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");

  const handleRemoveItem = (indice) => {
    const ItensFiltrados = produto.filter((_, index) => indice != index);
    setProduto(ItensFiltrados);
    console.log(indice);
  };

  useEffect(() => {
    const soma = produto.reduce(
      (valorAnterior, valorAtual) => valorAnterior + valorAtual.price,
      0
    );
    setTotal(soma);
  }, [produto]);

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

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const lunch = json.filter((item) => item.type === "all-day");
        const menuAllday = lunch.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.name === item.name && t.name === item.name)
        );
        setMenuAllday(menuAllday);
        console.log(menuAllday);
      });
  }, []);

  

  return (
   <section className="container-allday">
      {menuAllday &&
        menuAllday.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              const name = item.name;
              const price = item.price;
              const id = item.id;
              const objeto = {
                name: name,
                price: price,
                id: id,
              };
              handleItem(objeto);
            }}
            className="container-itens"
          >
            <h2>{item.name}</h2>
            <h2>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</h2>
          </div>
        ))}

        <button type="submit" onClick={<OptionsDouble/>}>TESTE</button>
        <button type="submit" onClick={<OptionsSimple/>}>TESTE2</button>

      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map((item, index) => (
            <div className="pedido" key={index}>
              <h2>{item.name}</h2>
              <h2>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</h2>

              <button
                className="btn-deletar"
                type="submit"
                onClick={() => handleRemoveItem(index)}
              >
                Excluir
              </button>
            </div>
          ))}
        <p className="App-valor-total">Valor Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</p>
      </div>
      <button
        className="btn-enviar-cozinha"
        type="submit"
        onClick={handleEnviar}
      >
        Enviar para cozinha
      </button>
    </section>
  );
}
export default MenuLunch;
