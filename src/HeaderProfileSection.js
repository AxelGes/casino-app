import React, { useContext } from 'react';
import { AuthContext } from "./App";
    
function HeaderAuthSection() {
    const {setShowProfile} = useContext(AuthContext);

    return (
        <div className="header_menu_profile_section">
            <button className="btnJoin" onClick={setShowProfile}>
                Perfil
            </button>
        </div>
    );
}

export default HeaderAuthSection;
