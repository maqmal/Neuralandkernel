import React from "react";
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignenIn }) => {
    if (isSignenIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Logo />
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('signout')}>Sign Out</p>
            </nav>
        );
    } else {
        return null;
    }
}

export default Navigation