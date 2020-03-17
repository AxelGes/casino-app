import React, { useContext } from 'react';
import { AuthContext } from "./App";

function HeaderAuthSection() {
    const {setShowSignup} = useContext(AuthContext);
    const {setShowSignin} = useContext(AuthContext);

    return (
        <div className="header_menu_login_section">
            <button className="btnJoin" onClick={setShowSignup}>
                Unirse
            </button>

            <button className="btnLogin" onClick={setShowSignin}>
                Ingresar
            </button>
        </div>
    );
}

export default HeaderAuthSection;
