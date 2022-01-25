import React from "react";
import './Rank.css';

const Rank = ({ username, rank }) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="white f3 rank-parent">
            <p className="rank"><span>{capitalizeFirstLetter(username)}, your current entries is:</span></p>
            <h2 className="black">{rank}</h2>
        </div>
    )
}

export default Rank;