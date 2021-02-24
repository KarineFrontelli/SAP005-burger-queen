import React, { useEffect, useState } from "react";

function MenuLunch() {
  const token = localStorage.getItem("token");
  const [menu, setmenu] = useState("");

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
        const menu = lunch.reduce((unique, item) => unique.includes(item.name) ? unique : [...unique, item.name], []);
        
        setmenu(menu);
       console.log(menu);
      }); 
  }, []);

  return (
    <div className="container-all-day">

      <div className="container-cardapio">
        {menu &&
          menu.map(({id, name , price}) => (
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
