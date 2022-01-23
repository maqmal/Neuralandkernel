import React from "react";
// import ModalComponent from "./Modal";

const ObjectDetection = ({ imageUrl, size, imgCanvas }) => {
    return (
        <div className="center ma2">
            <div className="absolute mt2">
                {/* <img src={imageUrl} alt='' id='img' crossOrigin='anonymous' style={{ display: 'none' }} />
                <canvas id="canvas" width={size[0]} height={size[1]} style={{ display: 'none' }} crossOrigin="anonymous"></canvas>
                <ModalComponent imgCanvas={imgCanvas}/> */}
            </div>
        </div>
    )
}

export default ObjectDetection;