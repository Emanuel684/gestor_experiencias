import React from "react";
import axios from "axios";
import toastr from "toastr";

import "../Styles/Inicio_page.css";
import "../Styles/toastr.css";

import { Link, Redirect } from "react-router-dom";

const Año = new Date();
const AñoY = Año.getFullYear();
class Inicio_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      File: null,
      foto: "",
      form: {
        nombre: "",
        prioridad: "",
        fecha_vencimiento: "",
        id_usuario: "",
      },
      datos_alta: [],
      datos_media: [],
      datos_baja: [],
      id_usuario: JSON.parse(sessionStorage.getItem("id_usuario")),
      id_tarea: "",
      datos_tarea: [],
      boolLogin: false,
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
    console.log("handleChange", this.state.form);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      nombre: this.state.form.nombre,
      prioridad: this.state.form.prioridad,
      fecha_vencimiento: this.state.form.fecha_vencimiento,
      id_usuario: this.state.form.id_usuario,
    };
    console.log("handleSubmit:", user);
  };

  alertas = async () => {
    {
      this.state.datos_alta.map((datosT) => {
        return (
          <>
            <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.2/css/toastr.min.css"
            />
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.2/js/toastr.min.js"></script>
            <script
              src="https://code.jquery.com/jquery-3.5.1.min.js"
              integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
              crossorigin="anonymous"
            ></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
            {toastr.error(datosT.nombre, "Esta tarea se vencera pronto.", {
              closeButton: true,
              debug: true,
              newestOnTop: true,
              progressBar: true,
              positionClass: "toast-top-right",
              preventDuplicates: false,
              onclick: null,
              showDuration: "300",
              hideDuration: "1000",
              timeOut: 0,
              extendedTimeOut: 0,
              showEasing: "swing",
              hideEasing: "linear",
              showMethod: "fadeIn",
              hideMethod: "fadeOut",
              tapToDismiss: false,
            })}
          </>
        );
      });
    }
  };

  delete_tarea = async () => {
    console.log("Esta es el id de la tarea:", this.state.id_tarea);
    await axios
      .delete(
        `http://localhost:4545/tareas/delete-tarea/${this.state.id_tarea}`
      )
      .then((res) => {
        console.log("Se ha eliminado una tarea.");
        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  upgrade_tarea_get = async () => {
    axios
      .get(
        `http://localhost:4545/tareas/tarea-upgrade-usuario/${this.state.id_tarea}`
      )
      .then((res) => {
        console.log("datos get:", res.data);
        this.setState({
          form: {
            nombre: res.data[0].nombre,
            prioridad: res.data[0].prioridad,
            fecha_vencimiento: res.data[0].fecha_vencimiento,
            id_usuario: res.data[0].id_usuario,
          },
        });
        this.setState({
          foto: res.data[0].foto,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  upgrade_tarea_put = async () => {
    console.log("upgrade foto:", this.state.foto);
    await axios
      .put(`http://localhost:4545/tareas/info-tarea/${this.state.id_tarea}`, {
        nombre: this.state.form.nombre,
        foto: this.state.foto,
        prioridad: this.state.form.prioridad,
        fecha_vencimiento: this.state.form.fecha_vencimiento,
        id_usuario: this.state.id_usuario.id_usuario,
      })
      .then((res) => {
        console.log("res.data", res.data);
        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  //Petición post para agregar nuevas tareas
  post_tarea = async () => {
    console.log("foto post", this.state.form.foto);
    console.log("formulario post:", this.state.form);
    console.log("foto", this.state.foto);
    await axios
      .post(`http://localhost:4545/tareas/new-tarea`, {
        nombre: this.state.form.nombre,
        foto: this.state.foto,
        prioridad: this.state.form.prioridad,
        fecha_vencimiento: this.state.form.fecha_vencimiento,
        id_usuario: this.state.id_usuario.id_usuario,
      })
      .then((res) => {
        console.log("Se ha creado una nueva tarea");
        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

  //Petición get para traer todos los grupos
  componentWillMount = async () => {
    console.log(
      "sessionStorage de login null:",
      JSON.parse(sessionStorage.getItem("login"))
    );
    console.log(
      "sessionStorage de login:",
      JSON.parse(sessionStorage.getItem("login")).login
    );
    console.log("if hola", JSON.stringify(sessionStorage.getItem("login")));
    if (JSON.parse(sessionStorage.getItem("login")).login) {
      console.log("Se ejecuto el else if");
      await axios
        .get(
          `http://localhost:4545/tareas/all-tareas-usuario-alta/${this.state.id_usuario.id_usuario}`
        )
        .then((res) => {
          console.log(res.data);
          this.setState({
            datos_alta: res.data,
          });
          this.get_datos_media();
          this.alertas();
        })
        .catch((err) => {
          console.log(err.massage);
        });
    } else {
      console.log("Se ejecuto el else");

      this.setState({ boolLogin: true });
    }
  };
  // Fin get

  get_datos_media = async () => {
    await axios
      .get(
        `http://localhost:4545/tareas/all-tareas-usuario-media/${this.state.id_usuario.id_usuario}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          datos_media: res.data,
        });
        this.get_datos_baja();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  get_datos_baja = async () => {
    await axios
      .get(
        `http://localhost:4545/tareas/all-tareas-usuario-baja/${this.state.id_usuario.id_usuario}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          datos_baja: res.data,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      File: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = async () => {
    const data = new FormData();
    data.append("file", this.state.File);
    await axios
      .post(`http://localhost:4545/imageupload`, data)
      .then((res) => {
        console.log("Se ha subido una imagen");
        console.log(res);
        document.getElementById("fotoPrev2").src = res.data;
        this.setState({
          foto: res.data,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  render() {
    console.log(this.state.datos);
    const tareasUsuarioAlta = this.state.datos_alta;
    const tareasUsuarioMedia = this.state.datos_media;
    const tareasUsuarioBaja = this.state.datos_baja;

    return (
      <>
        {/* MODAL EDITAR TAREA */}
        <div
          className="modal fade"
          id="editarTarea"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Editar tarea
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
                <form
                  className="needs-validation"
                  novalidate=""
                  onSubmit={this.handleSubmit}
                >
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label for="firstName" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder={this.state.form.nombre}
                        onChange={this.handleChange}
                        name="nombre"
                      />
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
                        <option value="">{this.state.form.prioridad}</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label for="email" className="form-label">
                        Fecha Vencimiento
                      </label>
                      <input
                        type="date"
                        id="start"
                        className="form-control"
                        value={this.state.form.fecha_vencimiento.slice(0, 10)}
                        min={AñoY + "-01-" + "01"}
                        max={AñoY + "-12-" + "31"}
                        onChange={this.handleChange}
                        name="fecha_vencimiento"
                      />
                    </div>

                    <div className="col-12">
                      <label for="address" className="form-label">
                        Foto
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        id="FOTO1"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                      <div className="foto-tarea-img">
                        <img
                          className="foto-tarea-img-ver"
                          id="fotoPrev1"
                          src={this.state.foto}
                          alt="FOTO"
                        />
                      </div>
                      <div className="foto-tarea-img">
                        <button
                          type="button"
                          className="btn btnimgUploader btn-primary"
                          onClick={this.onClickHandler}
                        >
                          Subir
                        </button>
                      </div>
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
                  type="submit"
                  className="btn btnimgUploader btn-primary"
                  data-dismiss="modal"
                  onClick={this.upgrade_tarea_put}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FIN MODAL */}
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
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
                <form
                  className="needs-validation"
                  novalidate=""
                  onSubmit={this.handleSubmit}
                >
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label for="firstName" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Nombre de la tarea"
                        onChange={this.handleChange}
                        name="nombre"
                      />
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
                        <option value="">Seleccionar</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
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
                    </div>

                    <div className="col-12">
                      <label for="address" className="form-label">
                        Foto
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        id="FOTO"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                      <div className="foto-tarea-img">
                        <img
                          className="foto-tarea-img-ver"
                          id="fotoPrev2"
                          src="https://us.123rf.com/450wm/naropano/naropano1606/naropano160600550/58727711-fondo-gris-oscuro-el-dise%C3%B1o-de-textura-fondo-del-grunge-.jpg?ver=6"
                          alt="FOTO"
                        />
                      </div>
                      <div className="foto-tarea-img">
                        <button
                          type="button"
                          className="btn btnimgUploader btn-primary"
                          onClick={this.onClickHandler}
                        >
                          Subir
                        </button>
                      </div>
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
                  type="submit"
                  className="btn btnimgUploader btn-primary"
                  data-dismiss="modal"
                  onClick={this.post_tarea}
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

              <div
                className="btn btn-primary"
                type="button"
                data-toggle="modal"
                data-target="#imgUpload"
              >
                Nueva tarea
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="album py-5 bg-light">
            <div className="container">
              <h1>Prioridad Alta</h1>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {tareasUsuarioAlta.map((datosT) => {
                  return (
                    <div className="col">
                      <div className="card shadow-sm" key={datosT._id}>
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
                                onClick={async () => {
                                  console.log(datosT._id);
                                  await this.setState({
                                    id_tarea: datosT._id,
                                  });
                                  this.delete_tarea();
                                }}
                              >
                                Eliminar
                              </button>
                              <div
                                type="button"
                                className="btn btn-sm btn-primary"
                                data-target="#editarTarea"
                                data-toggle="modal"
                                onClick={async () => {
                                  await this.setState({
                                    id_tarea: datosT._id,
                                  });
                                  this.upgrade_tarea_get();
                                }}
                              >
                                Editar
                              </div>
                            </div>
                            <small className="text-muted">
                              {datosT.fecha_vencimiento.slice(0, 10)}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h1>Prioridad Media</h1>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {tareasUsuarioMedia.map((datosT) => {
                  return (
                    <div className="col">
                      <div className="card shadow-sm" key={datosT._id}>
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
                                onClick={async () => {
                                  console.log(datosT._id);
                                  await this.setState({
                                    id_tarea: datosT._id,
                                  });
                                  this.delete_tarea();
                                }}
                              >
                                Eliminar
                              </button>
                              <div
                                type="button"
                                className="btn btn-sm btn-primary"
                                data-target="#editarTarea"
                                data-toggle="modal"
                                onClick={async () => {
                                  await this.setState({
                                    id_tarea: datosT._id,
                                  });
                                  this.upgrade_tarea_get();
                                }}
                              >
                                Editar
                              </div>
                            </div>
                            <small className="text-muted">
                              {datosT.fecha_vencimiento.slice(0, 10)}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h1>Prioridad Baja</h1>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {tareasUsuarioBaja.map((datosT) => {
                  return (
                    <div className="col">
                      <div className="card shadow-sm" key={datosT._id}>
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
                                onClick={async () => {
                                  console.log(datosT._id);
                                  await this.setState({
                                    id_tarea: datosT._id,
                                  });
                                  this.delete_tarea();
                                }}
                              >
                                Eliminar
                              </button>
                              <div
                                type="button"
                                className="btn btn-sm btn-primary"
                                data-target="#editarTarea"
                                data-toggle="modal"
                                onClick={async () => {
                                  await this.setState({
                                    id_tarea: datosT._id,
                                  });
                                  this.upgrade_tarea_get();
                                }}
                              >
                                Editar
                              </div>
                            </div>
                            <small className="text-muted">
                              {datosT.fecha_vencimiento.slice(0, 10)}
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
        <div className="none" id="body"></div>
        {this.state.boolLogin && (
          <Redirect
            to={{
              pathname: "/",
            }}
          ></Redirect>
        )}
      </>
    );
  }
}

export default Inicio_page;
