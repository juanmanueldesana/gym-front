import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { httpGet } from "../../components/utils/httpFunctions";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    axios.get("https://gym-austral-tp.herokuapp.com/api/auth/me/").then((res) => {
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
      <h1 className="h1-profile">
          Perfil
      </h1>
      <h1 className="h1-profile">
        <a style={{ textDecoration: "none", color: "black" }} href="/rutina">
          Rutina
        </a>
      </h1>
      {profile.is_staff == true ? (
        <h1 className="h1-profile">
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="/registro-staff"
          >
            Registrar personal de staff
          </a>
        </h1>
      ) : null}
      <h1 className="h1-profile">
        <a
          style={{ textDecoration: "none", color: "red" }}
          href="/"
          onClick={logOut}
        >
          Cerrar sesion
        </a>
      </h1>
      <form className="container-profile">
        <div className="form-group">
          <div className="input-profile">
            <div className="w-full py-5 ">
              <label
                className="material-input border-gray-400
    material-input-focused
    "
              >
                <span className="input-title">Nombre</span>
                <br></br>
                <input
                  disabled
                  type="text"
                  className="w-full pb-1 pl-1 bg-transparent focus:outline-none focus:shadow-none"
                  name="nombre"
                  defaultValue={profile.first_name}
                />
              </label>
            </div>
          </div>
          <div className="input-profile">
            <div className="w-full py-5 ">
              <label
                className="material-input border-gray-400
    material-input-focused
    "
              >
                <span className="input-title">Apellido</span>
                <br></br>
                <input
                  disabled
                  type="text"
                  className="w-full pb-1 pl-1 bg-transparent focus:outline-none focus:shadow-none"
                  name="apellidoPaterno"
                  defaultValue={profile.last_name}
                />
              </label>
            </div>
          </div>
          <div className="input-profile"></div>
          <div className="input-profile">
            <div className="w-full py-5 ">
              <label
                className="material-input border-gray-400
    material-input-focused
    "
              >
                <span className="input-title">DNI</span>
                <br></br>
                <input
                  disabled
                  type="text"
                  className="w-full pb-1 pl-1 bg-transparent focus:outline-none focus:shadow-none"
                  name="dni"
                  value={profile.username}
                />
              </label>
            </div>
          </div>
          <div className="input-profile">
            <div className="w-full py-5 ">
              <label
                className="material-input border-gray-400
    material-input-focused
    "
              >
                <span className="input-title">Correo electronico</span>
                <br></br>
                <input
                  disabled
                  type="text"
                  className="w-full pb-1 pl-1 bg-transparent focus:outline-none focus:shadow-none"
                  name="mail"
                  defaultValue={profile.email}
                />
              </label>
            </div>
          </div>
          <div className="w-full mb-10 text-center md:w-2/5"></div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
