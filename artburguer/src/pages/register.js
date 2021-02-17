import { React, useState } from "react";
import logo from "../img/hamburgernovo.png";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  function cadastrar(event) {
    let canRegister = false;
    let nameOk = false;
    let emailOk = false;
    let passwordOk = false;

    if (name.length === 0) {
      alert("Nome deve conter um valor!");
    } else {
      nameOk = true;
    }

    if (email !== emailConfirm) {
      alert("Email não confere!");
    } else {
      emailOk = true;
    }

    if (password !== passwordConfirm) {
      setMsg("Senhas não conferem!");
    } else {
      passwordOk = true;
    }

    if (nameOk === true && emailOk === true && passwordOk === true) {
      canRegister = true;
    }

    if (canRegister === true) {
      event.preventDefault();
      fetch("https://lab-api-bq.herokuapp.com/users/", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&password=${password}&role=${role}&restaurant=ArtBurger&name=${name}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            setMsg("Cadastro efetuado com sucesso!");
          }
          response.json();
        })
        .then((json) => {
          console.log(json);
        })
        .catch((error) => {
          setMsg(error.message);
        });
    }
  }
  return (
    <MDBRow>
      <MDBCol md="12">
        <form>
          <img src={logo} className="App-logo" alt="logo" />

          <div className="App-formInput">
            <MDBInput
              label="Nome *"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              onChange={(event) => setName(event.target.value)}
            />
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
              label="Confirme seu email *"
              icon="exclamation-triangle"
              group
              type="email"
              validate
              error="wrong"
              success="right"
              onChange={(event) => setEmailConfirm(event.target.value)}
            />
            <MDBInput
              label="Senha *"
              icon="lock"
              group
              type="password"
              validate
              onChange={(event) => setPassword(event.target.value)}
            />
            <MDBInput
              label="Confirme sua senha *"
              icon="exclamation-triangle"
              group
              type="password"
              validate
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <p className="App-atuacao">Escolha aréa de atuação</p>
          <div className="text-center">
            <MDBBtn
              color="white"
              value="cozinha"
              onClick={(event) => setRole("Cozinha")}
            >
              Cozinha
            </MDBBtn>
            <MDBBtn
              color="white"
              value="salao"
              onClick={(event) => setRole("Salão")}
            >
              Salão
            </MDBBtn>
          </div>

          <div className="text-center py-0 mt-0 ">
            <MDBBtn color="orange" type="submit" onClick={cadastrar}>
              Criar login
            </MDBBtn>
            {msg !== "" && <p>{`${msg}`}</p>}
          </div>

          <div>
            <MDBContainer className="App-footer">
              &copy; {new Date().getFullYear()} Projeto desenvolvido por:{" "}
              <a href="https://github.com/KarineFrontelli/">
                {" "}
                Karine Frontelli{" "}
              </a>{" "}
              e <a href="https://github.com/rebecaCanesin"> Rebeca Canesin</a>
            </MDBContainer>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  );
};
export default App;
