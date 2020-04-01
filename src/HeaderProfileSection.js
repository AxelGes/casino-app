import React, { useContext } from 'react';
import { AuthContext } from "./App";
    
function HeaderAuthSection() {
    const {setShowProfile} = useContext(AuthContext);
    const {user} = useContext(AuthContext);

    return (
        <div className="header_menu_profile_section">
            <a className="coinsContainer" onClick={setShowProfile}>
                {user.coins}
            </a>

            <button className="btnJoin" onClick={setShowProfile}>
                Perfil
            </button>
        </div>
    );
}

export default HeaderAuthSection;
