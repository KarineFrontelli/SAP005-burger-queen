// import React from "react";
// import { Link } from "react-router-dom";

// // const [lanchePronto, setLanchePronto] = useState([]);

// // const Orders = (event) => {
// //   // const handleReady = (event) => {
// //   const token = localStorage.getItem("token");

// //   const parent = event.target.parentNode.parentNode;
// //   const newId = parent.getAttribute("id");
// //   localStorage.setItem("id", newId);
// //   const idOrder = Number(localStorage.getItem("id"));
// //   console.log(idOrder);

// //   // function handleEntregue(item) {
// //   //   setPronto((prevPronto) => [...prevPronto, item]);
// //   //   console.log(pronto);
// //   // }

// //   fetch(`https://lab-api-bq.herokuapp.com/orders/${idOrder}`, {
// //     method: "PUT",
// //     headers: {
// //       "Access-Control-Allow-Credentials": true,
// //       "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
// //       "Access-Control-Allow-Origin": "*",
// //       "Content-Type": "application/json",
// //       accept: "application/json",
// //       Authorization: `${token}`,
// //     },
// //     body: JSON.stringify({
// //       status: "Satisfeito",
// //     }),
// //   })
// //     .then((response) => response.json())
// //     .then((json) => {
// //       const filtroPedido = pedidos.filter((item) => item.id !== Satisfeito);
// //       setPedido(filtroPedido);
// //       console.log(pedidos);
// //       console.log(idPedidos);
// //     });
// //   const entregue = pronto.filter((item) => item.id !== "idOrder");
// //   setPronto(entregue);
// // };

// return (
//   <div>
//     <div>
//       <h1>Pedidos prontos</h1>
//     </div>

//     <button type="submit" onClick={handleEntregue}>
//       CLiente feliz
//     </button>
//   </div>
// );
// // };

// export default Orders;

import { useEffect, useState } from "react";
import Header from "../../Components/Header";

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
