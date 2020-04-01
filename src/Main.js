import React from 'react';
import Footer from './Footer';
import Profile from './Profile';

function Main(props) {

  return (
    <div>
      <div className="main">
        {
          props.user !== null ?
            <div>
              <p> Estas logeado </p>
              <button onClick={props.signOutUser}>Sign Out</button> 
            </div>
          :  <p>  No estas logeado </p> 
          
        }
        {props.showProfile && props.user !== null  ? <Profile /> : null}
        </div>

        <Footer />
    </div>
  );
}

export default Main;
