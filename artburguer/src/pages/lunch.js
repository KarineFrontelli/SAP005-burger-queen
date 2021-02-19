import React, { useState } from "react";

const token = localStorage.getItem("token");

const MenuLunch = () => {
  return fetch("https://lab-api-bq.herokuapp.com/products", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const lunch = json.filter((item) => item.type === "all-day");

      console.log(lunch);
    });
};

export default MenuLunch;
