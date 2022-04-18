import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import pinkBean from "../images/pinkbean.png";
import yeti from "../images/yeti.png";
import owok from "../images/owok.png";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"));
    return <Redirect to="/" />;
  };

  const demoButton = (e) => {
    e.preventDefault();
    demoLogin();
  };

  return (
    <div className="SignUpFormContainer">
      <div className="SignUpFormBackground">
        <div className="SignUpFormImages">
          <div className="SignUpFormLogo">
            <img src={owok} alt="owok" />
          </div>
          <div className="SignUpFormPBandYeti">
            <img id="pinkBean" src={pinkBean} alt="pink bean" />
            <img src={yeti} alt="yeti" />
          </div>
        </div>
      </div>
      <div className="SignUpFormBox">
        <form onSubmit={onLogin} className="SignUpForm">
          <div className="SignUpFormErrors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <input
            name="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={updateEmail}
            required={true}
          />

          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={updatePassword}
            required={true}
          />
          <button type="submit">Login</button>
          <div className="DemoButton">
            <button onClick={demoButton}>Demo Login</button>
          </div>
          <a href="/sign-up">Want to make an account?</a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
