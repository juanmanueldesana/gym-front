import React from 'react'
import Carousel from '../../components/Carousel/Carousel'

const Staff = () => {
  return (
    <>
      <Carousel></Carousel>
      <div className="land-container">
        <h1 className="land-h1">Staff</h1>
        <p className="land-p">
          ¡Estamos buscando nuevo personal para el gimnasio Ares y vos podrias ser la persona que necesitamos!
        </p>
        <p className="land-p">
          Si estas interesado en trabajar con nostros, envia tu CV al mail:
        </p>
        <p className="land-p"
        style={{
            padding: "2px",
            marginTop: "2px",
            backgroundColor: "#FF5300",
          }}
        >
         gimnasioares@gmail.com
        </p>
        <p className="land-p">
          Si cumplis con los requisitos te contactaremos!
        </p>
      </div>
    </>
  )
}

export default Staff