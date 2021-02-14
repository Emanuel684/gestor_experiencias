import React from "react";

import "../Styles/Login_page.css";

import { BrowserRouter as Router, Redirect } from "react-router-dom";

class Login_usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        correo_electronico: null,
        numero_documento: null,
      },
    };
  }


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
        <div className="Main2Container-Login_page">
          <div id="SelecContainer-Login_page">
            <form id="Palborde-Login_page" onSubmit={this.handleSubmit}>
              <p>Correo electrónico:</p>
              <input
                type="text"
                id="UsuarioI-Login_page"
                className="input-Login_page"
                placeholder="correo@ejemplo.com"
                autoComplete="off"
                onChange={this.handleChange}
                name="correo_electronico"
              ></input>
              <p>Contraseña:</p>
              <input
                type="password"
                id="ContraseñaI"
                className="input-Login_page"
                placeholder="Ingrese su documento"
                autoComplete="off"
                onChange={this.handleChange}
                name="numero_documento"
              ></input>
              <div id="SoloParaCentrar">
                <button
                  type="button"
                  className="button button2-Login_page"
                >
                  Ingresar
                </button>
                <button type="button"
                  className="button button2-Login_page"
                >
                    Registrarse
                </button>

              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login_usuarios;