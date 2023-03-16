import React from "react"
// import Signin from "../Signin/Signin"

const navigation = ({ onRouteChange, isSignedIn }) => {

  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign out</p>
        <p onClick={() => onRouteChange("howTo")} className="f3 link dim black underline pa3 pointer">How To Use</p>
      </nav>
    )
  }
  else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign In</p>
        <p onClick={() => onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
        <p onClick={() => onRouteChange("howTo")} className="f3 link dim black underline pa3 pointer">How To Use</p>
      </nav>
    )
  }


}

export default navigation