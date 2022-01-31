import React from "react";
import './Rank.css';

const Rank = ({ username, rank }) => {
    return (
        <div className="white f3 rank-parent">
            <p className="rank"><span className="ttc">{username}</span>, your current entries is:</p>
            <h2 className="black">{rank}</h2>
        </div>
    )
}

export default Rank;