import React from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const WelcomePage = () => {
  const history = useHistory();
  function Rota() {
    history.push("/lounge");
  }
  function RotaOrders() {
    history.push("/orders");
  }
  return (
    <>
      <div className="App-background">
        <header>
          <Header />
        </header>
        <section>
          <h3 className="App-welcome"> </h3>
          <div>
            <button className="btn-tela-grafite" type="submit" onClick={Rota}>
              NOVO PEDIDO
            </button>
            <button
              className="btn-tela-grafite"
              type="submit"
              onClick={RotaOrders}
            >
              PEDIDOS PRONTOS
            </button>
          </div>
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default WelcomePage;
