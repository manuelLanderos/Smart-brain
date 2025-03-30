import React, { Component } from "react";
import Navigation from "./Components/Navigation/navigation";
import FacialRecognition from "./Components/FacialRecognition/FacialRecognition";
import './App.css';
import Logo from './Components/logo/logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import SignIn from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import HowTo from "./Components/How To/HowTo";

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

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
        joined: data.joined,
      },
    });
  };

  calculateFacelocation = (data) => {
    console.log("Received API response:", data); // NEW: Debugging output

    if (!data || !data.outputs || data.outputs.length === 0) {
      console.error("Error: No valid API response", data);
      return null;
    }

    const regions = data.outputs[0]?.data?.regions;
    if (!regions || regions.length === 0) {
      console.warn("No face detected.");
      return null;
    }

    const clarifaiFace = regions[0]?.region_info?.bounding_box;
    if (!clarifaiFace) {
      console.warn("Bounding box not found.");
      return null;
    }

    const image = document.getElementById('inputimage');
    if (!image) {
      console.warn('Image element not found');
      return null;
    }

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }

  displayFaceBox = (box) => {
    if (box) { // NEW: Prevent errors if box is null
      this.setState({ box: box });
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    if (!this.state.input) {
      console.error("Error: No image URL provided"); // NEW: Prevent empty submissions
      return;
    }

    console.log("Sending image URL:", this.state.input); // NEW: Debugging output
    this.setState({ imageUrl: this.state.input });

    fetch('https://smartbrainbackend-qaaf.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ input: this.state.input }),
    })
      .then(response => response.json())
      .then(response => {
        console.log("API Response:", response); // NEW: Debugging output

        if (response && response.outputs) {
          const box = this.calculateFacelocation(response);
          this.displayFaceBox(box);
        } else {
          console.warn("No valid face detection response.", response);
        }

        if (!this.state.user.id) {
          console.error("Error: User ID is missing!"); // NEW: Prevent API error
          return;
        }

        return fetch('https://smartbrainbackend-qaaf.onrender.com/image', {
          method: 'put',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id }),
        });
      })
      .then(response => response.json())
      .then(count => {
        console.log("Updated user entries:", count); // NEW: Debugging output
        this.setState(Object.assign(this.state.user, { entries: count }));
      })
      .catch(err => console.error("Error:", err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#FFFFFF" num={200} type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FacialRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : route === "register" ? (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <HowTo />
        )}
      </div>
    );
  }
}

export default App;
