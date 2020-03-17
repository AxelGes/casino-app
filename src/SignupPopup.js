import React from 'react';
import FeatherIcon from 'feather-icons-react';
import SignupForm from './SignupForm';

function SignupPopup(props) {
  return (
      <div className="signup_popup">
        <div className="signup_popup_inner">
          <FeatherIcon onClick={() => props.setShowSignup(false)} icon="x" />
          <SignupForm setShowSignup={props.setShowSignup}/>
        </div>
      </div>
  );
}

export default SignupPopup;