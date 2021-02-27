import React , {useState, useEffect}from "react";
import DeleteIcon from "@material-ui/icons/Delete";


const OptionsSide = () =>{

   
        const token = localStorage.getItem("token");
        const [lunch, setlunch] = useState("");
        const [Simples, setSimples] = useState("");
        const [produto, setProduto] = useState([]);
  const [total, setTotal] = useState(0);
  const nomeCliente = sessionStorage.getItem("cliente");
  const numeroMesa = sessionStorage.getItem("mesa");

  const handleRemoveItem = (indice) => {
    const ItensFiltrados = produto.filter((_, index) => indice != index);
    setProduto(ItensFiltrados);
    console.log(indice);
  };

  const handleAdicionaItem = (index) => {
    let newArrayProduto = [...produto];
    newArrayProduto[index].qtd++;
    newArrayProduto[index].price =
      newArrayProduto[index].initialPrice * newArrayProduto[index].qtd;
    setProduto(newArrayProduto);
  };

  const handleRemoverItem = (index) => {
    let newArrayProduto = [...produto];
    newArrayProduto[index].qtd--;
    newArrayProduto[index].price =
      newArrayProduto[index].initialPrice * newArrayProduto[index].qtd;
    setProduto(newArrayProduto);
  };

  useEffect(() => {
    const soma = produto.reduce(
      (valorAnterior, valorAtual) => valorAnterior + valorAtual.price,
      0
    );
    setTotal(soma);
  }, [produto]);

  const handleEnviar = () => {
    setTotal(produto.reduce((prevTotal, total) => prevTotal + total.price, 0));
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        client: nomeCliente,
        table: numeroMesa,
        products: produto.map((item) => ({
          id: Number(item.id),
          qtd: 1,
        })),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
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
            const lunch = json.filter((item) => item.type === "all-day");  
            setlunch(lunch);
            const Simples = lunch.filter((item) => item.sub_type === "side");
            setSimples(Simples);
        });
        }, []);
        
  return(
  //   <div>
  //       <h4>Acompanhamentos e Bebidas</h4>
  //       <div>
  //           {Simples &&
  //         Simples.map(({index , price, name}) => (
  //           <div key={index}className="container-itens-lunch">
  //             <h6>{name}</h6>
  //             <h6>{Intl.NumberFormat("pt-BR", {
  //                 style: "currency",
  //                 currency: "BRL",
  //               }).format(price)}</h6>
  //           </div>))}
  //       </div>  
  //   </div>
  // )

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
              handleItem(objeto);
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

      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map((item, index) => (
            <div className="pedido" key={index}>
              <h2>{item.name}</h2>
              <h2>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </h2>
              <button
                className="btn-adicionar"
                type="submit"
                onClick={() => handleAdicionaItem(index)}
              >
                +
              </button>
              <button
                className="btn-remover"
                type="submit"
                onClick={() => handleRemoverItem(index)}
              >
                -
              </button>

              <button
                className="btn-deletar"
                type="submit"
                onClick={() => handleRemoveItem(index)}
              >
                {<DeleteIcon />}
              </button>
            </div>
          ))}
        <p className="App-valor-total">
          Valor Total:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </p>
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

export default OptionsSide;