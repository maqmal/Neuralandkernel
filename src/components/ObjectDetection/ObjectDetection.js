import React from "react";

const ObjectDetection = ({ imageUrl, size }) => {
    return (
        <div className="center ma2">
            <div className="absolute mt2">
                <img src={imageUrl} alt='' id='img' crossOrigin='anonymous' style={{display:'none'}} />
                <canvas id="canvas" width={size[0]} height={size[1]}></canvas>
            </div>
        </div>
    )
}

export default ObjectDetection;