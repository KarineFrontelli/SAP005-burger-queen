import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function MenuLunch() {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </React.Fragment>
    );
  }

  const token = localStorage.getItem("token");
  const [menuAllday, setMenuAllday] = useState("");
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
        
        const menuAllday = lunch.filter((item) => item.sub_type === "hamburguer");
        setMenuAllday(menuAllday);
        console.log(menuAllday);
      });
  }, []);

  return (
    <section className="container-allday">
      <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={9} spacing={5}>
          
        
        
      {menuAllday &&
        menuAllday.map((item, index) => (
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
            <p>{item.name}</p>
            <p>{item.flavor}</p>
            <p>{item.complement}</p>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price)}
            </p>
          </div>
        ))}
        </Grid>
      </Grid>
      </div>
      <div className="container-pedidos">
        {console.log(produto)}
        {produto.length > 0 &&
          produto.map((item, index) => (
            <div className="pedido" key={index}>
              <h2>{item.name}</h2>
              <h2>{item.flavor}</h2>
              <h2>{item.complement}</h2>
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
}
export default MenuLunch;
