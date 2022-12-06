import {React,useState} from 'react'
import Carousel from '../../components/Carousel/Carousel'
import './Comunidad.css'
const Staff = () => {
    
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const handleFirstNameInputChange = (event) => {
        setValues({ ...values, firstName: event.target.value })
    };

    const handleLastNameInputChange = (event) => {
        setValues({ ...values, lastName: event.target.value })
    };

    const handleEmailInputChange = (event) => {
        setValues({ ...values, email: event.target.value })
    };

    const handleMessageInputChange = (event) => {
        setValues({ ...values, message: event.target.value })
    };

    const handleSubmit = event => {
        event.preventDefault();
        if(values.firstName && values.lastName && values.email && values.message) {
            setValid(true)
        }
        setSubmitted(true)
    }

  return (
    <>
    <div className="land-container">
      <h1 className="land-h1">Gimnasio Ares</h1>
      <p className="land-p">
        ¿Sos miembro del gimnasio Ares? ¡Te invitamos a la fiesta de fin de año para despedir el club como se debe!
      </p>
      <p className="land-p">
        Fecha: 22/12/2022 <br></br>
        Lugar: Salon Metropolitano
      </p>
    </div>
    <div class="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h3 className="form-h3">Completa este formulario para anotarte</h3>
                {submitted && valid ? <div class="success-message">El mensaje se envío correctamente! Nos contactaremos a la brevedad</div> : null}
                <input
                    onChange={handleFirstNameInputChange}
                    value={values.firstName}
                    id="first-name"
                    class="form-field"
                    type="text"
                    placeholder="Nombre"
                    name="firstName"
                />
                {submitted && !values.firstName ? <span id="first-name-error">Por favor ingresa un nombre</span> : null}
                <input
                    onChange={handleLastNameInputChange}
                    value={values.lastName}
                    id="last-name"
                    class="form-field"
                    type="text"
                    placeholder="Apellido"
                    name="lastName"
                />
                {submitted && !values.lastName ? <span id="last-name-error">Por favor ingresa un apellido</span> : null}
                <button
                    class="form-field form-btn"
                    type="submit">
                    ¡Anotate!
                </button>
            </form>
        </div>
    </>
  )
}

export default Staff