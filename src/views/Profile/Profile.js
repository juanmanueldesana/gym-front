import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { httpGet } from '../../components/utils/httpFunctions';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(()=>{
    httpGet("api/auth/me/").then((res)=>{
      setProfile(res.data);
      console.log(res.data);
    })
  },[]);
 

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className='container'>
      <h3>PERFIL</h3>
      <div>
        <p>DNI: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <p>Nombre: {profile.first_name}</p>        
        <p>Apellido: {profile.last_name}</p>              
      </div>
      <div style={{ margin: "2vw"}} onClick={logOut}>
      <Button>Cerrar Sesión</Button> 
      </div>
    </div>
  )
}

export default Profile