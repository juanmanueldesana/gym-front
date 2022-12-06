import React, { useState, useEffect } from 'react'
import { httpGet } from "../../components/utils/httpFunctions";

const Clases = () => {

    const [user, setUser] = useState({});

    useEffect(()=>{
      httpGet("api/auth/me/").then((res) => {
        setUser(res.data);
        
        httpGet("api/routines/?user="+res.data.id).then((res) => {
          console.log(res.data);
        });
      });
    },[]);


  return (
    <div>Rutinas</div>
  )
}

export default Clases