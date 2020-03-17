import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import SignupPopup from './SignupPopup';
import SigninPopup from './SigninPopup';
import './App.css';
import * as firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
  

export const AuthContext = React.createContext(null);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App (){
  const [user, setUser] = useState({ userId: '', email:'', username:'', coins:0 });
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      // User is signed in
      if(){
        fetch('http://localhost:5000/users/' + firebaseUser.email)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          const receivedUser = {userId: myJson._id, email:myJson.email, username:myJson.username, coins:myJson.coins};
          console.log(receivedUser);
          setUser(receivedUser);
        });
      }
    }
    else {
      // No user is signed in
      setUser({ userId: '', email:'', username:'', coins:0 });
    }
  });

  function signOutUser(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      setUser({ userId: '', email:'', username:'', coins:0 });
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signOutUser, setShowSignup, setShowSignin, setShowProfile }}>
        <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        </style>
        {showSignup ? <SignupPopup setShowSignup={setShowSignup}/> : null }
        {showSignin ? <SigninPopup setShowSignin={setShowSignin}/> : null }
        <Header/>
        <Main user={user} signOutUser={signOutUser} showProfile={showProfile} />

    </AuthContext.Provider>
  )
}

export default App;
