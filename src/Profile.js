import React, {useContext}from 'react';
import { AuthContext } from "./App";

function Main() {
  
  const {user} = useContext(AuthContext);

  return (
    <div className="profile">
      <span> {user.email} </span>
      <span> {user.username} </span>
      <span> {user.coins} </span>
      <button />
    </div>
  );
}

export default Main;
