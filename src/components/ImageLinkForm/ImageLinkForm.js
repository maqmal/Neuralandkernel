import React from "react";
import './ImageLinkForm.css'
const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">
        {'This Magic will detect Face in a picture. Give it a try'}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 w-60 form">
          <input className='f4 pa2 w-70' type='tex' />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
