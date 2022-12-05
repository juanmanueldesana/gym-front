import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import validateInfo from './validateInfo';
import { httpPost } from '../../components/utils/httpFunctions';
import axios from 'axios';

const RegistroStaff = () => {
    const [profile, setProfile] = useState({
        username: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
        email: "",
      });
      const [message, setMessage] = useState("");
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();

      const signUp = (e) => {
        e.preventDefault();
          axios.post("https://gym-austral-back.onrender.com/api/auth/staff-signup/", {
                username: profile.username,
                password: profile.password,
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                is_staff: true
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
              ).then(() => {
                alert("Personal de staff creado con exito");
                navigate("/profile");
              })
              .catch((error) => {
                alert("No se pudo crear el personal de staff, compruebe que los datos ingresados sean correctos.");
                console.log(error);
              }
              );
        };

      const handleChange = (e) => {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      };

  return (
         <div className="form-container log">
          <form className="register-form" onSubmit={signUp}>
            <h3 className='form-h3'>Registrar personal de staff</h3>    
              <input
                name="username"
                type="text"
                className="form-field"
                placeholder='DNI'
                value={profile.username}
                onChange={handleChange}
              />
              {errors.dni && <p style={{ color: "red" }}>{errors.dni}*</p>}
              <input
                className="form-field"
                id="mail-input"
                placeholder='Email'
                name="email"
                type="text"
                value={profile.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}*</p>}
              <input
                className="form-field"
                id="password-input"
                type="password"
                placeholder='Contraseña'
                name="password"
                value={profile.password}
                onChange={handleChange}
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password}*</p>}
           
              <input
                className="form-field"
                id="retype-password-input"
                placeholder='Reescribir contraseña'
                type="password"
                name="password2"
                value={profile.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p style={{ color: "red" }}>{errors.password2}*</p>}
              <input
                className="form-field"
                placeholder='Nombre'
                id="first-name-input"
                type="text"
                autoComplete="off"
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
              />
              {errors.firstName && <div>{errors.firstName}</div>}
            
              <input
                className="form-field"
                placeholder='Apellido'
                id="last-name-input"
                type="text"
                autoComplete="off"
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
              />
              {errors.lastName && <div>{errors.lastName}</div>}
              <div className='separator'/>
              <button type="submit" className="form-field form-btn">
                Registrate
              </button>
            <p id="succesful">{message}</p>
          </form>
        </div>
  )
}

export default RegistroStaff