import React from "react";
import axios from "axios";

import "../Styles/Inicio_page.css";

import { Link, Redirect } from "react-router-dom";


class Inicio_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      File: null,
      imagen: "",
      form: {
        titulo: "",
        descripcion: "",
        sala_interactiva: "",
        imagen_relacionada: "",
        imagen: "",
        id_usuario: "",
      },
      datos_experiencias: [],
      id_usuario: JSON.parse(sessionStorage.getItem("id_usuario")),
      id_experiencia: "",
      datos_experiencia: [],
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
    const experiencia = {
      titulo: this.state.form.titulo,
      descripcion: this.state.form.descripcion,
      sala_interactiva: this.state.form.sala_interactiva,
      imagen_relacionada: this.state.form.imagen_relacionada,
      imagen: this.state.form.imagen,
      id_usuario: this.state.form.id_usuario,
    };
    console.log("handleSubmit:", experiencia);
  };


  delete_experiencia = async () => {
    console.log("Esta es el id de la experiencia:", this.state.id_experiencia);
    await axios
      .delete(
        `http://localhost:4040/${this.state.id_experiencia}`
      )
      .then((res) => {
        console.log("Se ha eliminado una experiencia.");
        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  upgrade_experiencia_get = async () => {
    axios
      .get(
        `http://localhost:4040/${this.state.id_experiencia}`
      )
      .then((res) => {
        console.log("datos get:", res.data);
        this.setState({
          form: {
            titulo: res.data[0].titulo,
            descripcion: res.data[0].descripcion,
            sala_interactiva: res.data[0].sala_interactiva,
            imagen_relacionada: res.data[0].imagen_relacionada,
            imagen: res.data[0].imagen,
            id_usuario: res.data[0].id_usuario,
          },
        });
        this.setState({
          imagen: res.data[0].imagen,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  upgrade_experiencia_put = async () => {
    console.log("upgrade imagen:", this.state.imagen);
    await axios
      .put(`http://localhost:4040/${this.state.id_experiencia}`, {
        titulo: this.state.form.titulo,
        descripcion: this.state.form.descripcion,
        sala_interactiva: this.state.form.sala_interactiva,
        imagen_relacionada: /*this.state.form.imagen_relacionada*/ "https://www.mdirector.com/wp-content/uploads/2017/09/experiencia-usuario-ok.jpg",
        imagen: /*this.state.imagen*/ "https://www.mdirector.com/wp-content/uploads/2017/09/experiencia-usuario-ok.jpg",
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

  //Petición post para agregar nuevas experiencias
  post_experiencia = async () => {
    console.log("imagen post", this.state.form.imagen);
    console.log("formulario post:", this.state.form);
    console.log("imagen", this.state.imagen);
    await axios
      .post(`http://localhost:4040/`, {
        titulo: this.state.form.titulo,
        descripcion: this.state.form.descripcion,
        sala_interactiva: this.state.form.sala_interactiva,
        imagen_relacionada: /*this.state.form.imagen_relacionada*/ "https://i0.wp.com/evemuseografia.com/wp-content/uploads/2020/12/EVE09122020.jpg?fit=1170%2C696&ssl=1" ,
        imagen: /*this.state.imagen*/ "https://i0.wp.com/evemuseografia.com/wp-content/uploads/2020/12/EVE09122020.jpg?fit=1170%2C696&ssl=1",
        id_usuario: this.state.id_usuario.id_usuario,
      })
      .then((res) => {
        console.log("Se ha creado una nueva experiencia.");
        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

  //Petición get para traer todos las experiencias de un usuario
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
          `http://localhost:4040/all-experiencias-usuario/${this.state.id_usuario.id_usuario}`
        )
        .then((res) => {
          console.log(res.data);
          this.setState({
            datos_experiencias: res.data,
          });
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
      .post(`http://localhost:4040/imageupload`, data)
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
    const experienciasUsuario = this.state.datos_experiencias;

    return (
      <>
        {/* MODAL EDITAR EXPERIENCIA */}
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
                  Editar experiencia
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
                    <div className="col-12">
                      <label for="titulo" className="form-label">
                        Titulo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        placeholder={this.state.form.titulo}
                        onChange={this.handleChange}
                        name="titulo"
                      />
                    </div>

                    <div className="col-12">
                    <label for="Descripcion" className="form-label">
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="deescripcion"
                        placeholder={this.state.form.descripcion}
                        onChange={this.handleChange}
                        name="descripcion"
                      />
                    </div>

                    <div className="col-12">
                      <label for="sala_interactiva" className="form-label">
                        Sala interactiva
                      </label>
                      
                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        name="sala_interactiva"
                      >
                        <option value="">{this.state.form.sala_interactiva}</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>

                    </div>

                    <div className="col-12">
                      <label for="email" className="form-label">
                        Imagen relacionada
                      </label>
                      
                      <div className="foto-experiencia-img">
                        <img
                          className="foto-experiencia-img-ver"
                          id="fotoPrev2"
                          src={this.state.form.imagen_relacionada}
                          alt="Imagen"
                        />
                      </div>

                    </div>


                    <div className="col-12">
                      <label for="address" className="form-label">
                        Imagen
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        id="FOTO1"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                      <div className="foto-experiencia-img">
                        <img
                          className="foto-experiencia-img-ver"
                          id="fotoPrev1"
                          src={this.state.imagen}
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
                  onClick={this.upgrade_experiencia_put}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FIN MODAL */}
        {/* MODAL NUEVA EXPERIENCIA */}
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
                  Crear nueva experiencia
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
                    <div className="col-12">
                      <label for="titulo" className="form-label">
                        Titulo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        placeholder="Titulo de la experiencia"
                        onChange={this.handleChange}
                        name="titulo"
                      />
                    </div>

                    <div className="col-12">
                    <label for="Descripcion" className="form-label">
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="deescripcion"
                        placeholder="Descripcion de la experiencia"
                        onChange={this.handleChange}
                        name="descripcion"
                      />
                    </div>

                    <div className="col-12">
                      <label for="sala_interactiva" className="form-label">
                        Sala interactiva
                      </label>
                      
                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        name="sala_interactiva"
                      >
                        <option value="">{this.state.form.sala_interactiva}</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>

                    </div>

                    <div className="col-12">
                      <label for="email" className="form-label">
                        Imagen relacionada
                      </label>
                      
                      <div className="foto-tarea-img">
                        <img
                          className="foto-tarea-img-ver"
                          id="fotoPrev2"
                          src="https://us.123rf.com/450wm/naropano/naropano1606/naropano160600550/58727711-fondo-gris-oscuro-el-dise%C3%B1o-de-textura-fondo-del-grunge-.jpg?ver=6"
                          alt="Imagen"
                        />
                      </div>

                    </div>

                    <div className="col-12">
                      <label for="address" className="form-label">
                        Imagen
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        id="imagen"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                      <div className="foto-tarea-img">
                        <img
                          className="foto-tarea-img-ver"
                          id="fotoPrev2"
                          src="https://us.123rf.com/450wm/naropano/naropano1606/naropano160600550/58727711-fondo-gris-oscuro-el-dise%C3%B1o-de-textura-fondo-del-grunge-.jpg?ver=6"
                          alt="Imagen"
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
                  onClick={this.post_experiencia}
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
                Nueva experiencia
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="album py-5 bg-light">
            <div className="container">
              <h1>Experiencias</h1>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {experienciasUsuario.map((datosT) => {
                  return (
                    <div className="col">
                      <div className="card shadow-sm" key={datosT._id}>
                        <img
                          src={datosT.imagen}
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
                          <h6>Titulo:</h6>
                          <p className="card-text">{datosT.titulo}</p>
                          <h6>Descripcion:</h6>
                          <p className="card-text">{datosT.descripcion}</p>
                          <h6>Sala interactiva</h6>
                          <p className="card-text">{datosT.sala_interactiva}</p>
                          <h6>Imagen relacionada</h6>
                          <img
                          src={datosT.imagen_relacionada}
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
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={async () => {
                                  console.log(datosT._id);
                                  await this.setState({
                                    id_experiencia: datosT._id,
                                  });
                                  this.delete_experiencia();
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
                                    id_experiencia: datosT._id,
                                  });
                                  this.upgrade_experiencia_get();
                                }}
                              >
                                Editar
                              </div>
                            </div>
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
