import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../img/hamburgernovo.png";

function Breakfast() {
  const history = useHistory();
  const back = () => {
    history.push("/");
  };

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
      <button onClick={back}>Sair</button>

      <div className="container-cardapio">
        <h1>Café da manhã</h1>

        {coffee &&
          coffee.map((item) => (
            <div className="container-cardapio">
              <h1>{item.name}</h1>
              <h1>R${item.price},00</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Breakfast;
