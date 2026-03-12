import React, { useState } from "react";

export default function Main() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setShowPassword(true);
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    if (!password.trim()) return;
    alert("Form working");
  }

  return (
    <div className="main">
      <div className="main-items">

        <img className="item-1" src="/icloud-logo.png" alt="iCloud logo" />

        <h1 className="item-2">Sign in with Apple ID</h1>

        {!showPassword ? (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Apple ID"
              className="item-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Password"
              className="item-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </form>
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
