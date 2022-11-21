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
    });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <h1 className="h1-profile">Grupos Musculares</h1>
      <h1 className="h1-profile">
        <a style={{ textDecoration: "none", color: "black" }} href="/rutina">
          Volver a rutina
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
                  alert("Grupo muscular agregado");
                  window.location.reload();
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
            {muscleGroups.map((muscleGroup) => (
              <tr>
                <td>
                  <input
                    defaultValue={muscleGroup.name}
                    onChange={(e) => setMGroup(e.target.value)}
                  ></input>
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
                        alert("Grupo muscular actualizado");
                        window.location.reload();
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
                          alert("Grupo muscular eliminado");
                          window.location.reload();
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
  );
};

export default GruposMusculares;
