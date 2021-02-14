import React from "react";
import axios from "axios";

import "../Styles/Inicio_page.css";

import { Link, Redirect } from "react-router-dom";

const Año = new Date();
const AñoY = Año.getFullYear();
console.log(AñoY);
class Inicio_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nombre: "",
        foto: "",
        prioridad: "",
        fecha_vencimiento: "",
        id_usuario: "",
      },
      datos: [],
      id_usuario: "60294a0c2318f1398c0580d6",
    };
  }

  //Petición post para agregar nuevas tareas
  post_usuario = async () => {
    await axios
      .post(`http://localhost:4545/tareas/new-tarea`, {
        nombre: "Trabajo de gestor de tareas",
        foto:
          "https://media.cnnchile.com/sites/2/2019/07/1505975578830-1505732141447-rnm-740x430.jpeg",
        prioridad: "Alta",
        fecha_vencimiento: "2021-02-15",
        id_usuario: "60294a0c2318f1398c0580d6",
      })
      .then((res) => {
        console.log("Se ha creado una nueva tarea");
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

  //Petición get para traer todos los grupos
  componentWillMount() {
    axios
      .get(
        `http://localhost:4545/tareas/all-tareas-usuario/${this.state.id_usuario}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          datos: res.data,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }
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
    console.log(this.state.datos);
    const tareasUsuario = this.state.datos;

    return (
      <>
        {/* MODAL NUEVA TAREA */}
        <div
          className="modal fade"
          id="imgUpload"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Crear nueva tarea
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" novalidate="">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label for="firstName" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        onChange={this.handleChange}
                        name="nombre"
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <label for="lastName" className="form-label">
                        Prioridad
                      </label>

                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        name="prioridad"
                      >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="email" className="form-label">
                        Fecha Vencimiento
                      </label>
                      <input
                        type="date"
                        id="start"
                        className="form-control"
                        name="trip-start"
                        min={AñoY + "-01-" + "01"}
                        max={AñoY + "-12-" + "31"}
                        onChange={this.handleChange}
                        name="fecha_vencimiento"
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="address" className="form-label">
                        Foto
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        onChange={this.handleChange}
                        name="contrasena"
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>
                    <div className="foto-perfil-subida-img-trabajador">
                      <img
                        className="foto-perfil-img-trabajador"
                        id="fotoPrev"
                        src="https://us.123rf.com/450wm/naropano/naropano1606/naropano160600550/58727711-fondo-gris-oscuro-el-dise%C3%B1o-de-textura-fondo-del-grunge-.jpg?ver=6"
                        alt="FOTOPERFIL"
                      />
                    </div>
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btnimgUploader btn-danger"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btnimgUploader btn-primary"
                  data-dismiss="modal"
                  onClick={this.peticionPut}
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FIN MODAL */}

        <header>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container">
              <img
                src="https://1.bp.blogspot.com/-9phAiObUAOk/X8BdHu3MhvI/AAAAAAAAIq8/re7gbeTQ214vkvIgjFiys4hNdQIs-eKAACLcBGAsYHQ/s999/login.png"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                aria-hidden="true"
                className="me-2"
                viewBox="0 0 24 24"
              />
              <strong>Emanuel Acevedo</strong>

              <div
                className="btn btn-primary"
                type="button"
                data-toggle="modal"
                data-target="#imgUpload"
              >
                Nuevo
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {tareasUsuario.map((datosT) => {
                  return (
                    <div className="col">
                      <div className="card shadow-sm">
                        <img
                          src={datosT.foto}
                          width="100%"
                          height="225"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          aria-hidden="true"
                          className="me-2"
                          viewBox="0 0 24 24"
                        />

                        <div className="card-body">
                          <p className="card-text">{datosT.nombre}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                              >
                                Eliminar
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                              >
                                Editar
                              </button>
                            </div>
                            <small className="text-muted">
                              {datosT.fecha_vencimiento}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Inicio_page;
