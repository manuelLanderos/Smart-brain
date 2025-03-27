// this is the new stuff
import React, { Component } from "react"
import Navigation from "./Components/Navigation/navigation"
import FacialRecognition from "./Components/FacialRecognition/FacialRecognition"
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

  calculateFaceLocation = (data) => {
    // Check if the API response is valid
    if (!data || !data.outputs || data.outputs.length === 0) {
      console.error("Invalid response from API:", data);
      return null;
    }

    // Check if any regions (faces) were detected
    const regions = data.outputs[0]?.data?.regions;
    if (!regions || regions.length === 0) {
      console.warn("No face detected in the image.");
      return null;
    }

    // Get the bounding box of the first detected face
    const clarifaiFace = regions[0]?.region_info?.bounding_box;
    if (!clarifaiFace) {
      console.warn("Bounding box not found.");
      return null;
    }

    // Get the image element from the DOM
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
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    /*This is the functionality of the DETECT button. They are both passed as props to InputForm*/
    this.setState({ imageUrl: this.state.input });

    // const raw = JSON.stringify({
    //   "user_app_id": {
    //     "user_id": "manwell",
    //     "app_id": "my-first-application"
    //   },
    //   "inputs": [
    //     {
    //       "data": {
    //         "image": {
    //           "url": this.state.input,
    //         }
    //       }
    //     }
    //   ]
    // });

    fetch('https://smartbrainbackend-qaaf.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    }).then(response => response.json())


      .then(response => {
        if (response) {
          fetch('https://smartbrainbackend-qaaf.onrender.com/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            }).catch(console.log)
        }
        this.displayFaceBox(this.calculateFacelocation(response))
        // console.log(response)
      })
      .catch((err) => console.log(err));
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
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />


        {route === 'home' ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FacialRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <HowTo />
        )}

      </div>
    );
  }
}

export default App;
