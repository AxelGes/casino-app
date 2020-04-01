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
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        
        if(!user){
        //User is signed in but data is not collected.
        setUser({userId: '', email:firebaseUser.email, username:'', coins:''});
        
        fetch('http://localhost:5000/users/' + firebaseUser.email)
          .then((response) => {
            if(response.ok){
              return response.json()
            } else{
              return null
            }
          })
          .then((response) => {
            let receivedUser = null;

            if(response != null){
              receivedUser = {userId: response._id, email:response.email, username:response.username, coins:response.coins};   
            }

            setUser(receivedUser);
            console.log(receivedUser)
          })
          .catch(error => console.error('Error:', error))
      }
    }
    else {
      // No user is signed in
      setUser(null);
    }
  });

  function signOutUser(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      setUser(null);
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
