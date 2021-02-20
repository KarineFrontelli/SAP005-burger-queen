import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Components/Header";

function Breakfast() {
  const token = localStorage.getItem("token");
  const [coffee, setCoffe] = useState("");
  const [unidade, setUnidade] = useState([]);

  function handleItem(item) {
    const newArray = unidade;
    newArray.push(item);
    setUnidade(newArray);
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
    <div className="container-breakfast">
      <Header />

      <div className="container-cardapio">
        <div>
          <h1>Café da manhã</h1>
        </div>

        {coffee &&
          coffee.map((item, index) => (
            <div
              key={index}
              onClick={(e) => {
                // const parent = e.target.parentNode;
                const name = item.name;
                const objeto = {
                  name: name,
                };
                handleItem(objeto);
              }}
              className="container-itens"
            >
              <h2>{item.name}</h2>
              <h2>R${item.price},00</h2>
            </div>
          ))}
      </div>

      <div className="container-pedidos">
        {unidade &&
          unidade.map((item) => (
            <div key={Math.random()}>
              <h2 key={Math.random()}>{item.name}</h2>
              <h2>R${item.price},00</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Breakfast;
// const logout = () => {
//   const token  = localStorage.getItem("token");
//   localStorage.clear()
//   routerBack()
// }
