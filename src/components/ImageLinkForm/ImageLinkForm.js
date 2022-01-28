import React from "react";
import ShowImage from "./ShowImage";
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: '',
      fileRef: React.createRef(),
      file: ''
    }
    this.onChangeImagePreview = this.onChangeImagePreview.bind(this)
  }

  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  uploadImage = async (e) => {
    e.preventDefault()
    this.setState({
      predictions: ''
    })
    this.toBase64(this.state.fileRef.current.files[0]).then(async (encodedFile) => {
      const payload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64StringFile: encodedFile })
      }

      fetch('http://localhost:3001/api/classify-image', payload)
        .then(response => response.json())
        .then(data => {
          if (data !== 'tf error') {
            this.setState({
              predictions: data
            })
            this.props.onEntriesChange()
          }
        })
    })
  }

  uploadUrl = async (e) => {
    e.preventDefault()
    this.setState({
      predictions: ''
    })
    fetch('http://localhost:3001/api/classify-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: this.props.imageUrl
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data !== 'tf error') {
          this.setState({
            predictions: data
          })
          this.props.onEntriesChange()
        }
      })
  }

  onChangeImagePreview(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  render() {
    return (
      <div>
        <p className="f3">
          This magic will detect object in a picture. Give it a try!
        </p>

        <div className="center">
          <div className="center br4 shadow-5 w-90 form">
            <form onSubmit={this.uploadImage}>
              <h4>Upload your Image!</h4><br />
              <input type="file"
                accept="image/*"
                capture="camera"
                ref={this.state.fileRef}
                className="input-img"
                onChange={this.onChangeImagePreview}
                required
              />
              <button
                className="w-30 grow f9 link ph3 pv2 dib white center button-img"
                onClick={this.props.onButtonSubmit}
                style={{ color: 'black' }}
                type="send"
                id="upload-id"
              >Detect</button>
            </form>

            <form onSubmit={this.uploadUrl} className="form-url">
              <h4>Copy image URL!</h4><br />
              <input
                className='f4 pa2 w-70 input-url'
                type='text'
                onChange={this.props.onInputChange}
                required
              />
              <button
                className="w-30 grow f9 link ph3 pv2 dib white center button-url"
                onClick={this.props.onButtonSubmit}
                style={{ color: 'black' }}
                type="send"
                id="url-id"
              >Detect</button>
            </form>
          </div>
        </div>

        {this.props.buttonClicked === 'url-id' ?
          <ShowImage image={this.props.imageUrl} prediction={this.state.predictions} /> :
          this.props.buttonClicked === 'upload-id' ?
            <ShowImage image={this.state.file} prediction={this.state.predictions} /> :
            ''
        }


      </div>
    );
  }
}

export default ImageLinkForm;