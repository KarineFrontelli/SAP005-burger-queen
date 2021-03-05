import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Breakfast = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [coffee, setCoffe] = useState("");
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
          qtd: item.qtd,
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
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
        "Access-Control-Allow-Origin": "*",
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
            className="container-itens"
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
          >
            <p>{item.name}</p>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price)}
            </p>
          </div>
        ))}

      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map((item, index) => (
            <div className="pedido" key={index}>
              <p>{item.name}</p>
              <p>Qtd: {item.qtd}</p>
              <p>
                {""}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </p>
              <IconButton
                className="btn-adicionar"
                type="submit"
                onClick={() => handleAdicionaItem(index)}
              >
                <AddBoxIcon />
              </IconButton>
              <IconButton
                className="btn-remover"
                type="submit"
                onClick={() => handleRemoverItem(index)}
              >
                <IndeterminateCheckBoxIcon />
              </IconButton>
              <IconButton
                className="btn-delete"
                aria-label="delete"
                className="btn-deletar"
                type="submit"
                onClick={() => handleRemoveItem(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        <div className="App-valor-total">
          <h2>
            Valor Total:{" "}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          </h2>
        </div>
      </div>
      {/* <button
        className="btn-enviar-cozinha"
        type="submit"
        onClick={handleEnviar}
      >
        Enviar para cozinha
      </button> */}
      <Button
        variant="contained"
        color="secundary"
        className={classes.button}
        // endIcon={<Icon>send</Icon>}
        // className="btn-enviar-cozinha"
        // type="submit"
        onClick={handleEnviar}
      >
        Preparar
      </Button>
    </section>
  );
};
export default Breakfast;
