import React, { useState } from "react";
import AutoplayLoopVideo from "./AutoplayLoopVideo";

export default function Main({ onAppleSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleEmailEnter(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!email.trim()) return;
    setShowPassword(true);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    onAppleSignIn({
      email: email.trim(),
      password,
    });
  }

  return (
    <div className="main">
      <div className="main-items">
        <AutoplayLoopVideo
          className="item-1"
          src="/applevideo.mp4"
          ariaLabel="Apple logo animation"
        />

        <h1 className="item-2">Sign in with Apple ID</h1>

        <input
          type="text"
          placeholder="Apple ID"
          className="item-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEmailEnter}
        />

        {showPassword && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="item-3 password-reveal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={handleLoginSubmit}
              className="signin-image-button"
            >
              <img
                src="/apple-signinbutton.jpeg"
                alt="Sign in"
                className="signin-button-image"
              />
            </button>
          </>
        )}

        <div className="item-4">
          <input type="checkbox" /> Keep me signed in
        </div>

        <a href="/forgot" className="item-5">
          Forgotten your Apple ID or password?
        </a>

        <a href="/create" className="item-6">
          Create Apple ID
        </a>
      </div>
    </div>
  );
}
