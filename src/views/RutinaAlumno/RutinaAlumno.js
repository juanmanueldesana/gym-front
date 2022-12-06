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
import "./RutinaAlumno.css";
import { Col, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const RutinaAlumno = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("");
  const [showRoutineExcercise, setShowRoutineExcercise] = useState(false);
  const [routineData, setRoutineData] = useState({});
  const [routineList, setRoutineList] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [routineDay, setRoutineDay] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [exercises, setExcercise] = useState([]);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [mGroup, setMGroup] = useState({});
    const [show, setShow] = useState(false);
    const [addMGroup, setAddMGroup] = useState({});
    const [profile, setProfile] = useState({});
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        httpGet("api/muscle_groups/").then((res) => {
          setMuscleGroups(res.data);
          console.log(muscleGroups);
        });
        httpGet("api/routines/").then((res) => {
            setRoutineList(res.data);
            console.log(routineList);
          });
          httpGet("api/exercise/").then((res) => {
            setExcercise(res.data);
            console.log(exercises);
          });
          httpGet("api/routine_day/").then((res)=>{
              setRoutineDay(res.data);
              console.log(routineDay);
          })
      }, []);

      useEffect(() => {
        httpGet("api/auth/me/").then((res) => {
          setProfile(res.data);
          console.log(res.data);
        });
      }, []);
      
      const filtered = routineList.filter(routine => {
        return routine.user === profile.id ;
      });
      setTimeout(() => {
        
      }, 2000);

      const logOut = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      };
    
  return (
    <div>
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
  )
}

export default RutinaAlumno