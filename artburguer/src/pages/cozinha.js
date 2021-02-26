import { useEffect, useState } from "react";

function Cozinha() {
  const token = localStorage.getItem("token");
  const [cozinha, setCozinha] = useState("");

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const cozinha = json.filter((item) => item.status === "pending");
        setCozinha(cozinha);
        console.log(cozinha);
      });
  }, []);

  return (
    <section className="container-cozinha">
      {cozinha &&
        cozinha.map((item, index) => (
          <div className="container-itens" key={index}>
            <h2>{item.client_name}</h2>
            <h2>{item.table}</h2>
            <h2>{item.id}</h2>
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
                <h1>{Products.name}</h1>
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}

export default Cozinha;
