import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, imageUrl, onEntriesChange }) => {
  const [predictions, setPredictions] = React.useState([]);

  const fileRef = React.createRef();

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  const uploadImage = async (e) => {
    e.preventDefault()

    toBase64(fileRef.current.files[0]).then(async (encodedFile) => {
      const payload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64StringFile: encodedFile })
      }

      const response = await fetch('http://localhost:3001/api/classify-image', payload)
      const data = await response.json()

      setPredictions(data)
      onEntriesChange()
    })
  }

  const uploadUrl = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/api/classify-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: imageUrl
      })
    })
    const data = await response.json()

    setPredictions(data)
    onEntriesChange()
  }

  return (
    <div>
      <p className="f3">
        {'This magic will detect object in a picture. Give it a try'}
      </p>
      <div className="center">
        <div className="center pa4 br4 shadow-5 w-90 form">
          <form onSubmit={uploadImage}>
            <h4>Upload your Image!</h4><br />
            <input type="file" accept="image/*" capture="camera" ref={fileRef} className="input-img" />
            <button className="w-30 grow f9 link ph3 pv2 dib white center button-img"
              onClick={onButtonSubmit} style={{ color: 'black' }} type="send">Detect</button>
          </form>
          <h4 className="or">OR</h4>
          <form onSubmit={uploadUrl}>
            <h4>Copy image URL!</h4><br />
            <input className='f4 pa2 w-70 input-url' type='text' onChange={onInputChange} />
            <button className="w-30 grow f9 link ph3 pv2 dib white center button-url"
              onClick={onButtonSubmit} style={{ color: 'black' }} type="send">Detect</button>
          </form>
        </div>
      </div>
      <code>
        {predictions.map(prediction =>
          <p key={prediction.probability}>{`${prediction.className}: ${prediction.probability}`}</p>)
        }
        {/* <ObjectDetection imageUrl={imageUrl}/> */}
      </code>
    </div>
  );
}

export default ImageLinkForm;
