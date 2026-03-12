import React, { useState } from "react";

export default function Main() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleEmailEnter(e){
    if(e.key === "Enter"){
      e.preventDefault();
      setShowPassword(true);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    alert("Form working");
  }

  return (
    <div className="main">
      <div className="main-items">

        <img className="item-1" src="/icloud-logo.png" alt="logo"/>

        <h1 className="item-2">Sign in</h1>

        <input
          type="text"
          placeholder="Email"
          className="item-3"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          onKeyDown={handleEmailEnter}
        />

        {showPassword && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="item-3"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={handleSubmit} style={{border:"none",background:"none"}}>
              <img
                src="/apple-signinbutton.jpeg"
                alt="Sign in"
                style={{width:"220px"}}
              />
            </button>
          </>
        )}

      </div>
    </div>
  );
}
