import React, { useState, useEffect } from "react";

function cafe() {
  useEffect(() => {
    getProducts();
  }, []);

  const [cafe, setCafe] = useState("");
  const token = localStorage.getItem("token");

  const getProducts = () => {
    fetch("https://lab-api-bq.herokuapp.com/produtcs", {
      headers: {
        accept: "application/json",
        "Authorization:": `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const cafeMenu = json.filter((item) => item.type === "breakfast");
        setCafe(cafeMenu);
      });
  };
}
export default cafe;
