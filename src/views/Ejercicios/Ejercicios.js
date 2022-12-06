import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "../../components/utils/httpFunctions";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import "./Ejercicios.css";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const GruposMusculares = () => {
  const navigate = useNavigate();
  const [exercises, setExcercise] = useState([]);
  const [exc, setExc] = useState({});
  const [show, setShow] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showPut, setShowPut] = useState(false);
  const [putExercise, setPutExercise] = useState({});
  const [muscularGroups, setMuscularGroups] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDesc = () => setShowDesc(false);
  const handleShowDesc = () => setShowDesc(true);
  const handleClosePut = () => setShowPut(false);
  const handleShowPut = () => setShowPut(true);

  useEffect(() => {
    httpGet("api/exercise/").then((res) => {
      setExcercise(res.data);

      httpGet("api/muscle_groups/").then((res) => {
        setMuscularGroups(res.data);
      });
    });
  }, []);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    httpGet("api/auth/me/").then((res) => {
      setProfile(res.data);
      console.log(res.data);
    });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {profile.is_staff ? (
            <div>
            <h1 className="h1-profile">Ejercicios</h1>
            <h1 className="h1-profile">
              <a style={{ textDecoration: "none", color: "black" }} href="/profile">
                Volver a perfil
              </a>
            </h1>
            <h1 className="h1-profile">
              <a
                style={{ textDecoration: "none", color: "red" }}
                href="/"
                onClick={logOut}
              >
                Cerrar sesion
              </a>
            </h1>
      
            <br></br>
      
            <Button className="h1-profile" variant="primary" onClick={handleShow}>
              Agregar Ejercicio
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nuevo Ejercicio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={(e) => {
                        setExc({ ...exc, name: e.target.value, description: exc.description, muscle_group: exc.muscle_group });
                      }}
                    />
                    <Form.Control
                      as="textarea"
                      placeholder="Descripcion"
                      rows={10}
                      onChange={(e) => {
                        setExc({ ...exc, name: exc.name, description: e.target.value, muscle_group: exc.muscle_group });
                      }}
                    />
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setExc({ ...exc, name: exc.name, description: exc.description, muscle_group: e.target.value });
                      }}
                    >
                      <option selected disabled value="0">Seleccione un grupo muscular</option>
                      {muscularGroups.map((muscularGroup) => (
                        <option value={muscularGroup.id}>
                          {muscularGroup.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    httpPost(`api/exercise/`, {...exc, muscle_group: parseInt(exc.muscle_group)}).then(
                      (res) => {
                        toast.success("Ejercicio agregado con exito", {
                          position: toast.POSITION.BOTTOM_CENTER,
                          autoClose: 2000,
                        });
                        setInterval(() => {
                          window.location.reload();
                        }, 2000);
                      }
                    );
                  }}
                >
                  Agregar
                </Button>
              </Modal.Footer>
            </Modal>
      
            <form className="container-profile">
              {/* import table to fill with the muscle groups */}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise) => (
                    <tr>
                      <td>
                        <input
                          defaultValue={exercise.name}
                          onChange={(e) => setExc(e.target.value)}
                        ></input>
                      </td>
                      <td>
                        <Button
                          style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}
                          onClick={handleShowDesc}
                        >
                          Descripcion
                        </Button>
                          <Modal show={showDesc} onHide={handleCloseDesc}>
                              <Modal.Header closeButton>
                                <Modal.Title>Descripcion</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                {exercise.description}
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDesc}>
                                  Cerrar
                                </Button>
                              </Modal.Footer>
                            </Modal>
                      </td>
                      <td>
                        <Button
                          style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}
                          onClick={handleShowPut}
                        >
                          Editar
                            <Modal show={showPut} onHide={handleClosePut}>
                              <Modal.Header closeButton>
                                <Modal.Title>Editar ejercicio</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <form>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={exercise.name}
                                      onChange={(e) => {
                                        setPutExercise({ ...putExercise, name: e.target.value, description: putExercise.description, muscle_group:exercise.muscle_group});
                                      }}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={exercise.description}
                                      onChange={(e) => {
                                        setPutExercise({ ...putExercise, name: putExercise.name, description: e.target.value, muscle_group:exercise.muscle_group});
                                      }}
                                    />
                                  </div>
                                </form>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClosePut}>
                                  Cerrar
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    httpPut(`api/exercise/${exercise.id}/`, putExercise).then((res) => {
                                      toast.success("Ejercicio editado con exito", {
                                        position: toast.POSITION.BOTTOM_CENTER,
                                        autoClose: 2000,
                                      });
                                      setInterval(() => {
                                        window.location.reload();
                                      }, 2000);
                                    });
                                  }}
                                >
                                  Agregar
                                </Button>
                              </Modal.Footer>
                            </Modal>
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "red",
                          }}
                          onClick={() => {
                            httpDelete(`api/exercise/${exercise.id}/`).then(
                              (res) => {
                                toast.success("Ejercicio eliminado con exito", {
                                  position: toast.POSITION.BOTTOM_CENTER,
                                  autoClose: 2000,
                                });
                                setInterval(() => {
                                  window.location.reload();
                                }, 2000);
                              }
                            );
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
            </div>
      ) : (
        <div>
          <h1>No tienes acceso a este sitio</h1>
        </div>
      )}
    </div>
  );
};

export default GruposMusculares;
