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
      public_id_imagen: "",
      imagen_relacionada_prev: "",
      form: {
        titulo: "",
        descripcion: "",
        sala_interactiva: "",
        imagen_relacionada: "",
        imagen: "",
        id_usuario: "",
      },
      datos_experiencias: [],
      datos_api: [],
      id_usuario: JSON.parse(sessionStorage.getItem("id_usuario")),
      id_experiencia: "",
      datos_experiencia: [],
      boolLogin: false,
      titulo2: "",
    };
  }

  // Consulta a la API para generar las imagenes aleatorias
  get_imagen_relacionada = async () => {
    if (this.state.form.titulo == "") {
      this.setState({
        imagen_relacionada_prev: "",
      });
    } else if (this.state.form.titulo != "") {
      var length = this.state.datos_api.length;
      var length_imagen = Math.floor(Math.random() * (length - 0)) + 0;
      this.setState({
        imagen_relacionada_prev:
          this.state.datos_api[length_imagen].jetpack_featured_media_url,
        titulo2: this.state.form.titulo,
      });
    }
  };
  // Fin de la consulta para consultar las imagenes aletorias

  // Consulta a la API para generar las imagenes aleatorias
  get_data_api = async () => {
    axios
      .get(`https://encasa.parqueexplora.org/wp-json/wp/v2/posts`)
      .then((res) => {
        this.setState({
          datos_api: res.data,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  // Fin de la consulta para consultar las imagenes aletorias

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    if (this.state.titulo2 != this.state.form.titulo) {
      this.get_imagen_relacionada();
    }
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
  };

  delete_experiencia = async () => {
    await axios
      .delete(
        `http://localhost:4040/${this.state.id_experiencia}/${this.state.public_id_imagen}`
      )
      .then((res) => {
        document.getElementById("id-delete-experiencia").style.display =
          "block";
        setTimeout(function () {
          document.getElementById("id-delete-experiencia").style.display =
            "none";
        }, 3000);
        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  upgrade_experiencia_get = async () => {
    axios
      .get(`http://localhost:4040/${this.state.id_experiencia}`)
      .then((res) => {
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
    await axios
      .put(
        `http://localhost:4040/${this.state.id_experiencia}/${this.state.public_id_imagen}`,
        {
          titulo: this.state.form.titulo,
          descripcion: this.state.form.descripcion,
          sala_interactiva: this.state.form.sala_interactiva,
          imagen_relacionada: this.state.imagen_relacionada_prev,
          imagen: this.state.imagen,
          public_id: this.state.public_id,
          id_usuario: this.state.id_usuario.id_usuario,
        }
      )
      .then((res) => {

        document.getElementById("id-update-experiencia").style.display = "block";
        setTimeout(function () {
          document.getElementById("id-update-experiencia").style.display = "none";
        }, 3000);
        
        this.componentWillMount();  
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  //Petición post para agregar nuevas experiencias
  post_experiencia = async () => {
    await axios
      .post(`http://localhost:4040/`, {
        titulo: this.state.form.titulo,
        descripcion: this.state.form.descripcion,
        sala_interactiva: this.state.form.sala_interactiva,
        imagen_relacionada: this.state.imagen_relacionada_prev,
        imagen: this.state.imagen,
        public_id: this.state.public_id,
        id_usuario: this.state.id_usuario.id_usuario,
      })
      .then((res) => {
        document.getElementById("titulo-input-create").value = "";
        document.getElementById("descripcion-textearea-create").value = "";
        document.getElementById("sala_interactiva-select-create").value = "";
        document.getElementById("imagen-input-create").value = "";
        this.setState({
          imagen: "",
          titulo2: "",
          imagen_relacionada_prev: "",
        });

        document.getElementById("id-new-experiencia").style.display = "block";
        setTimeout(function () {
          document.getElementById("id-new-experiencia").style.display = "none";
        }, 3000);

        this.componentWillMount();
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  //Fin post

  //Petición get para traer todos las experiencias de un usuario
  componentWillMount = async () => {
    if (JSON.parse(sessionStorage.getItem("login")).login) {
      await axios
        .get(
          `http://localhost:4040/all-experiencias-usuario/${this.state.id_usuario.id_usuario}`
        )
        .then((res) => {
          this.setState({
            datos_experiencias: res.data,
          });
          this.get_data_api();
        })
        .catch((err) => {
          console.log(err.massage);
        });
    } else {
      this.setState({ boolLogin: true });
    }
  };
  // Fin get

  onChangeHandler = (event) => {
    this.setState({
      File: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = async () => {
    const data = new FormData();
    data.append("file", this.state.File);
    await axios
      .post(`http://localhost:4040/api/upload`, data)
      .then((res) => {
        document.getElementById("fotoPrev2").src = res.data;
        this.setState({
          imagen: res.data.url,
          public_id: res.data.public_id,
        });
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  render() {
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
                  onClick={async () => {
                    await this.setState({
                      imagen: "",
                      imagen_relacionada_prev: ""
                    });
                  }}
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
                      <strong>Titulo</strong>
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
                      <strong>Descripcion</strong>
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
                      <strong>Sala interactiva</strong>
                      </label>

                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        name="sala_interactiva"
                      >
                        <option value="">
                          {this.state.form.sala_interactiva}
                        </option>
                        <option value="Sala músical">Sala músical</option>
                        <option value="Dinosaurios">Dinosaurios</option>
                        <option value="Cuerpo, relaciones vitales">
                          Cuerpo, relaciones vitales
                        </option>
                        <option value="Sala infantil">Sala infantil</option>
                        <option value="Mente, el mundo adentro">
                          Mente, el mundo adentro
                        </option>
                        <option value="Sala en escena">Sala en escena</option>
                        <option value="Tiempo, más allá del reloj">
                          Tiempo, más allá del reloj
                        </option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label for="email" className="form-label">
                      <strong>Imagen relacionada</strong>
                      </label>

                      <div className="foto-experiencia-img">
                        <img
                          className="foto-experiencia-img-ver"
                          id="fotoPrev2"
                          src={this.state.imagen_relacionada_prev || this.state.form.imagen_relacionada}
                          alt="Imagen"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="imagen_experiencia" className="form-label">
                        <strong>Imagen</strong>
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
                          id="fotoPrev"
                          src={this.state.imagen}
                          alt="Imagen"
                        />
                      </div>
                      <div className="foto-experiencia-img">
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
                      <strong>Titulo</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="titulo-input-create"
                        placeholder="Titulo de la experiencia"
                        onChange={this.handleChange}
                        name="titulo"
                      />
                    </div>

                    <div className="col-12">
                      <label for="Descripcion" className="form-label">
                      <strong>Descripcion</strong>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="descripcion-textearea-create"
                        placeholder="Descripcion de la experiencia"
                        onChange={this.handleChange}
                        name="descripcion"
                      />
                    </div>

                    <div className="col-12">
                      <label for="sala_interactiva" className="form-label">
                      <strong>Sala interactiva</strong>
                      </label>

                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        name="sala_interactiva"
                        id="sala_interactiva-select-create"
                      >
                        <option value=""></option>
                        <option value="Sala músical">Sala músical</option>
                        <option value="Dinosaurios">Dinosaurios</option>
                        <option value="Cuerpo, relaciones vitales">
                          Cuerpo, relaciones vitales
                        </option>
                        <option value="Sala infantil">Sala infantil</option>
                        <option value="Mente, el mundo adentro">
                          Mente, el mundo adentro
                        </option>
                        <option value="Sala en escena">Sala en escena</option>
                        <option value="Tiempo, más allá del reloj">
                          Tiempo, más allá del reloj
                        </option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label for="imagen_relacionada" className="form-label">
                      <strong>Imagen relacionada</strong>
                      </label>

                      <div className="foto-experiencia-img">
                        <img
                          className="foto-experiencia-img-ver"
                          id="ImagenPrevRelacionada"
                          src={
                            this.state.imagen_relacionada_prev ||
                            "https://us.123rf.com/450wm/naropano/naropano1606/naropano160600550/58727711-fondo-gris-oscuro-el-dise%C3%B1o-de-textura-fondo-del-grunge-.jpg?ver=6"
                          }
                          alt="Imagen"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="file" className="form-label">
                      <strong>Imagen</strong>
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/png, .jpeg, .jpg, image/gif"
                        id="imagen-input-create"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                      <div className="foto-experiencia-img">
                        <img
                          className="foto-experiencia-img-ver"
                          id="fotoPrev23"
                          src={
                            this.state.imagen ||
                            "https://us.123rf.com/450wm/naropano/naropano1606/naropano160600550/58727711-fondo-gris-oscuro-el-dise%C3%B1o-de-textura-fondo-del-grunge-.jpg?ver=6"
                          }
                          alt="Imagen"
                        />
                      </div>
                      <div className="foto-experiencia-img">
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
          <div className="navbar bg-dark shadow-sm">
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
          <div>
            <div
              className="alert alert-success"
              id="id-new-experiencia"
              role="alert"
            >
              Nueva experiencia agregada.
            </div>
            <div
              class="alert alert-danger"
              id="id-delete-experiencia"
              role="alert"
            >
              Experiencia correctamente eliminada.
            </div>
            <div class="alert alert-info" id="id-update-experiencia" role="alert">
              Experiencia actualizada correctamente.
            </div>
          </div>
          <div className="album py-5 bg-light">
            <div className="container">
              <h1>Experiencias</h1>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {experienciasUsuario.map((datosT) => {
                  return (
                    <div className="col ">
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
                          className="me-2 imagen-card-superior"
                          viewBox="0 0 24 24"
                        />

                        <div className="card-body">
                          <div>
                          <h5 className="h6-card">{datosT.titulo}</h5>
                          </div>
                          <div>
                          <p className="card-text">{datosT.descripcion}</p>
                          </div>
                          <div>
                          <p className="card-text"><strong>Sala interactiva:</strong> {datosT.sala_interactiva}</p>
                          </div>
                          <div className="div-imagen-relacionada">
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
                            className="me-2 img-relacionada"
                            viewBox="0 0 24 24"
                          />
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group botones-inferiores">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={async () => {
                                  await this.setState({
                                    id_experiencia: datosT._id,
                                    public_id_imagen: datosT.public_id,
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
                                    public_id_imagen: datosT.public_id,
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
