import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { httpPost } from "../../components/utils/httpFunctions";
import validator from "validator";
import { Alert } from "react-bootstrap";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  
  const login=(e)=>{
    e.preventDefault();

    axios.post("https://gym-austral-tp.herokuapp.com/api/auth/login/", {username,password}).then((res)=>{
      localStorage.setItem("token", res.data.access);
      navigate("/");
      window.location.reload();
    })
    .catch(() => {
      setErrors("DNI o contraseña incorrecta");
    });
  }
    
  const logIn = (e) => {
    e.preventDefault();

    const errors = {};
    setErrors(errors);

    if (!validator.isNumeric(username) || username.length !== 8) {
      errors.username = "El username es incorrecto";
    }

    if (!validator.isLength(password, { min: 6, max: undefined })) {
      errors.password = "La contraseña debe contener al menos 6 caracteres";
    }

    if (!validator.isEmpty(password)) {
      errors.password = "La contraseña es requerida";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    httpPost("api/auth/", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.response.jwt);
        toast.success("Sesión iniciada con éxito!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
        });
        navigate("/home");
      })
      .catch(() => {
        // eslint-disable-next-line no-unused-expressions
        setErrors("username o contraseña incorrecta");
      });
  };
  return (
    <div className="form-container log">
      <form className="register-form" onSubmit={login}>
        <h3 className="form-h3">Iniciar sesión</h3>
        {errors && <Alert variant="danger">{errors}</Alert>} 
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="email"
          className="form-field"
          type="text"
          placeholder="DNI"
          name="email"
        />
        {errors.dni && <p style={{ color: "red" }}>{errors.dni}*</p>}
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          className="form-field"
          type="password"
          placeholder="Contraseña"
          name="password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}*</p>}
        <div className="separator">
          <div className="mt-4">
            <Link style={{ textDecoration: "none" }} to="/forgot-password">
              ¿Olvidó su contraseña?
            </Link>
          </div>
        </div>
        <button type="submit" className="form-field form-btn">
          Log in
        </button>
        <div className="mt-4">
          <Link to="/signup" style={{textDecoration: "none"}}>¿No tiene una cuenta? Regístrese</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
