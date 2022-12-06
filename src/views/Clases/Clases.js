import React, { useState, useEffect } from 'react'
import { httpGet } from "../../components/utils/httpFunctions";

const Clases = () => {

    const [user, setUser] = useState({});
    const [routine, setRoutine] = useState({});

    useEffect(()=>{
      httpGet("api/auth/me/").then((res) => {
        setUser(res.data);
        
        httpGet("api/routines/?user="+res.data.id).then((res) => {
          setRoutine(res.data);
          console.log(res.data);
        });
      });
    },[]);

  return (
    <div>
      <h1>Rutina</h1>

      <h3>{routine !== undefined && routine.length > 0 && routine[1].routine_days[0].exercises[0].exercise.name}</h3>
      <h4>Repeticiones: {routine !== undefined && routine.length > 0 && routine[1].routine_days[0].exercises[0].reps}</h4>
      <h4>Series: {routine !== undefined && routine.length > 0 && routine[1].routine_days[0].exercises[0].sets}</h4>

    </div>
  )
}

export default Clases