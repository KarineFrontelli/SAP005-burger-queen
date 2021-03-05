import { useEffect, useState, useHistory } from "react";
import Header from "../../Components/Header";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Orders() {
  const token = localStorage.getItem("token");
  const [cozinha, setCozinha] = useState("");
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");
  // const [pedidosprontos, setpedidosprontos] = useState([]);

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

  // const back = useHistory();
  function BackPage() {
    useHistory().push("/salao");
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <IconButton className="btn-back">
          <ArrowBackIcon onClick={BackPage} />
        </IconButton>
        <h2>Pedidos Prontos</h2>
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
                <button type="submit" onClick={handleFinish}>
                  Cliente Satisfeito
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default Orders;
