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

  return (
    <div className="SignUpFormContainer">
      <div className="SignUpFormBackground">
        <div className="SignUpFormImages">
          <div className="SignUpFormLogo">
            <img src={owok} />
          </div>
          <div className="SignUpFormPBandYeti">
            <img id="pinkBean" src={pinkBean} />
            <img src={yeti} />
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
