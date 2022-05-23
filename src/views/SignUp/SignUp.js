import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import validateInfo from './validateInfo';
import ellipse from "./images/ellipse.svg";
import { httpPost } from '../../components/utils/httpFunctions';

const SignUp = () => {
    const [profile, setProfile] = useState({
        email: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
        profilePicture: null,
      });
      const [message, setMessage] = useState("");
      const [errors, setErrors] = useState({});
      const [visible, setVisible] = useState(false);
      const [imageError, setImageError] = useState("");
      const navigate = useNavigate();

      const signUp = (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-expressions
        validateInfo(profile) === true
          ? profile.profilePicture === null
            ? httpPost("api/auth/signup", {
                username: profile.dni,
                email: profile.email,
                first_name: profile.firstName,
                last_name: profile.lastName,
                password: profile.password,
              }).then(() => {
                setMessage("Account was created successfully");
                httpPost("api/auth/", { email: profile.email, password: profile.password }).then(
                  (res) => {
                    localStorage.setItem("token", res.data.response.jwt);
                    navigate("/home");
                  }
                );
              })
            : httpPost("api/auth/signup", {
                username: profile.dni,
                email: profile.email,
                first_name: profile.firstName,
                last_name: profile.lastName,
                password: profile.password,
                profile_picture: profile.profilePicture,
              }).then(() => {
                setMessage("Account was created successfully");
                httpPost("api/auth/", { email: profile.email, password: profile.password }).then(
                  (res) => {
                    localStorage.setItem("token", res.data.response.jwt);
                    navigate("/home");
                  }
                );
              })
          : setErrors(validateInfo(profile));
      };

      const imgToBase64 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile({
            ...profile,
            [e.target.name]: reader.result,
          });
        };
        // eslint-disable-next-line no-unused-expressions
        file instanceof Blob ? reader.readAsDataURL(file) : null;
      };
    
      const photoHandler = (event) => {
        const choosedFile = event.target.files[0];
        const reader = new FileReader();
        if (choosedFile.size > 1000000) {
          setImageError("Image max size allowed is 1MB ");
        } else {
          reader.onload = () => {
            document.querySelector("#ellipse").setAttribute("src", reader.result);
            setImageError("");
          };
        }
        // eslint-disable-next-line no-unused-expressions
        choosedFile instanceof Blob ? reader.readAsDataURL(choosedFile) : null;
      };

      const handleChange = (e) => {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      };

      const twoCalls = (e) => {
        imgToBase64(e);
        photoHandler(e);
      };

  return (
         <div className="inputs-sign-up" id="image-frame">
          <form onSubmit={signUp}>
          <div
              className="profile-pic-div"
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            />
              <img src={ellipse} id="ellipse" alt="" />
            <div>
              <input
                type="file"
                accept="image/*"
                name="profilePicture"
                autoComplete="off"
                id="file"
                onChange={twoCalls}
              />
              <label htmlFor="file" id="uploadBtn" style={{ display: visible ? "block" : "none" }}>
                Choose Photo
              </label>
            </div>
            <p id="error-image">{imageError}</p>
            <label htmlFor="dni-input" className="form-label-1">
              <p className="mail-text">DNI</p>
              <input
                className="form-control"
                id="mail-input"
                name="dni"
                type="text"
                autoComplete="off"
                value={profile.dni}
                onChange={handleChange}
              />
              {errors.dni && <div>{errors.dni}</div>}
            </label>
            <label htmlFor="mail-input" className="form-label-1">
              <p className="mail-text">Email adress</p>
              <input
                className="form-control"
                id="mail-input"
                name="email"
                type="text"
                autoComplete="off"
                value={profile.email}
                onChange={handleChange}
              />
              {errors.email && <div>{errors.email}</div>}
            </label>
            <label htmlFor="password-input" className="form-label-2">
              <p className="password">Password</p>
              <input
                className="form-control"
                id="password-input"
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error-password">{errors.password}</div>}
            </label>
            <label htmlFor="retype-password-input" className="form-label-2">
              <p className="password">Retype password</p>
              <input
                className="form-control"
                id="retype-password-input"
                type="password"
                name="password2"
                value={profile.password2}
                onChange={handleChange}
              />
              {errors.password2 && <div>{errors.password2}</div>}
            </label>
            <label htmlFor="first-name-input" className="form-label-2">
              <p className="mail-text">First name</p>
              <input
                className="form-control"
                id="first-name-input"
                type="text"
                autoComplete="off"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div>{errors.firstName}</div>}
            </label>
            <label htmlFor="last-name-input" className="form-label-2">
              <p className="mail-text">Last name</p>
              <input
                className="form-control"
                id="last-name-input"
                type="text"
                autoComplete="off"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div>{errors.lastName}</div>}
            </label>
            <div className="submit-g">
              <button type="submit" className="button-design">
                Sign Up
              </button>
            </div>
            <p id="succesful">{message}</p>
          </form>
        </div>
  )
}

export default SignUp