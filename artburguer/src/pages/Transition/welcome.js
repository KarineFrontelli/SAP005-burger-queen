import { useRadioGroup } from "@material-ui/core";
import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const WelcomePage = ()=> {
    const history = useHistory();
    function Rota(){
        history.push('/salao')
    };
    function RotaOrders(){
        history.push('/orders')
    };
    return(
        <>
        <header>
            <Header />
        </header>
        <section>
        <h3>Bem vindo {}!</h3>
        <div>
            <button type="submit" onClick={Rota}>Fazer Pedido</button>
            <button type="submit"onClick={RotaOrders}>Pedidos prontos</button>
        </div>
        </section>
        <footer>
            <Footer />
        </footer>
        </>
    )
};

export default WelcomePage