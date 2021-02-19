import React, { useEffect, useState } from "react";

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
      <div className="container-cardapio">
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