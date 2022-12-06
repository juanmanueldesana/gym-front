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
import DiaRutina from "../DiaRutina/DiaRutina";
import { useNavigate } from "react-router-dom";
import "./CreacionRutina.css";
import { Col, ListGroupItem, Modal, Row } from "react-bootstrap";
import { act } from "react-dom/test-utils";

const CreacionRutina = () => {
  const navigate = useNavigate();

  let routineID;
  const [active, setActive] = useState("");
  const [showRoutineExcercise, setShowRoutineExcercise] = useState(false);
  const [routineData, setRoutineData] = useState({});
  const [routineList, setRoutineList] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [routineDay, setRoutineDay] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [exercises, setExcercise] = useState([]);
  const [mGroup, setMGroup] = useState({});
  const [exc, setExc] = useState({});
  const [show, setShow] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showPut, setShowPut] = useState(false);
  const [putExercise, setPutExercise] = useState({});
  const [addMGroup, setAddMGroup] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowRoutineExcercise = () => setShowRoutineExcercise(true);
  const handleCloseRoutineExcercise = () => setShowRoutineExcercise(false);
  const handleShowUsers = () => setShowUsers(true);
  const handleCloseUsers = () => setShowUsers(false);
  const handleCloseDesc = () => setShowDesc(false);
  const handleShowDesc = () => setShowDesc(true);
  const handleClosePut = () => setShowPut(false);
  const handleShowPut = () => setShowPut(true);

  useEffect(() => {
    httpGet("api/routines/").then((res) => {
      setRoutineList(res.data);
      console.log(routineList);
    });
    httpGet("api/exercise/").then((res) => {
      setExcercise(res.data);
      console.log(exercises);
    });
    httpGet("api/auth/users/").then((res) => {
        setUsers(res.data);
        console.log(users);
      });
    httpGet("api/routine_day/").then((res)=>{
        setRoutineDay(res.data);
        console.log(routineDay);
    })
  }, []);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    httpGet("api/auth/me/").then((res) => {
      setProfile(res.data);
      console.log(res.data);
    });
  }, [exercises,routine,users]);
  
  
  const getRoutineDayID = (routineID)=>{
    return routineDay.find(x=>x.routine==routineID).id;
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {profile.is_staff ? (
            <div>
            <h1 className="h1-profile">Creacion de rutina</h1>
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

            {active ==="one" && <DiaRutina data={routineData}/>}
            {active ==="two" && <DiaRutina data={routineData}/>}
            {active ==="three" && <DiaRutina data={routineData}/>}
            {active ==="four" && <DiaRutina data={routineData}/>}
            {active ==="five" && <DiaRutina data={routineData}/>}




            <Button className="h1-profile" variant="primary" onClick={handleShow}>
              Agregar Rutina
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nueva Rutina</Modal.Title>
              </Modal.Header>
              <Button onClick={handleShowUsers}>Ver lista de usuarios</Button>
              <Modal.Body>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ID Usuario"
                      onChange={(e) => {
                        setRoutine({ ...routine, user: e.target.value, objective: routine.objective});
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Objetivo"
                      onChange={(e) => {
                        setRoutine({ ...routine, user: routine.user, objective: e.target.value});
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
                    httpPost(`api/routines/`, {...routine, user: parseInt(routine.user)}).then(
                      (res) => {
                        routineID=res;
                        console.log(routineID.data);
                      }
                    ).then((res)=>{
                        httpPost(`api/routine_day/`, {number_day:1 , routine: parseInt(routineID.data.id)})
                    }).then((res)=>{
                        httpPost(`api/routine_day/`, {number_day:2 , routine: parseInt(routineID.data.id)})
                    }).then((res)=>{
                        httpPost(`api/routine_day/`, {number_day:3 , routine: parseInt(routineID.data.id)})
                    }).then((res)=>{
                        httpPost(`api/routine_day/`, {number_day:4 , routine: parseInt(routineID.data.id)})
                    }).then((res)=>{
                        httpPost(`api/routine_day/`, {number_day:5 , routine: parseInt(routineID.data.id)}).then(
                            (res) => {
                              console.log(res);
                              alert("Rutina creada");
                              window.location.reload();
                            }
                          )
                    })
                  }}
                >
                  Agregar
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showUsers} onHide={handleCloseUsers}>
            <Modal.Header closeButton>
                <Modal.Title>Usarios</Modal.Title>
              </Modal.Header>
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Usario</th>
                    <th scope="col">Mail</th>
                  </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                {user.first_name}
                            </td>
                            <td>
                                {user.last_name}
                            </td>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </Modal>
            <form className="container-profile">
              {/* import table to fill with the muscle groups */}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">ID usuario</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {routineList.map((routineItem) => (
                    <tr>
                      <td>  
                      {users.find(x => x.id ===routineItem.user).first_name}
                      </td>
                      <td>  
                      {users.find(x => x.id ===routineItem.user).last_name}
                      </td>
                      <td>  
                        {routineItem.user}
                      </td>
                      <td>
                        <Button 
                        onClick={()=>{setRoutineData({...routineData, mostrar:true, dia:1, IDRutina:routineItem.id, IDUsuario:routineItem.user });
                        setActive("one")}}
                        style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}>Dia 1</Button>
                      </td>
                      <td>
                        <Button 
                        onClick={()=>{setRoutineData({...routineData, mostrar:true, dia:2, IDRutina:routineItem.id, IDUsuario:routineItem.user });
                        setActive("two")}}
                        style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}>Dia 2</Button>
                      </td>
                      <td>
                        <Button 
                        onClick={()=>{setRoutineData({...routineData, mostrar:true, dia:3, IDRutina:routineItem.id, IDUsuario:routineItem.user });
                        setActive("three")}}
                        style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}>Dia 3</Button>
                      </td>
                      <td>
                        <Button
                        onClick={()=>{setRoutineData({...routineData, mostrar:true, dia:4, IDRutina:routineItem.id, IDUsuario:routineItem.user });
                        setActive("four")}}
                        style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}>Dia 4</Button>
                      </td>
                      <td>
                        <Button 
                        onClick={()=>{setRoutineData({...routineData, mostrar:true, dia:5, IDRutina:routineItem.id, IDUsuario:routineItem.user });
                        setActive("five")}}
                        style={{
                            padding: "2px",
                            marginTop: "2px",
                            backgroundColor: "#FF5300",
                          }}>Dia 5</Button>
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
            
            <Modal show={showRoutineExcercise} onHide={handleCloseRoutineExcercise}>
            <Modal.Header closeButton>
                <Modal.Title>Rutina</Modal.Title>
              </Modal.Header>
              <tr>
                <td>
                <Button onClick={""}>Agregar ejercicio</Button>
                </td>
                <td>
                <Button onClick={""}>Editar ejercicio</Button>
                </td>
              </tr>
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Ejercicio</th>
                    <th scope="col">Series</th>
                    <th scope="col">Repeticiones</th>
                    <th scope="col">Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                {user.first_name}
                            </td>
                            <td>
                                {user.last_name}
                            </td>
                            <td>
                                {user.username}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </Modal>
            </div>
      ) : (
        <div>
          <h1>No tienes acceso a este sitio</h1>
        </div>
      )}
    </div>
  );
};

export default CreacionRutina;
