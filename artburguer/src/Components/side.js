import React , {useState, useEffect}from "react";
import DeleteIcon from "@material-ui/icons/Delete";


const OptionsSide = () =>{

   
        const token = localStorage.getItem("token");
        const [lunch, setlunch] = useState("");
        const [Simples, setSimples] = useState("");
        const [drinks, setDrinks] = useState("");

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
            setlunch(lunch);
            const Simples = lunch.filter((item) => item.sub_type === "side");
            setSimples(Simples);
            const drinks = lunch.filter((item) => item.sub_type === "drinks");
            setDrinks(drinks);
        });
        }, []);
        
  return(
  <section className="container-allday">
      {Simples &&
        Simples.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              const name = item.name;
              const price = item.price;
              const id = item.id;
              const qtd = 1;
              const initialPrice = item.price;
              const objeto = {
                name,
                price,
                id,
                qtd,
                initialPrice,
              };
              // handleItem(objeto);
            }}
            className="container-itens"
          >
            <h2>{item.name}</h2>
            <h2>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price)}
            </h2>
          </div>
        ))}
        {drinks &&
        drinks.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              const name = item.name;
              const price = item.price;
              const id = item.id;
              const qtd = 1;
              const initialPrice = item.price;
              const objeto = {
                name,
                price,
                id,
                qtd,
                initialPrice,
              };
              // handleItem(objeto);
            }}
            className="container-itens"
          >
            <h2>{item.name}</h2>
            <h2>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price)}
            </h2>
          </div>
        ))}
    </section>
  );
  
  
};

export default OptionsSide;