import React from "react"


const HowTo = ({ onRouteChange }) => {
  return (
    <div>
      <div  >
        <h1>How to use:</h1>
        <p class="ttc">Grab the url to an image with a face in it</p>
        <p class="ttc">example:</p>
        <a href="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&dl=pexels-mateus-souza-3586798.jpg&fm=jpg">Copy This Link</a>
        <p class="ttc">and paste it into the detect bar and watch as the smart brain recognizes a face in the image!</p>
      </div>
      <button onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Go Back</button>
      <div >

      </div>
    </div>
  )
}

export default HowTo