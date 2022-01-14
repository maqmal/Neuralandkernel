import React from "react";

const Navigation = ({ onRouteChange, isSignenIn, theRoute }) => {
    if (isSignenIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('signout')}>Sign Out</p>
            </nav>
        );
    } else {
        if (theRoute === 'register') {
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('signin')}>Sign In</p>
                </nav>
            )
        } else {
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('register')}>Register</p>
                </nav>
            )
        }
    }
}

export default Navigation