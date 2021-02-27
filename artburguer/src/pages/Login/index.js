import { React, useState } from "react";
import logo from "../img/hamburgernovo.png";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../Components/Footer";

const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const rota = useHistory();

  function login(event) {
    event.preventDefault();
    let canLogin = false;
    let emailOk = false;
    let passwordOk = false;

    if (email.length === 0) {
      setMsg("Email está em branco!");
    } else {
      emailOk = true;
    }

    if (password.length === 0) {
      setMsg("Password deve ser preenchido!");
    } else {
      passwordOk = true;
    }

    if (emailOk === true && passwordOk === true) {
      canLogin = true;
    }

    if (canLogin === true) {
      event.preventDefault();
      fetch("https://lab-api-bq.herokuapp.com/auth", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&password=${password}`,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const token = json.token;
          const id = json.id;
          const tokenUser = localStorage.setItem("token", token);
          const idUser = localStorage.setItem("id", id);
          rota.push(`/${json.role}`);
        });
    }
  }
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <form>
            <img src={logo} className="App-logo" alt="logo" />

            <div className="App-formInput">
              <MDBInput
                label="Email *"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                onChange={(event) => setEmail(event.target.value)}
              />
              <MDBInput
                label="Senha *"
                icon="lock"
                group
                type="password"
                validate
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="text-center py-4 mt-3 ">
              <MDBBtn
                className="App-btn"
                color="orange"
                type="submit"
                onClick={login}
              >
                Efetue Login
              </MDBBtn>
            </div>

            <div>
              <p className="App-funcionario">Funcionário novo?</p>
            </div>
            <div className="App-cadaster">
              <Link to="/register">Cadastre-se</Link>
              {msg !== "" && <p>{`${msg}`}</p>}
            </div>
            <Footer />
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default AppLogin;
