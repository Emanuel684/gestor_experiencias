import React from "react";
import axios from "axios";

import "../Styles/Login_page.css";

import { Redirect, Link } from "react-router-dom";

class Login_usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        correo_electronico: "",
        contrasena: "",
      },
      id_usuario: "",
      login: false,
      token: null,
      datos: [],
      datos_user: null,
      datos_user2: null,
      Bool1: false,
    };
  }

  login = async () => {
    await axios
      .post(`http://localhost:4040/api/login`, {
        correo_electronico: this.state.form.correo_electronico,
        contrasena: this.state.form.contrasena,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        this.setState({ token: res.data.token });
        console.log(this.state.token);
        if (
          res.data.message == "Asegurese de ingresar los datos correctamente."
        ) {
          console.log(res.data.message);
        } else {
          sessionStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              token: res.data.token,
            })
          );
          this.login2();
        }
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  login2 = async () => {
    let token_authorization = "bearer " + this.state.token;
    console.log(token_authorization);
    await axios
      .get(`http://localhost:4040/api/privada`, {
        headers: {
          Authorization: `${token_authorization}`,
        },
      })
      .then((res) => {
        this.setState({ datos_user: res.data.data });
        this.setState({ id_usuario: res.data.data.result[0]._id });
        console.log("id del usuario en el estado", this.state.id_usuario);
        this.Ingreso();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  Ingreso = async () => {
    if (this.state.id_usuario) {
      this.post_email();
      console.log(
        "Esta es el id_usuario en la funcion de ingreso",
        this.state.id_usuario
      );
      sessionStorage.setItem(
        "id_usuario",
        JSON.stringify({
          id_usuario: this.state.id_usuario,
        })
      );
      this.setState({ Bool1: true });
    }
  };

  //Petición post para enviar un correo al login
  post_email = async () => {
    await axios
      .post(`http://localhost:4040/nodemailer/send-login`, {
        to: this.state.form.correo_electronico,
        subject: "Bienvenido!!"
      })
      .then((res) => {
        console.log("res.data:", res.data);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

  //Petición get para traer todos los grupos
  componentWillMount = async () => {
    sessionStorage.setItem(
      "login",
      JSON.stringify({
        login: false,
      })
    );
  };
  // Fin get

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  render() {
    return (
      <>
        <div className="text-center">
          <div className="form-signin">
            <img
              className="mb-4"
              src="https://1.bp.blogspot.com/-9phAiObUAOk/X8BdHu3MhvI/AAAAAAAAIq8/re7gbeTQ214vkvIgjFiys4hNdQIs-eKAACLcBGAsYHQ/s999/login.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 fw-normal">Por favor, ingrese</h1>
            <label for="inputEmail" className="visually-hidden">
              Correo electronico
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Correo Electronico"
              onChange={this.handleChange}
              name="correo_electronico"
            />
            <label for="inputPassword" className="visually-hidden">
              Contraseña
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Contraseña"
              onChange={this.handleChange}
              name="contrasena"
            />
            <div className="checkbox mb-3"></div>
            <button
              className="w-100 btn btn-lg btn-primary"
              onClick={this.login}
            >
              Ingresar
            </button>
            <hr />
            <Link to="/registro">
              <button className="w-100 btn btn-lg btn-primary">
                Registrarse
              </button>
            </Link>
            {/* Login */}
            {this.state.Bool1 && (
              <Redirect
                to={{
                  pathname: "/login/inicio",
                }}
              ></Redirect>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Login_usuarios;
