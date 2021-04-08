import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useHistory } from "react-router-dom";

function Cozinha() {
  const token = localStorage.getItem("token");
  const [cozinha, setCozinha] = useState("");
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
        rota.push("/cozinha");
      });
  }, []);

  const handleReady = (event) => {
    const token = localStorage.getItem("token");
    const parent = event.target.parentNode.parentNode;
    const newId = parent.getAttribute("id");
    localStorage.setItem("id", newId);
    const idOrder = localStorage.getItem("id");

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
        status: "Pronto",
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
        <h2 className="App-text-pedidosPendentes">Pedidos Pendentes</h2>
      </div>
      <section className="container-cozinha">
        {cozinha &&
          cozinha.map((item, index) => (
            <div id={item.id} className="container-itens" key={index}>
              <p>
                PEDIDO EFETUADO: {new Date(item.createdAt).toLocaleString()}
              </p>
              <p key={Math.random()}>Cliente: {item.client_name}</p>
              <p key={Math.random()}>Mesa: {item.table}</p>
              <p key={Math.random()}>Nº do pedido: {item.id}</p>

              <div>
                <p>Produtos:</p>
                {item.Products.map((Products) => (
                  <p>
                    {Products.name} {Products.flavor} {Products.complement}
                    Qtd: {Products.qtd}
                  </p>
                ))}
                <button type="submit" onClick={handleReady}>
                  Pronto
                </button>
              </div>
            </div>
          ))}
        ;
      </section>
    </>
  );
}
export default Cozinha;
