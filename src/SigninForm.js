import React, { useState } from "react";
import * as firebase from "firebase"

function SigninForm (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  
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

        <br></br>
        <br></br>
        
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