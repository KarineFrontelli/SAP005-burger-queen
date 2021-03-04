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
      <section className="container-cozinha">
        {cozinha &&
          cozinha.map((item, index) => (
            <div id={item.id} className="container-itens" key={index}>
              <h2 key={index}>{item.client_name}</h2>
              <h2 key={index}>{item.table}</h2>
              <h2 key={index}>{item.id}</h2>

              <h2>
                {item.status}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </h2>
              <div>
                produtos
                {item.Products.map((Products) => (
                  <h1>
                    {Products.name} {Products.flavor} {Products.complement}
                  </h1>
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
