import React, { useEffect, useState } from "react";

function MenuLunch() {
  const token = localStorage.getItem("token");
  const [menuAllday, setMenuAllday] = useState("");

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
        const menuAllday = lunch.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name && t.name === item.name));
        setMenuAllday(menuAllday);
        console.log(menuAllday);
      }); 
  }, []);

  return (
    <div className="container-all-day">

      <div className="container-cardapio">
        {menuAllday &&
          menuAllday.map(({id, name , price}) => (
            <div key={id}className="container-itens-lunch">
              <h6>{name} {' '} R${price},00</h6>
              {/* <h6>R${price},00</h6> */}
            </div>
          ))}
      </div>
    </div>
  );
}
export default MenuLunch;
