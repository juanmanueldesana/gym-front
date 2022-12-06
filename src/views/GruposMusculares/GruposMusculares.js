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
import "./GruposMusculares.css";
import { Col, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const GruposMusculares = () => {
  const navigate = useNavigate();
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [mGroup, setMGroup] = useState({});
  const [show, setShow] = useState(false);
  const [addMGroup, setAddMGroup] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    httpGet("api/muscle_groups/").then((res) => {
      setMuscleGroups(res.data);
      console.log(muscleGroups);
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
            <h1 className="h1-profile">Grupos Musculares</h1>
            <h1 className="h1-profile">
              <a style={{ textDecoration: "none", color: "black" }} href="/rutina">
                Volver a Panel de Administrador
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
              Agregar nuevo grupo
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nuevo grupo muscular</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={(e) => {
                        setAddMGroup({ ...addMGroup, name: e.target.value });
                      }}
                    />
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
                    httpPost(`api/muscle_groups/`, { name: addMGroup.name }).then(
                      (res) => {
                        toast.success("Grupo muscular agregado con exito", {
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
                    <th scope="col">ID</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {muscleGroups.map((muscleGroup) => (
                    <tr>
                      {console.log(muscleGroup)}
                      <td>
                        <input
                          defaultValue={muscleGroup.name}
                          onChange={(e) => {
                            setMGroup(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                      <span>{muscleGroup.id}</span>
                      </td>
                      <td>
                        <Button
                          style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}
                          onClick={() => {
                            httpPut(`api/muscle_groups/${muscleGroup.id}/`, {
                              name: mGroup,
                            }).then((res) => {
                              toast.success("Grupo muscular editado con exito", {
                                position: toast.POSITION.BOTTOM_CENTER,
                                autoClose: 2000,
                              });
                              setInterval(() => {
                                window.location.reload();
                              }, 2000);
                            });
                          }}
                        >
                          Editar
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
                            httpDelete(`api/muscle_groups/${muscleGroup.id}/`).then(
                              (res) => {
                                toast.success("Grupo muscular eliminado con exito", {
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
