import React, { useEffect, useState } from "react";

function MenuLunch() {
  const token = localStorage.getItem("token");
  const [menuAllday, setMenuAllday] = useState("");
  const [produto, setProduto] = useState([]);
  const [total, setTotal] = useState(0);
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");

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
        const menuAllday = lunch.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name && t.name === item.name));
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
            <h2>R${item.price},00</h2>
          </div>
        ))}

      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map(({name, price, id}) => (
            <div className="pedido" key={id}>
              <h2>{name}</h2>
              <h2>R${price},00</h2>
            </div>
          ))}
        <p className="App-valor-total">Valor Total: R${total},00</p>
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
