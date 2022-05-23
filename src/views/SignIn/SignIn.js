import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { httpPost } from "../../components/utils/httpFunctions";

const SignIn = () => {

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const logIn = (e) => {
    e.preventDefault();
    httpPost("api/auth/", { dni, password })
      .then((res) => {
        localStorage.setItem("token", res.data.response.jwt);
        setMessage("Login successful!");
        setColor("green");
        navigate("/home");
      })
      .catch(() => {
        // eslint-disable-next-line no-unused-expressions
        setMessage("Wrong email account or password"), setColor("red");
      });
  };
  return (
      
    <div className="inputs">
    <Link to="/home" className="submit-home-g">
        <p type="submit" className="text-home-su">
          HOME
        </p>
    </Link>
    <form onSubmit={logIn}>
      <label htmlFor="mail-input" className="form-label-1">
        <p className="mail-text">DNI</p>
        <input
          className="form-control"
          id="mail-input"
          type="text"
          autoComplete="off"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </label>
      <label htmlFor="password-input" className="form-label-1">
        <div className="separator">
          <p className="mail-text">Password</p>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <p
            className="mail-text-password"
            onClick={() => navigate("/forgot-password")}
            onKeyDown={() => navigate("/forgot-password")}
          >
            Forgot password?
          </p>
        </div>
        <input
          className="form-control"
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="button-separator">
        <div className="submit-sign-in">
          <button type="submit" className="button-design">
            Sign in
          </button>
        </div>
        <div className="sign-up-class">
          <p className="sign-up-text">
            Or
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions  */}
            <Link to="/signup" className="text-link">
              {" "}
              sign up
            </Link>
          </p>
        </div>
      </div>
      <p style={{ color }} id="message">
        {message}
      </p>
    </form>
  </div>
  );
}

export default SignIn;