import React, { useEffect, useState } from "react";

const Breakfast = () => {
  const token = localStorage.getItem("token");
  const [coffee, setCoffe] = useState("");
  const [unidade, setUnidade] = useState([]);

  function handleItem(item) {
    setUnidade((prevUnidade) => [...prevUnidade, item]);

    console.log(unidade);
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
        const coffee = json.filter((item) => item.type === "breakfast");
        setCoffe(coffee);
        console.log(coffee);
      });
  }, []);

  return (
    <section className="container-breakfast">
      {coffee &&
        coffee.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              // const parent = e.target.parentNode;
              const name = item.name;
              const price = item.price;
              const objeto = {
                name: name,
                price: price,
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
        {console.log(unidade)}
        {unidade.length > 0 &&
          unidade.map((item) => (
            <div className="pedido" key={Math.random()}>
              <h2 key={Math.random()}>{item.name}</h2>
              <h2 key={Math.random()}>R${item.price},00</h2>
            </div>
          ))}
      </div>
    </section>
  );
};
export default Breakfast;
// const logout = () => {
//   const token  = localStorage.getItem("token");
//   localStorage.clear()
//   Back()
// }
