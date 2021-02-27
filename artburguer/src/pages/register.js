import { React, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import logo from "../img/hamburgernovo.png";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import Footer from "../Components/Footer";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const rota = useHistory();

  const back = useHistory();
  const backLogin = () => {
    back.push("/");
  };

  function cadastrar(event) {
    event.preventDefault();
    let canRegister = false;
    let nameOk = false;
    let emailOk = false;
    let passwordOk = false;

    if (name.length === 0) {
      setMsg("Nome deve ser preenchido!");
    } else {
      nameOk = true;
    }

    if (email !== emailConfirm) {
      setMsg("Email não confere!");
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
      {
      }
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
            backLogin();
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
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <form>
            <img src={logo} className="App-logo" alt="logo" />

            <div className="App-formInput">
              <div>
                <MDBInput
                  className="p-3 mb-2 bg-transparent text-white"
                  size="lg"
                  label="Nome *"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <MDBInput
                className="p-3 mb-2 bg-transparent text-white"
                size="lg"
                label="Email *"
                icon="envelope"
                type="email"
                error="wrong"
                success="right"
                onChange={(event) => setEmail(event.target.value)}
              />
              <MDBInput
                className="p-3 mb-2 bg-transparent text-white"
                size="lg"
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
                className="p-3 mb-2 bg-transparent text-white"
                size="lg"
                label="Senha *"
                icon="lock"
                group
                type="password"
                validate
                onChange={(event) => setPassword(event.target.value)}
              />
              <MDBInput
                className="p-3 mb-2 bg-transparent text-white"
                size="lg"
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
                onClick={(event) => setRole("Salao")}
              >
                Salão
              </MDBBtn>
            </div>

            <div className="text-center py-0 mt-0 ">
              <MDBBtn color="orange" type="submit" onClick={cadastrar}>
                Criar login
              </MDBBtn>
              <div className="App-cadaster">
                {msg !== "" && <p>{`${msg}`}</p>}
              </div>
              {msg !== "" && <p>{`${msg}`}</p>}
            </div>
            <Footer />
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default App;
