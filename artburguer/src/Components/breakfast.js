import React, { useEffect, useState } from "react";

const Breakfast = () => {
  const token = localStorage.getItem("token");
  const [coffee, setCoffe] = useState("");
  const [produto, setProduto] = useState([]);
  const [total, setTotal] = useState(0);

  const handleEnviar = () => {
    setTotal(produto.reduce((prevTotal, total) => prevTotal + total.price, 0));
    return total;
  };

  function handleItem(item) {
    setProduto((prevProduto) => [...prevProduto, item]);

    console.log(produto);
  }

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
    <section className="container-breakfast">
      {coffee &&
        coffee.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              const name = item.name;
              const price = item.price;
              const objeto = {
                name: name,
                price: price,
              };
              handleItem(objeto);
            }}
            className="container-itens"
          >
            <h2>{item.name}</h2>
            <h2>R${item.price},00</h2>
          </div>
        ))}

      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map((item) => (
            <div className="pedido" key={Math.random()}>
              <h2 key={Math.random()}>{item.name}</h2>
              <h2 key={Math.random()}>R${item.price},00</h2>
            </div>
          ))}
        <p className="App-valor-total">Valor Total: R${total},00</p>
      </div>
      <button
        className="btn-enviar-cozinha"
        type="submit"
        onClick={handleEnviar}
      >
        Enviar para cozinha
      </button>
    </section>
  );
};
export default Breakfast;
// const logout = () => {
//   const token  = localStorage.getItem("token");
//   localStorage.clear()
//   Back()
// }
