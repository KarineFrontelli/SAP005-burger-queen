import React, { useEffect, useState } from "react";

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

      <div className="container-cardapio">
        {lunch &&
          lunch.map((item) => (
            <div className="container-itens-lunch">
              <p>{item.name}</p>
              <p>R${item.price},00</p>
            </div>
          ))}
      </div>
    </div>
  );
}
export default MenuLunch;
