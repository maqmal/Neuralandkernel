import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import ObjectDetection from './components/ObjectDetection/ObjectDetection';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      size: [],
      route: 'signin',
      isSignenIn: false
    }
  }

  displayBox = (prediction, img) => {
    const c = document.getElementById('canvas');
    const context = c.getContext('2d');

    context.clearRect(0, 0, c.width, c.height);
    context.drawImage(img, 0, 0);
    context.font = '10px Arial';

    console.log('number of detections: ', prediction.length);
    for (let i = 0; i < prediction.length; i++) {
      context.beginPath();
      context.rect(...prediction[i].bbox);
      context.lineWidth = 1;
      context.strokeStyle = 'blue';
      context.fillStyle = 'blue';
      context.stroke();
      context.fillText(
        ' ' + prediction[i].class, prediction[i].bbox[0],
        prediction[i].bbox[1] > 10 ? prediction[i].bbox[1] - 5 : 10);
    }
  }


  onSubmit = async () => {
    this.setState({ imageUrl: this.state.input });

    const img = document.getElementById('img');
    const model = await cocoSsd.load();

    const predictions = await model.detect(img);
    
    const imgSize = [img.width, img.height]
    this.setState({ size: imgSize })

    this.displayBox(predictions, img);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignenIn: false })
    } else if (route === 'home') {
      this.setState({ isSignenIn: true })
    }
    this.setState({ route: route })
    return route
  }

  render() {
    return (
      <div className='App'>
        <Navigation onRouteChange={this.onRouteChange} isSignenIn={this.state.isSignenIn} theRoute={this.state.route} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit} />
            <ObjectDetection imageUrl={this.state.imageUrl} size={this.state.size} />
          </div>
          : (this.state.route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} />
            : (this.state.route === 'signout' ?
              <SignIn onRouteChange={this.onRouteChange} />
              :
              <Register onRouteChange={this.onRouteChange} />
            )
          )}

      </div>
    );
  }
}

export default App;
