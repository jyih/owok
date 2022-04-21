import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import pinkBean from "../images/pinkbean.png";
import yeti from "../images/yeti.png";
import owok from "../images/owok.png";

import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [spriteUrl, setSpriteUrl] = useState(
    "https://owok.s3.us-west-1.amazonaws.com/noobm1_2.png"
  );
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const spriteData = [
    {
      name: "noobm1",
      display: "https://owok.s3.us-west-1.amazonaws.com/noobm1_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/noobm1_2.png",
    },
    {
      name: "noobm2",
      display: "https://owok.s3.us-west-1.amazonaws.com/noobm2_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/noobm2_2.png",
    },
    {
      name: "noobf1",
      display: "https://owok.s3.us-west-1.amazonaws.com/noobf1_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/noobf1_2.png",
    },
    {
      name: "noobf2",
      display: "https://owok.s3.us-west-1.amazonaws.com/noobf2_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/noobf2_2.png",
    },
    {
      name: "nxhoem1",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoem1_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoem1_2.png",
    },
    {
      name: "nxhoem2",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoem2_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoem2_2.png",
    },
    {
      name: "nxhoef3",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoef3_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoef3_2.png",
    },
    {
      name: "nxhoef4",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoef4_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoef4_2.png",
    },
    {
      name: "nxhoem3",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoem3_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoem3_2.png",
    },
    {
      name: "nxhoem4",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoem4_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoem4_2.png",
    },
    {
      name: "nxhoef1",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoef1_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoef1_2.png",
    },
    {
      name: "nxhoef2",
      display: "https://owok.s3.us-west-1.amazonaws.com/nxhoef2_1.png",
      url: "https://owok.s3.us-west-1.amazonaws.com/nxhoef2_2.png",
    },
  ];

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email.toLowerCase(), password, spriteUrl)
      );
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["PASSWORDS DONT MATCH o(￣o￣*)ゞ"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateSpriteUrl = (e) => {
    setSpriteUrl(e.target.value);
  };

  if (user) {
    return <Redirect to="/browse" />;
  }

  return (
    <div className="SignUpFormContainer">
      <div className="SignUpFormBackground">
        <div className="SignUpFormImages">
          <div className="SignUpFormLogo">
            <img src={owok} alt="logo" />
          </div>
          <div className="SignUpFormPBandYeti">
            <img id="pinkBean" src={pinkBean} alt="pink bean" />
            <img src={yeti} alt="yeti" />
          </div>
        </div>
      </div>
      <div className="SignUpFormBox">
        <form onSubmit={onSignUp} className="SignUpForm">
          <div className="SignUpFormErrors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
          <input
            type="password"
            name="repeat_password"
            placeholder="repeat password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <div className="SignUpSpriteSelection">
            <label>Choose your character:</label>
            <div className="SignUpSpriteContainer">
              {spriteData.map((sprite) => (
                <label key={sprite.name}>
                  <input
                    type="radio"
                    value={sprite.url}
                    checked={spriteUrl === sprite.url}
                    onChange={updateSpriteUrl}
                  />
                  <img src={sprite.display} alt={sprite.name} />
                </label>
              ))}
            </div>
          </div>
          <button type="submit">Sign Up</button>
          <a href="/login">Already have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
