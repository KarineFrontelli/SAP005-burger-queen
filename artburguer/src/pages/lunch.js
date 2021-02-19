import React, { useState, useHistory, useEffect } from "react";



const MenuLunch = () => {
  // const history = useHistory();
  // const back = () => {
  //   history.push("/");
  // };

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
    });
  },[]);

  return (
    <div className="container-lunch">
      {/* <button onClick={back}>Sair</button> */}

      <div className="container-cardapio">
        <h1>Lanches e Bebidas</h1>

        {lunch &&
          lunch.map((item) => (
            <div className="container-cardapio">
              <h1>{item.name}</h1>
              <h1>R${item.price},00</h1>
            </div>
          ))}
      </div>
    </div>
  );
  
};

export default MenuLunch;
