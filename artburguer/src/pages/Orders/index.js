import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Orders() {
  const token = localStorage.getItem("token");
  const [cozinha, setCozinha] = useState("");
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");
  const back = useHistory();

  function BackPage() {
    back.push("/salao");
  }

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
        const cozinha = json.filter((item) => item.status !== "pending");
        setCozinha(cozinha);
        console.log(cozinha);
      });
  }, []);

  const handleFinish = (event) => {
    const token = localStorage.getItem("token");
    const parent = event.target.parentNode.parentNode;
    const newId = parent.getAttribute("id");
    localStorage.setItem("id", newId);
    const idOrder = localStorage.getItem("id");
    console.log(newId);

    fetch(`https://lab-api-bq.herokuapp.com/orders/${idOrder}`, {
      method: "DELETE",
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
        console.log(json);
      });
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="btn-back">
        <p onClick={BackPage}>VOLTAR</p>
      </div>

      <h2 className="App-text-pedidosProntos">PEDIDOS PRONTOS</h2>

      <section className="container-cozinha">
        {cozinha &&
          cozinha.map((item, index) => (
            <div id={item.id} className="container-itens" key={index}>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
              <p key={index}>Cliente: {item.client_name}</p>
              <p key={index}>Mesa: {item.table}</p>
              <p key={index}>Nº do pedido: {item.id}</p>
              <p key={index}>Status do pedido: {item.status}</p>

              <div>
                <p>Produtos:</p>
                {item.Products.map((Products) => (
                  <p>
                    {Products.name} {Products.flavor} {Products.complement}
                    {Products.qtd}
                  </p>
                ))}
                <button
                  className="btn-entregue"
                  type="submit"
                  onClick={handleFinish}
                >
                  ENTREGUE
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default Orders;
