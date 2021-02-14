import React from "react";

import "../Styles/Registro_page.css";

import { BrowserRouter as Router, Redirect } from "react-router-dom";

class Login_usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nombres: "",
        apellidos: "",
        correo_electronico: "",
        contrasena: "",
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
        <div className="Main2Container-Registro_page">
          <div id="SelecContainer-Registro_page">
            <div id="Form2_21">
              <img
                className="ImgProfile"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
              />
              <div>
                <img
                  src="https://img.icons8.com/carbon-copy/2x/camera--v2.png"
                  alt="Profile img"
                  className="inline"
                  style={{ height: 3 + "vw", marginLeft: 0 }}
                />
                <p className="inline">Foto de perfil</p>
              </div>
              <input
                accept="image/*"
                id="contained-button-pdf"
                type="file"
                onChange={this.handleChange}
                name="foto_perfil"
              />
            </div>
            <div id="Form2_2">
              <div className="Form2_2_2">
                <input
                  className="REInput"
                  id="NombreIn"
                  placeholder="Nombres"
                  autoComplete="off"
                  onChange={this.handleChange}
                  name="nombres"
                />
                <input
                  className="REInput"
                  id="ApellidoIn"
                  placeholder="Apellidos"
                  autoComplete="off"
                  onChange={this.handleChange}
                  name="apellidos"
                />
              </div>
            </div>
            <div id="Form2_2">
              <div className="Form2_2_2">
                <input
                  className="REInput"
                  id="CorreoIn"
                  type="text"
                  placeholder="Correo electronico"
                  autoComplete="off"
                  onChange={this.handleChange}
                  name="correo_electronico"
                />
                <input
                  className="REInput"
                  id="CorreoIn"
                  type="text"
                  placeholder="Contraseña"
                  autoComplete="off"
                  onChange={this.handleChange}
                  name="contrasena"
                />
              </div>
            </div>
            <div className="Form2_2_2">
              <input
                onClick={this.post_maestro}
                className="REInput"
                type="button"
                value="Agregar"
              />
              <input
                type="button"
                onClick={this.Cambio}
                className="REInput"
                value="Cancelar"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login_usuarios;
