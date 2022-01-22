import React from "react";
import './ImageLinkForm.css';
import ObjectDetection from '../ObjectDetection/ObjectDetection';

const ImageLinkForm = ({onInputChange, onButtonSubmit, imageUrl, size, imgCanvas}) => {
  return (
    <div>
      <p className="f3">
        {'This magic will detect object in a picture. Give it a try'}
      </p>
      <div className="center">
        <div className="center pa4 br4 shadow-5 w-90 form">
          <input className='f4 pa2 w-70' type='tex' onChange={onInputChange}/>
          <button className="w-30 grow f9 link ph3 pv2 dib white center"
          onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
      <ObjectDetection imageUrl={imageUrl} size={size} imgCanvas={imgCanvas}/>
    </div>
  );
}

export default ImageLinkForm;
