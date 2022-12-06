import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { httpGet } from "../../components/utils/httpFunctions";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import "./Rutina.css";
import { Col, Row } from "react-bootstrap";

const Rutina = () => {
  const navigate = useNavigate();
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
      <h1 className="h1-profile">Panel de Administrador</h1>
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

      {profile.is_staff ? (
        <form className="container-profile">
          <div className="form-group">
            <div className="input-profile">
              <Row>
                <Col>
                  <div className="w-full py-5 ">
                    <Button
                      style={{ backgroundColor: "#FF5300" }}
                      onClick={() => {
                        navigate("/grupos-musculares/");
                      }}
                      size="md"
                    >
                      Grupos Musculares
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="w-full py-5 ">
                  <Button
                      style={{ backgroundColor: "#FF5300" }}
                      onClick={() => {
                        navigate("/ejercicios/");
                      }}
                      size="md"
                    >
                      Ejercicios
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="w-full py-5 ">
                  <Button
                      style={{ backgroundColor: "#FF5300" }}
                      onClick={() => {
                        navigate("/creacion-rutina/");
                      }}
                      size="md"
                    >
                      Rutinas
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </form>
      ) : (
        <div>
         <h1>No tienes acceso a este sitio</h1>
        </div>
      )}
    </div>
  );
};

export default Rutina;
