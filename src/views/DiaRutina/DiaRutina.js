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
import "./DiaRutina.css";
import { Col, Form, ListGroupItem, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const DiaRutina = (props) => {
    const navigate = useNavigate();
    let routineID;
    let passed;
    const [showRoutineDay, setShowRoutineDay] = useState(true);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [newExercise, setNewExercise] = useState([]);
    const [routineList, setRoutineList] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);

    const handleShowRoutineDay = () => setShowRoutineDay(true);
    const handleCloseRoutineDay = () => setShowRoutineDay(false);
    const handleShowAddExercise = () => setShowAddExercise(true);
    const handleCloseAddExercise = () => setShowAddExercise(false);
    // eslint-disable-next-line no-unused-expressions
    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        if(props.data.mostrar){()=>{handleShowRoutineDay}}
        }, []);
    useEffect(() => {
        httpGet("api/routine_day_exercise/").then((res) => {
            setExerciseList(res.data);
            console.log(exerciseList);
          });
          httpGet("api/exercise/").then((res) => {
            setExercises(res.data);
          }
          );
        }, []);
    const filtered = exerciseList.filter(exercise => {
          return exercise.routine_day === props.data.IDRutina;
        });
  return (
      <a>
      {props.data.mostrar ? (
        <a>
            <Modal show={showRoutineDay} onHide={handleCloseRoutineDay}>
                <Modal.Header closeButton>
                    <Modal.Title>Rutina dia {props.data.dia}</Modal.Title>
                  </Modal.Header>
                  <Button onClick={handleShowAddExercise}>Agregar Ejercicio</Button>
                    <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Ejercicio</th>
                        <th scope="col">Repeticiones</th>
                        <th scope="col">Series</th>
                        <th scope="col">ID</th>
                      </tr>
                    </thead>
                    <tbody>
                       {filtered.map((exc) => (
                        <tr>
                        <td>
                            {exc.exercise.name}
                        </td>
                        <td>
                            {exc.reps}
                        </td>
                        <td>
                            {exc.sets}
                        </td>
                        <td>
                            {exc.id}
                        </td>
                        </tr>
                       ))}
                    </tbody>
                    </table>
                </Modal>

                <Modal show={showAddExercise} onHide={handleCloseAddExercise}>
                <Modal.Header closeButton>
                  <Modal.Title>Agregar Ejercicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="reps"
                        onChange={(e) => {
                          setNewExercise({ ...newExercise, reps: e.target.value, sets: newExercise.sets, routine_day:props.data.IDRutina, exercise:newExercise.IDEjercicio});
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="sets"
                        onChange={(e) => {
                          setNewExercise({ ...newExercise, reps: newExercise.reps, sets:e.target.value, routine_day:props.data.IDRutina, exercise:newExercise.IDEjercicio});
                        }}
                      />
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setNewExercise({ ...newExercise, reps: newExercise.reps, sets:e.target.value, routine_day:props.data.IDRutina, exercise:e.target.value});
                        }}
                      >
                        <option selected disabled>Seleccione un ejercicio</option>
                        {exercises.map((exe) => (
                          <option value={exe.id}>{exe.name}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseAddExercise}>
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                        httpPost(`api/routine_day_exercise/`, {...newExercise, reps: parseInt(newExercise.reps),sets: parseInt(newExercise.sets),routine_day: parseInt(newExercise.routine_day),exercise: parseInt(newExercise.exercise)}).then(
                          (res) => {
                            toast.success("Ejercicio agregado con exito", {
                              position: toast.POSITION.BOTTOM_CENTER,
                              autoClose: 2000,
                            });
                          }).then((res)=>{
                            httpGet("api/routine_day_exercise/").then((res) => {
                              setExerciseList(res.data);
                              console.log(exerciseList);
                            })
                          })
                    }}
                    variant="primary"
                  >
                    Agregar
                  </Button>
                </Modal.Footer>
              </Modal>
        </a>
    ) 
    :(<h1>"Hubo un error"</h1>)}
        </a>
  )
}

export default DiaRutina