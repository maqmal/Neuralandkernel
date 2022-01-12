import React from "react";

const ImageLinkForm = ()=> {
  return (
    <div>
      <p className="f3">
          {'This Magic will detect Face in a picture. Give it a try'}
      </p>
      <div>
          <input className='f4 pa2 w-40 center' type={'text'}/>
          <button className="w-10 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;
