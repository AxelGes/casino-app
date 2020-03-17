import React, { useState, useContext } from "react";
import { AuthContext } from "./App";
import * as firebase from "firebase"

function SignupForm (props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  
  const handleForm = e => {
    e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
              if (res.user) {
                const inputUser = {email:email, username:username, coins:0};
                
                //API
                fetch('http://localhost:5000/users/add', {
                  method: 'POST', // or 'PUT'
                  body: JSON.stringify(inputUser), // be `string` or {object}!
                  headers:{
                    'Content-Type': 'application/json'
                  }
                })
                .then(res => {
                  res.json()
                  props.setShowSignup(false) 
                })
                .catch(error => console.error('Error:', error))

                
              }
            })
            .catch(e => {
              setErrors(e.message);
            });
    console.log(Auth);
  };

  return (
    <div>
      <h1>Unirse</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          name="username"
          type="text"
          placeholder="username"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />

        <button type="submit">Unirse</button>

        <span>{error}</span>
      </form>
    </div>
  );
};

export default SignupForm;