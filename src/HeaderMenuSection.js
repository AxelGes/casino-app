import React, { useContext } from 'react';
import HeaderAuthSection from './HeaderAuthSection';
import HeaderProfileSection from './HeaderProfileSection';
import HeaderNavbarSection from './HeaderNavbarSection';
import { AuthContext } from "./App";


function HeaderMenuSection() {
  const {user} = useContext(AuthContext);

  return (
    
    <div className="header_menu_section">
      
      <HeaderNavbarSection />
      
      { 
      user !== null ? <HeaderProfileSection /> : <HeaderAuthSection /> 
      }
    
    </div>
  );
}

export default HeaderMenuSection;
