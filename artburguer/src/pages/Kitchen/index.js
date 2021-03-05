import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Link, useHistory } from "react-router-dom";

function Cozinha() {
  const token = localStorage.getItem("token");
  const [cozinha, setCozinha] = useState("");
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");
  const rota = useHistory();

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const cozinha = json.filter((item) => item.status === "pending");
        setCozinha(cozinha);
        console.log(cozinha);
        rota.push("/cozinha");
      });
  }, []);

  const handleReady = (event) => {
    const token = localStorage.getItem("token");
    const parent = event.target.parentNode.parentNode;
    const newId = parent.getAttribute("id");
    localStorage.setItem("id", newId);
    const idOrder = localStorage.getItem("id");
    console.log(newId);

    fetch(`https://lab-api-bq.herokuapp.com/orders/${idOrder}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        status: "ready",
      }),
    })
      .then((response) => response.json())
      .then((json) => {});
  };
  
  return (
    <>
      <div>
      <Header />
    </div>
    <div>
    <h2>Pedidos Pendentes</h2>
    </div>
    <section className="container-cozinha">
      {cozinha &&
        cozinha.map((item, index) => (
          <div id={item.id} className="container-itens" key={index}>
            <p>{new Date(item.createdAt).toLocaleString()}</p>
            <p key={index}>Cliente: {item.client_name}</p>
            <p key={index}>Mesa: {item.table}</p>
            <p key={index}>Nº do pedido: {item.id}</p>
            <p key={index}>Status do pedido: {item.status}</p>
            <p>
              Total: {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price)}
            </p>
            <div>
              <p>Produtos:</p>
              {item.Products.map((Products) => (
                <p>
                  {Products.name} {Products.flavor} {Products.complement}
                </p>
              ))}
              <button type="submit" onClick={handleReady}>
                Pronto
              </button>
            </div>
          </div>
          ))}
      </section>
    </>
  );
}
export default Cozinha;
