import React, { useState, useEffect } from 'react'
const axios = require("axios");

const Clases = () => {

    const[info,setInfo]=useState({})

    useEffect( axios.get('https:/gym-austral-tp.herokuapp.com/api/routine_day/').then(response => {
        setInfo(response.data)}
       , console.log(info))
        ,[])
   
   
  return (
    <div>Clases</div>
  )
}

export default Clases