// import React, { useState } from "react";

// const token = localStorage.getItem("token");

// const MenuLunch = () => {
//   return fetch("https://lab-api-bq.herokuapp.com/products", {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       const lunch = json.filter((item) => item.type === "all-day");

//       console.log(lunch);
//     });
// };

// export default MenuLunch;

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Components/Header";

function MenuLunch() {
  const token = localStorage.getItem("token");
  const [lunch, setLunch] = useState("");

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
        setLunch(lunch);
        console.log(lunch);
      });
  }, []);

  return (
    <div className="container-all-day">
      <Header />

      <div className="container-cardapio">
        <div>
          <h1>Lanches e Bebidas</h1>
        </div>

        {lunch &&
          lunch.map((item) => (
            <div className="container-itens-lunch">
              <h2>{item.name}</h2>
              <h2>R${item.price},00</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
export default MenuLunch;
