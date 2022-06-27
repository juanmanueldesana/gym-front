import { useState } from "react"
import './Form.css'
export default function Form(props) {

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
        <div class="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h3 className="form-h3">Comunicate con nosotros</h3>
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
                <input
                    onChange={handleEmailInputChange}
                    value={values.email}
                    id="email"
                    class="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                {submitted && !values.email ? <span id="email-error">Por favor ingresa una direccion de email</span> : null}
                <textarea
                    onChange={handleMessageInputChange}
                    value={values.message}
                    id="textarea"
                    class="form-field"
                    type="text"
                    placeholder="Dejanos tu mensaje"
                    name="message" />

                {submitted && !values.message ? <span id="textarea-error">Por favor ingresa un mensaje</span> : null}
                <button
                    
                    class="form-field form-btn"
                    type="submit">
                    Contactanos
                </button>
            </form>
        </div>
    )
}
