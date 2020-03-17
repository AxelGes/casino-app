import React from 'react';
import HeaderLogoSection from './HeaderLogoSection';
import HeaderMenuSection from './HeaderMenuSection';

function Header() {
  return (
    <div className="header">
        <div className="headerContent">
            <HeaderLogoSection />
            <HeaderMenuSection />
        </div>
    </div>
  );
}

export default Header;
