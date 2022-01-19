import React from "react";
import testFace from './face-det.jpg'
const FaceRecognition = () => {
    return (
        <div className="center">
            <img src={testFace} alt='🥔' id='img' crossOrigin='anonymous'/>
        </div>
    )
}

export default FaceRecognition;