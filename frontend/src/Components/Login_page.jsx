import React from "react";
import axios from 'axios';

import "../Styles/Login_page.css";

import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

class Login_usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        correo_electronico: null,
        numero_documento: null,
      },
      login: false,
      token: null,
      datos: [],
      datos_user: null,
      datos_user2: null,
      Bool1: false,
      Bool2: false,
      Bool3: false,
    };
  }


  login = async () => {
    await axios
      .post(`http://localhost:4535/api/login`, {
        tipo_usuario: this.state.form.tipo_usuario,
        correo_electronico: this.state.form.correo_electronico,
        numero_documento: this.state.form.numero_documento,
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
      .get(`http://localhost:4535/api/privada`, {
        headers: {
          Authorization: `${token_authorization}`,
        },
      })
      .then((res) => {
        this.setState({ datos_user: res.data.data });
        this.Ingreso();
        console.log(res);
        console.log(res.data);
        console.log(res.data.data.id_persona);
        this.setState({ id_persona: res.data.id_persona });
        console.log(this.state.id_persona);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  Ingreso = async () => {
    await axios
      .get(
        `http://localhost:4535/api/user-datos/${this.state.datos_user.id_persona}/${this.state.datos_user.tipo_usuario}`
      )
      .then((res) => {
        console.log(
          "Esta es la informacion de la tabla del usuario logeado:",
          res.data[0]
        );
        console.log("Tipo_usuario:", this.state.datos_user.tipo_usuario);
        if (this.state.datos_user.tipo_usuario == "Estudiante") {
          console.log("Esta es la res.data[0]", res.data[0]);
          // this.setState({datos_user2: res.data[0]})
          sessionStorage.setItem(
            "id_estudiante",
            JSON.stringify({
              id_estudiante: res.data[0].id_estudiante,
            })
          );
          this.setState({ Bool3: true });
        }
        if (this.state.datos_user.tipo_usuario == "Maestro") {
          //this.setState({datos_user2: res.data[0]})
          sessionStorage.setItem(
            "id_maestro",
            JSON.stringify({
              id_maestro: res.data[0].id_maestro,
            })
          );
          this.setState({ Bool2: true });
        }
        if (this.state.datos_user.tipo_usuario == "Directivo") {
          //this.setState({datos_user2: res.data[0]})
          sessionStorage.setItem(
            "id_directivo",
            JSON.stringify({
              id_directivo: res.data[0].id_directivo,
            })
          );
          this.setState({ Bool1: true });
        }
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };


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
            <form>
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
                placeholder="Email address"
                required=""
                autofocus=""
              />
              <label for="inputPassword" className="visually-hidden">
                Contraseña
              </label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required=""
              />
              <div className="checkbox mb-3"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Ingresar
              </button>
              <hr/>
              <Link to="/registro">
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Registrarse
              </button>
              </Link>
              <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login_usuarios;
