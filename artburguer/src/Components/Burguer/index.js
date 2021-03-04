import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function MenuLunch() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [lunch, setLunch] = useState("");
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
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        client: nomeCliente,
        table: numeroMesa,
        products: produto.map((item) => ({
          flavor: item.flavor,
          complement: item.complement,
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
        setLunch(lunch);
      });
  }, []);

  return (
    <section className="container-allday">
      {lunch &&
        lunch.map((item, index) => (
          <div
            className="container-itens"
            key={index}
            onClick={(e) => {
              const name = item.name;
              const price = item.price;
              const id = item.id;
              const qtd = 1;
              const initialPrice = item.price;
              const complement = item.complement;
              const flavor = item.flavor;
              const objeto = {
                name,
                price,
                id,
                qtd,
                initialPrice,
                complement,
                flavor,
              };
              handleItem(objeto);
            }}
            className="container-itens"
          >
            <p>
              {item.name} {item.flavor} {item.complement}
              {""}
            </p>

            {/* <p> R${item.price}</p> */}

            {/* <p>{item.flavor} </p>
            <p>{item.complement}</p> */}

            <p className="price">
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
              <h2>
                {item.name} {item.flavor} {item.complement}
              </h2>
              <div>
                <h2>Qtd: {item.qtd}</h2>
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
              </div>
              <h2>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </h2>

              <IconButton
                aria-label="delete"
                className="btn-deletar"
                type="submit"
                onClick={() => handleRemoveItem(index)}
              >
                {<DeleteIcon />}
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
}
export default MenuLunch;
