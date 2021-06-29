import React from "react";
import axios from "axios";

import "../Styles/Registro_page.css";

import { Redirect, Link } from "react-router-dom";

class Login_usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nombres: "",
        apellidos: "",
        correo_electronico: "",
        contrasena: "",
        confirmar_contrasena: "",
      },
      Bool1: false,
    };
  }

  //Petición post para agregar nuevos usuarios
  post_usuario = async () => {
    await axios
      .post(`http://localhost:4040/usuarios/new-usuario`, {
        nombres: this.state.form.nombres,
        apellidos: this.state.form.apellidos,
        correo_electronico: this.state.form.correo_electronico,
        contrasena: this.state.form.contrasena,
      })
      .then((res) => {
        console.log("Se ha creado un nuevo usuario");
        this.post_email();
        this.setState({ Bool1: true });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

  //Petición post para enviar un correo al nuevo usuario
  post_email = async () => {
    await axios
      .post(`http://localhost:4040/nodemailer/send-register`, {
        to: this.state.form.correo_electronico,
        subject: "Bienvenido!!",
        full_name: `${
          this.state.form.nombres + " " + this.state.form.apellidos
        }`,
      })
      .then((res) => {
        console.log("res.data:", res.data);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

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
        <div className="bg-light">
          <div className="container">
            <main>
              <div className="py-5 text-center">
                <Link to="/">
                  <div
                    className="btn btn-danger"
                    type="button"
                    data-toggle="modal"
                    data-target="#imgUpload"
                  >
                    Regresar
                  </div>
                </Link>
                <h2>Advertencia</h2>
                <p className="lead">
                  Asegúrese que la información subministrada este correctamente
                  digitada.
                </p>
              </div>

              <div>
                <div>
                  <h4 className="mb-3">Formulario de registro</h4>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label for="firstName" className="form-label">
                        Nombres
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        onChange={this.handleChange}
                        name="nombres"
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <label for="lastName" className="form-label">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        onChange={this.handleChange}
                        name="apellidos"
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                        onChange={this.handleChange}
                        name="correo_electronico"
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="address" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="address"
                        placeholder="Contraseña"
                        onChange={this.handleChange}
                        name="contrasena"
                      />
                    </div>

                    <div className="col-12">
                      <label for="address2" className="form-label">
                        Confimar Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="address2"
                        placeholder="Confirmar contraseña"
                        onChange={this.handleChange}
                        name="confirmar_contrasena"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-primary btn-lg"
                    onClick={this.post_usuario}
                  >
                    Registrarse
                  </button>
                  {/* Login */}
                  {this.state.Bool1 && (
                    <Redirect
                      to={{
                        pathname: "/",
                      }}
                    ></Redirect>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default Login_usuarios;
