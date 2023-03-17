import React, { useState } from "react";
import "./howto.css"

const HowTo = () => {
  const [copyText, setCopyText] = useState("https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&dl=pexels-mateus-souza-3586798.jpg&fm=jpg");

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
  };

  return (

    <div class="mw6 center  br3 pa3 pa4-ns mv3 ba b--black-50 shadow-5 center">
      <div class="howto" >
        <h1>How to use:</h1>
        <p class="ttc">Grab the url to an image with a face in it</p>
        <p class="ttc">example:</p>
        <button onClick={handleCopy} class="button-70" role="button">click to copy</button>
        <p class="ttc">and paste it into the detect bar and watch as the smart brain recognizes a face in the image!</p>
      </div>
      <div >

      </div>
    </div >
  )
}

export default HowTo