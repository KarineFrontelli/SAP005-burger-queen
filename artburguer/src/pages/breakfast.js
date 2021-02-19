import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Components/Header";

function Breakfast() {
  const token = localStorage.getItem("token");
  const [coffee, setCoffe] = useState("");

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
          coffee.map((item) => (
            <div className="container-itens">
              <h2>{item.name}</h2>
              <h2>R${item.price},00</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Breakfast;
