import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import ParticlesJS from './components/Particles/Particles';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    console.log(this.state.isSignedIn)
    this.setState({ route: route });
  }

  render() {
    return (
      <div className='App' crossOrigin="anonymous">
        <ParticlesJS />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home' ?
          <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
              imageUrl={this.state.imageUrl}
              crossOrigin="anonymous" />
          </div>

          : (this.state.route === 'signin' ?
            <div className='pt6'><SignIn onRouteChange={this.onRouteChange} /></div>
            : (this.state.route === 'signout' ?
              <div className='pt6'><SignIn onRouteChange={this.onRouteChange} /></div>
              :
              <div className='pt6'><Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /></div>
            )
          )}
      </div>
    );
  }
}

export default App;
