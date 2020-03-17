import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import * as firebase from "firebase"

function SigninForm (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  
  const handleForm = e => {
    e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
              if (res.user) {
                props.setShowSignin(false)
              }
              })
              .catch(e => {
                setErrors(e.message);
              });
  };

  return (
    <div>
      <h1>Iniciar sesion</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />

        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />

        <button type="submit">Iniciar sesion</button>

        <span>{error}</span>
      </form>
    </div>
  );
};

export default SigninForm;