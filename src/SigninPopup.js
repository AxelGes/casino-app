import React from 'react';
import FeatherIcon from 'feather-icons-react';
import SigninForm from './SigninForm.js';

function SigninPopup(props) {
  return (
      <div className="signup_popup">
        <div className="signup_popup_inner">
          <FeatherIcon onClick={() => props.setShowSignin(false)} icon="x" />
          <SigninForm setShowSignin={props.setShowSignin}/>
        </div>
      </div>
  );
}

export default SigninPopup;