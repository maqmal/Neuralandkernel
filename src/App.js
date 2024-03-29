import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import ParticlesJS from './components/Particles/Particles';

const initialState = {
  input: '',
  imageUrl: '',
  route: 'signin',
  isSignedIn: false,
  buttonId: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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

  onSubmit = (event) => {
    this.setState({
      buttonId: event.target.id,
      imageUrl: this.state.input
    });
  }

  onEntriesChange = () => {
    fetch("http://localhost:3001/image", {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState(Object.assign(this.state.user, { entries: data }))
      })
      .catch(console.log)
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ initialState })
      window.location.reload();
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    return (
      <div className='App' crossOrigin="anonymous">
        <ParticlesJS />
        {this.state.route === 'home' ?
          <div>
            <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
            <Rank username={this.state.user.name} rank={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
              imageUrl={this.state.imageUrl}
              onEntriesChange={this.onEntriesChange}
              buttonClicked={this.state.buttonId}
            />
          </div>

          : (this.state.route === 'signin' ?
            <div className='pt6'><SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /></div>
            : (this.state.route === 'signout' ?
              <div className='pt6'><SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /></div>
              :
              <div className='pt6'><Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /></div>
            )
          )}
      </div>
    );
  }
}

export default App;
