import React, { useState, useEffect} from 'react';

const AllDayMenu = () =>{
    const token = localStorage.getItem("token");
const [lunch, setlunch] = useState("");
  
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
          // const lunch = lunch.reduce((unique, item) => unique.includes(item.name) ? unique : [...unique, item.name], []);
    
    console.log(lunch);
}); 
}, []);

return setlunch(lunch);

};

export default AllDayMenu;
