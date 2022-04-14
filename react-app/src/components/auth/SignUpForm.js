import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [spriteId, setSpriteId] = useState(1);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, spriteId));
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

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Sprite Id</label>
        <div>
          <div onClick={() => setSpriteId(1)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/noobm1.png"></img>
          </div>
          <div onClick={() => setSpriteId(2)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/noobm2.png"></img>
          </div>
          <div onClick={() => setSpriteId(3)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/noobf1.png"></img>
          </div>
          <div onClick={() => setSpriteId(4)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/noobf2.png"></img>
          </div>
          <div onClick={() => setSpriteId(5)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/nxhoem1.png"></img>
          </div>
          <div onClick={() => setSpriteId(6)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/nxhoem2.png"></img>
          </div>
          <div onClick={() => setSpriteId(7)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/nxhoef1.png"></img>
          </div>
          <div onClick={() => setSpriteId(8)}>
            <img src="https://islandracnh.s3.us-west-1.amazonaws.com/nxhoef2.png"></img>
          </div>
        </div>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
