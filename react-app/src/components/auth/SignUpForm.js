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
    "https://islandracnh.s3.us-west-1.amazonaws.com/noobm1.png"
  );
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const spriteData = [
    {
      name: "noobm1",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/noobm1.png",
    },
    {
      name: "noobm2",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/noobm2.png",
    },
    {
      name: "noobf1",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/noobf1.png",
    },
    {
      name: "noobf2",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/noobf2.png",
    },
    {
      name: "nxhoem1",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/nxhoem1.png",
    },
    {
      name: "nxhoem2",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/nxhoem2.png",
    },
    {
      name: "nxhoef1",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/nxhoef1.png",
    },
    {
      name: "nxhoef2",
      url: "https://islandracnh.s3.us-west-1.amazonaws.com/nxhoef2.png",
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
        <form onSubmit={onSignUp} className="SignUpForm">
          <div>
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
          ></input>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={updateEmail}
            value={email}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={updatePassword}
            value={password}
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
                  <img src={sprite.url} alt={sprite.name} />
                </label>
              ))}
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
