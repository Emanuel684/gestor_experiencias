import React from "react";

import "../Styles/Inicio_page.css";

import { Link } from "react-router-dom";

class Inicio_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="HeaderSisContainer-HeaderSistema_Maestros">
          <div className="HeaderSisContainer2-HeaderSistema_Maestros">
            <div className="LogoSistema-HeaderSistema_Maestros">
              <img
                className="logo-HeaderSistema_Maestros"
                src="https://images.vexels.com/media/users/3/224155/isolated/preview/f4bbe191bcc833b27d7fa241220c470e-libro-en-logo-de-pantalla-by-vexels.png"
              />
            </div>
            <div className="titleSisRContainer-HeaderSistema_Maestros">
              <h1 className="titleGeek-HeaderSistema_Maestros">Colegio Geek</h1>
              <h3 className="SubtitleGeek-HeaderSistema_Maestros">Hola</h3>
            </div>
            <div className="bContainer-HeaderSistema_Maestros">
              <Link
                to={{
                  pathname: "/",
                }}
              >
                <button className="button">Regresar</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Inicio_page;
