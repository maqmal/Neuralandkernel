import React from "react";
import Tilt from 'react-tilt';
import LogoPNG from './Logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25, reverse:false }} style={{height: 100, width: 100, borderRadius: '50px' }} >
                <div className="Tilt-inner">
                    <img src={LogoPNG} style={{ borderRadius: '50px' }} alt='🧠' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;